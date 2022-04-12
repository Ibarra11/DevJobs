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
    <div className="border-2 max-w-4xl mx-auto mt-6">
      <div className=" flex h-40 \">
        <div className="grid place-content-center  h-full w-36 bg-orange-400 text-white">
          {job.company}
        </div>
        <div className="flex items-center  flex-1 px-10  bg-white">
          <div className="flex justify-between w-full ">
            <div className="flex flex-col gap-3 ">
              <h3 className=" text-2xl ">{job.company}</h3>
              <span className="text-base self-start ">{job.website}</span>
            </div>
            <div className="border-2 rounded-md self-end">
              <button className="py-3 px-5">Company Site</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailView;
