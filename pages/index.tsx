import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import type { GetServerSideProps, NextPage } from "next";
import { withSessionSsr } from "../lib/session";
import JobList from "../components/jobList";
import Pagination from "../components/pagination";
import { User } from "../graphql/types";
interface Job {
  id: number;
  company: string;
  position: string;
  postedAt: string;
  contract: string;
  location: string;
}

const offset = 9;
const ALL_JOBS_QUERY = gql`
  query {
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
}> = ({ user, onLayoutChange }) => {
  const { data: jobList, loading, error } = useQuery(ALL_JOBS_QUERY);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentJobs, setCurrentJobs] = useState<Job[] | null>(null);

  // if (user.role === "EMPLOYER") {
  //   onLayoutChange("EMP");
  //   return <p>Employer</p>;
  // } else {
  //   onLayoutChange("DEV");
  //   return <p>Developer</p>;
  // }

  useEffect(() => {
    setCurrentJobs(
      jobList?.jobs.slice((currentPage - 1) * offset, offset * currentPage)
    );
  }, [currentPage, jobList]);
  if (error) {
    return <div>error</div>;
  }
  if (loading) {
    return <div>Loading</div>;
  }
  const changePage = (direction: "previous" | "next") => {
    if (direction === "previous") {
      setCurrentPage((page) => page - 1);
    } else {
      setCurrentPage((page) => page + 1);
    }
  };

  return (
    <div className="h-full flex flex-col px-12 pt-8">
      <div className="content-area">
        <JobList jobs={currentJobs || []} />
      </div>
      <div className="h-16 flex items-center justify-center  ">
        <Pagination
          totalCount={jobList.jobs.length}
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
    console.log(req.session.user);
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
