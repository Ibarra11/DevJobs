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
    <div className="h-full  grid grid-cols-4 gap-16  ">
      {jobs.map((job) => (
        <JobCard key={job.id} {...job} />
      ))}
    </div>
  );
};

export default JobList;
