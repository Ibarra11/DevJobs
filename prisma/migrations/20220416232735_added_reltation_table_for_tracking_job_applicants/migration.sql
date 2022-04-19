-- CreateTable
CREATE TABLE "JobApplicants" (
    "jobId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobApplicants_pkey" PRIMARY KEY ("jobId","userId")
);

-- AddForeignKey
ALTER TABLE "JobApplicants" ADD CONSTRAINT "JobApplicants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplicants" ADD CONSTRAINT "JobApplicants_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
