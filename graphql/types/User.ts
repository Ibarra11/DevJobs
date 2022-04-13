import bcrypt from "bcrypt";

import { prisma } from "../../lib/prisma";
import { objectType, extendType, nonNull, inputObjectType } from "nexus";

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.int("id"),
      t.nonNull.string("email"),
      t.nonNull.string("createdAt"),
      t.nonNull.string("role");
  },
});

export const CredentialsInputType = nonNull(
  inputObjectType({
    name: "CredentialsInputType",
    definition(t) {
      t.nonNull.string("email"),
        t.nonNull.string("password"),
        t.nonNull.string("role");
    },
  })
);

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
                role,
              },
            });

            // there is no user with that email, return null
            if (!user) {
              return null;
            }
            const match = await bcrypt.compare(password, user.password);
            if (match) {
              return user;
            } else {
              return null;
            }
          } catch (e) {
            if (e instanceof Error) {
              throw new Error("Login unsucessful");
            }
          }
        },
      });
  },
});
