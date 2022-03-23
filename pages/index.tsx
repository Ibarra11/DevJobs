import { useState, useEffect } from "react";
import type { NextPage } from "next";

import JobList from "../components/jobList";
import Pagination from "../components/pagination";
import data from "../data/data.json";
const offset = 9;
const Home: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentJobs, setCurrentJobs] = useState(
    data.slice((currentPage - 1) * offset, offset * currentPage)
  );
  const changePage = (direction: "previous" | "next") => {
    if (direction === "previous") {
      setCurrentPage((page) => page - 1);
    } else {
      setCurrentPage((page) => page + 1);
    }
  };

  useEffect(() => {
    setCurrentJobs(
      data.slice((currentPage - 1) * offset, offset * currentPage)
    );
  }, [currentPage]);

  return (
    <div className=" h-full flex flex-col px-12 pt-8  border-8">
      <div className="h-3/4 border-4 overflow-hidden">
        <JobList jobs={currentJobs} />
      </div>
      <div className="h-16 flex items-center justify-center  ">
        <Pagination
          totalCount={data.length}
          offset={9}
          currentPage={currentPage}
          onPageChange={changePage}
        />
      </div>
    </div>
  );
};

export default Home;
