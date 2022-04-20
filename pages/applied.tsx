import AppliedJobs from "../components/appliedJobs";
import JobTable from "../components/JobTable";
import { gql } from "@apollo/client";
import { useAppliedJobsQuery } from "../graphql/generated";
import { UserJobs, UserSession } from "../types";
import { prisma } from "../lib/prisma";
import { InferGetServerSidePropsType } from "next";
import { withSessionSsr } from "../lib/session";
const APPLIED_JOBS = gql`
  query AppliedJobs($userId: Int!) {
    me(userId: $userId) {
      id
      appliedJobs {
        appliedAt
        job {
          company
        }
      }
    }
  }
`;
const AppliedJobsRoute = ({
  user,
  jobs,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // const { data } = useAppliedJobsQuery({ variables: { userId: user.id } });
  console.log(jobs);
  return (
    <div className="max-w-3xl mx-auto h-full py-9 border-2 border-green-400">
      <JobTable jobs={jobs} />
    </div>
  );
};

export const getServerSideProps = withSessionSsr<{
  user: UserSession;
  jobs: UserJobs | [];
}>(async function getServerSideProps({ req, query }) {
  const user = req.session.user;
  const redirect: (to: string) => {
    destination: string;
    permanent: boolean;
  } = (to) => ({
    destination: to,
    permanent: false,
  });

  if (!user) {
    return {
      redirect: redirect("/login"),
    };
  }
  const result = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      JobApplicants: {
        take: 6,
        select: {
          job: true,
          appliedAt: true,
        },
        orderBy: {
          appliedAt: "asc",
        },
      },
    },
  });

  const jobs = result?.JobApplicants.map((e) => ({
    ...e,
    appliedAt: e.appliedAt.toLocaleTimeString(),
  }));

  return {
    props: { user, jobs: jobs || [] },
  };
});

export default AppliedJobsRoute;
