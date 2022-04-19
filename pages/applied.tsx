import AppliedJobs from "../components/appliedJobs";
import { useQuery, gql } from "@apollo/client";
import { useAppliedJobsQuery } from "../graphql/generated";
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
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data } = useAppliedJobsQuery({ variables: { userId: user.id } });
  console.log(data);
  return (
    <div className="max-w-3xl mx-auto h-full py-9 border-2 border-green-400">
      <AppliedJobs />
    </div>
  );
};

type UserSession = {
  id: number;
  email: string;
  role: "DEVELOPER" | "EMPLOYER";
};

export const getServerSideProps = withSessionSsr<{
  user: UserSession;
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
  return {
    props: { user },
  };
});

export default AppliedJobsRoute;
