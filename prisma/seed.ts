import { PrismaClient } from "@prisma/client";
import JobData from "../data/data.json";
const prisma = new PrismaClient();

async function main() {
  await Promise.all(
    JobData.map(async (job) => {
      return prisma.job.upsert({
        where: { id: job.id },
        update: {},
        create: {
          company: job.company,
          logoUrl: "https://picsum.photos/200",
          position: job.position,
          postedAt: job.postedAt,
          contract: job.contract,
          location: job.location,
          website: job.website,
          apply: job.apply,
          jobDescription: job.description,
          jobRequirementContent: job.requirements.content,
          jobRequirementList: job.requirements.items,
          jobRoleContent: job.role.content,
          jobRoleList: job.role.items,
        },
      });
    })
  );

  const user = await prisma.user.upsert({
    where: { email: "user@test.com" },
    update: {},
    create: {
      email: "user@test.com",
      password: "test",
    },
  });
}

main()
  .catch((e) => {
    console.log("test");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
