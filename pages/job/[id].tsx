import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
const GET_JOB = gql`
  query Job($id: Int!) {
    job(id: $id) {
      id
      company
      position
      postedAt
      contract
      location
      website
      apply
      jobDescription
      jobRequirementContent
      jobRequirementList
      jobRoleContent
      jobRoleList
    }
  }
`;
const JobDetailView = () => {
  const router = useRouter();
  const jobId = router.query.id ? +router.query.id : undefined;

  const { data, loading, error } = useQuery(GET_JOB, {
    variables: { id: jobId },
  });

  if (error) {
    router.push("/");
  }
  if (loading) return <p>Loading</p>;

  const { job } = data;

  return (
    <div className=" max-w-4xl mx-auto mt-6 mb-10">
      {/* Header Portion */}
      <div className=" flex h-40 mb-8">
        <div className="grid place-content-center  h-full w-36 bg-orange-400 text-white">
          {job.company}
        </div>
        <div className="flex items-center  flex-1 px-10  bg-white">
          <div className="flex justify-between w-full ">
            <div className="flex flex-col gap-3 ">
              <h4 className=" text-2xl ">{job.company}</h4>
              <span className="text-base self-start ">{job.website}</span>
            </div>
            <div className=" rounded-md self-end">
              <button className="py-3 px-5">Company Site</button>
            </div>
          </div>
        </div>
      </div>
      {/* Main Job Description */}
      <div className="bg-white flex flex-col gap-10 p-12">
        <div className="flex gap-2 items-center">
          <div className=" flex-1">
            <div className="flex gap-3 items-baseline">
              <p className="text-base">{job.postedAt}</p>
              <span className="inline-block w-1 h-1 rounded-full bg-black"></span>
              <p>{job.contract}</p>
            </div>
            <h3 className=" text-3xl">{job.position}</h3>
            <p className=" text-sm">{job.location}</p>
          </div>
          <div className=" rounded-md border-2">
            <button className="py-3 px-7 ">Apply Now</button>
          </div>
        </div>
        <div>
          <p className=" leading-7">{job.jobDescription}</p>
        </div>
        <div className="flex flex-col gap-6">
          <h5 className=" text-xl">Requirements</h5>
          <p className="leading-7">{job.jobRequirementContent}</p>
          <ul className="list-disc list-inside">
            {job.jobRequirementList.map((requirement: string) => {
              return (
                <li className="pb-2" key={`${job.id}-${requirement}`}>
                  {requirement}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-col gap-6">
          <h5 className="text-xl">What You Will Do</h5>
          <p className="leading-7">{job.jobRoleContent}</p>
          <ul className=" list-decimal list-inside">
            {job.jobRoleList.map((jobRole: string) => {
              return <li key={`${job.id}-${jobRole}`}>{jobRole}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JobDetailView;
