import JobCard from "./jobCard";

interface Job {
  id: number;
  company: string;
  position: string;
  postedAt: string;
  contract: string;
  location: string;
}
const JobList = ({ jobs }: { jobs: Job[] }) => {
  return (
    <div className=" overflow-auto h-full  pt-7 pr-4  grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-12 md:gap-12 lg:gap-16  ">
      {jobs.map((job) => (
        <JobCard key={job.id} {...job} />
      ))}
    </div>
  );
};

export default JobList;
