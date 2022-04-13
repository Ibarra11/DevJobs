import { useState, useEffect } from "react";
import { gql } from "@apollo/client";
import type { InferGetServerSidePropsType, NextPage } from "next";
import { useJobsQuery, JobsQuery } from "../graphql/generated";
import { withSessionSsr } from "../lib/session";
import JobList from "../components/jobList";
import Pagination from "../components/pagination";

const offset = 9;
const ALL_JOBS_QUERY = gql`
  query Jobs {
    jobs {
      id
      postedAt
      contract
      company
      position
      location
    }
  }
`;
const Home: NextPage<{
  user: {
    id: number;
    email: string;
    createdAt: string;
    role: "DEVELOPER" | "EMPLOYER";
  };
  onLayoutChange(arg: "DEV" | "EMP"): void;
}> = ({
  user,
  onLayoutChange,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data, loading, error } = useJobsQuery();

  const [currentPage, setCurrentPage] = useState(1);
  const [currentJobs, setCurrentJobs] = useState<JobsQuery["jobs"] | null>(
    null
  );

  useEffect(() => {
    setCurrentJobs(
      jobList?.slice((currentPage - 1) * offset, offset * currentPage)
    );
  }, [currentPage, data]);

  if (loading) {
    return <p>loading</p>;
  }
  if (error) {
    return <p>Error</p>;
  }

  if (!data) {
    return <p>No data</p>;
  }

  const changePage = (direction: "previous" | "next") => {
    if (direction === "previous") {
      setCurrentPage((page) => page - 1);
    } else {
      setCurrentPage((page) => page + 1);
    }
  };

  const jobList = data.jobs;

  // if (user.role === "EMPLOYER") {
  //   onLayoutChange("EMP");
  //   return <p>Employer</p>;
  // } else {
  //   onLayoutChange("DEV");
  //   return <p>Developer</p>;
  // }

  return (
    <div className="h-full flex flex-col px-12 pt-8">
      <div className="content-area">
        <JobList jobs={currentJobs || []} />
      </div>
      <div className="h-16 flex items-center justify-center  ">
        <Pagination
          totalCount={jobList.length}
          offset={9}
          currentPage={currentPage}
          onPageChange={changePage}
        />
      </div>
    </div>
  );
};

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    if (!user) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    return {
      props: { user },
    };
  }
);
export default Home;
