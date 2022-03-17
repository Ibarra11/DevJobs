import type { NextPage } from "next";
import JobList from "../components/jobList";
import data from "../data/data.json";
const Home: NextPage = () => {
  return (
    <div className="h-full text-violet text-h1">
      <JobList jobs={data} />
    </div>
  );
};

export default Home;
