import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma";
import { requiredInt } from "../helpers";
import {
  objectType,
  extendType,
  nonNull,
  inputObjectType,
  enumType,
} from "nexus";

const Role = enumType({
  name: "role",
  members: ["DEVELOPER", "EMPLOYER"],
});

export const CredentialsInputType = nonNull(
  inputObjectType({
    name: "CredentialsInputType",
    definition(t) {
      t.nonNull.string("email"),
        t.nonNull.string("password"),
        t.nonNull.field({
          name: Role.name,
          type: Role,
        });
    },
  })
);

export const UserAppliedJobs = objectType({
  name: "UsersJobs",
  definition(t) {
    t.field("job", {
      type: "Job",
    }),
      t.date("appliedAt");
  },
});

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.int("id"),
      t.nonNull.string("email"),
      t.nonNull.date("createdAt"),
      t.nonNull.field({
        name: Role.name,
        type: Role,
      });
    t.nonNull.list.nonNull.field("appliedJobs", {
      type: "UsersJobs",
      async resolve(parent, args, ctx) {
        const jobs = await ctx.prisma.user.findUnique({
          where: {
            id: parent.id,
          },
          select: {
            JobApplicants: {
              select: {
                job: true,
                appliedAt: true,
              },
            },
          },
        });

        return jobs ? jobs.JobApplicants : [];
      },
    });
  },
});

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("me", {
      type: "User",
      args: {
        userId: requiredInt,
      },
      resolve(_, args, ctx) {
        return ctx.prisma.user.findUnique({
          where: {
            id: args.userId,
          },
        });
      },
    });
  },
});

export const UserMutations = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("addNewUser", {
      type: "User",
      args: { input: CredentialsInputType },
      async resolve(root, args, ctx) {
        const saltRounds = 10;
        const { email, password, role } = args.input;
        let user: {
          id: number;
          email: string;
          createdAt: Date;
          role: "DEVELOPER" | "EMPLOYER";
        };
        try {
          const hash = await bcrypt.hash(password, saltRounds);
          user = await prisma.user.create({
            data: {
              email,
              password: hash,
              role,
            },
          });
          return user;
        } catch (e) {
          if (e instanceof Error) {
            if (e.message.includes("Unique constraint")) {
              throw new Error(`User already exist with email: ${email}`);
            } else {
              throw new Error("User could not be added");
            }
          }
          throw new Error("Error");
        }
      },
    }),
      t.field("getUser", {
        type: "User",
        args: { input: CredentialsInputType },
        async resolve(root, args, ctx) {
          const { email, password, role } = args.input;
          try {
            const user = await ctx.prisma.user.findUnique({
              where: {
                email: email,
              },
            });

            // there is no user with that email, return null
            if (!user) {
              return null;
            }
            const match = await bcrypt.compare(password, user.password);
            if (match && user.role === role) {
              return user;
            } else {
              return null;
            }
          } catch (e: unknown) {
            if (e instanceof Error) {
              throw new Error("Login unsucessful");
            }
            throw new Error("Login unsuccessful");
          }
        },
      });
    t.nonNull.field("addJobToUser", {
      type: "User",
      args: { userId: requiredInt, jobId: requiredInt },
      async resolve(root, args, ctx) {
        const { jobId, userId } = args;
        console.log(jobId, userId);

        const result = await ctx.prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            JobApplicants: {
              create: [
                {
                  job: {
                    connect: {
                      id: jobId,
                    },
                  },
                },
              ],
            },
          },
        });
        return result;
        // try {
        // } catch (e: unknown) {
        //   throw new Error("No job found");
        // }
      },
    });
  },
});
