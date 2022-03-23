import JobCard from "./jobCard";
interface Job {
  id: number;
  company: string;
  logo: string;
  logoBackground: string;
  position: string;
  postedAt: string;
  contract: string;
  location: string;
  website: string;
  apply: string;
  description: string;
  requirements: {
    content: string;
    items: string[];
  };
}
const JobList = ({ jobs }: { jobs: Job[] }) => {
  return (
    <div className="h-full py-12 px-12 grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-12 md:gap-12 lg:gap-16  ">
      {jobs.map((job) => (
        <JobCard key={job.id} {...job} />
      ))}
    </div>
  );
};

export default JobList;
