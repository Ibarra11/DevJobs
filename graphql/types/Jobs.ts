import { objectType, extendType, intArg, core, nonNull, list } from "nexus";

function requiredInt(description?: string) {
  return nonNull(intArg());
}

export const Job = objectType({
  name: "Job",
  definition(t) {
    t.nonNull.int("id"),
      t.nonNull.string("company"),
      t.nonNull.string("logoUrl"),
      t.nonNull.string("position"),
      t.nonNull.string("postedAt"),
      t.nonNull.string("contract"),
      t.nonNull.string("location"),
      t.nonNull.string("website"),
      t.nonNull.string("apply"),
      t.nonNull.string("jobDescription"),
      t.nonNull.string("jobRequirementContent"),
      t.nonNull.list.nonNull.string("jobRequirementList"),
      t.nonNull.string("jobRoleContent"),
      t.nonNull.list.nonNull.string("jobRoleList");
  },
});

export const JobsQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("jobs", {
      type: nonNull("Job"),
      resolve(_parent, _args, ctx) {
        if (!ctx.user) {
          throw new Error("Not authenticated");
        }
        return ctx.prisma.job.findMany();
      },
    });
    t.field("job", {
      type: "Job",
      args: { id: requiredInt() },
      async resolve(root, args, ctx) {
        if (!ctx.user) {
          throw new Error("Not authenticated");
        }
        const { id } = args;
        const job = await ctx.prisma.job.findUnique({
          where: {
            id: id,
          },
        });
        if (job) {
          return job;
        }
        throw new Error("No job listing found");
      },
    });
  },
});
