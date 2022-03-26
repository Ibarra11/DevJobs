import { objectType, extendType, intArg, core, nonNull } from "nexus";

function requiredInt(description?: string) {
  return nonNull(intArg());
}

export const Job = objectType({
  name: "Job",
  definition(t) {
    t.int("id"),
      t.string("company"),
      t.string("logoUrl"),
      t.string("position"),
      t.string("postedAt"),
      t.string("contract"),
      t.string("location"),
      t.string("website"),
      t.string("apply"),
      t.string("jobDescription"),
      t.string("jobRequirementContent"),
      t.list.string("jobRequirementList"),
      t.string("jobRoleContent"),
      t.list.string("jobRoleList");
  },
});

export const JobsQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("jobs", {
      type: "Job",
      resolve(_parent, _args, ctx) {
        return ctx.prisma.job.findMany();
      },
    });
    t.field("job", {
      type: "Job",
      args: { id: requiredInt() },
      async resolve(root, args, ctx) {
        const { id } = args;
        const job = await ctx.prisma.job.findUnique({
          where: {
            id: id,
          },
        });
        console.log(job);
        if (job) {
          return job;
        }
        throw new Error("No job listing found");
      },
    });
  },
});
