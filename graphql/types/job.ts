import { objectType, extendType } from "nexus";

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
  },
});
