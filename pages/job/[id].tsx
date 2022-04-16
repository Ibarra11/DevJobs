import { useRouter } from "next/router";
import { gql, useMutation } from "@apollo/client";
import { useJobQuery } from "../../graphql/generated";
import { GetServerSideProps } from "next";
import { InferGetServerSidePropsType } from "next";

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

// const APPLYING_JOB = gql`
//   mutation ApplyingJob($id: id!){

//   }
// `
const JobDetailView = ({
  jobId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data, loading, error } = useJobQuery({ variables: { id: jobId } });

  const router = useRouter();
  if (loading) return <p>Loading</p>;
  if (error) {
    router.push("/");
  }
  if (!data) {
    router.push("/");
    return;
  }
  // there is a possibility of the query returning null
  if (!data.job) {
    router.push("/");
    return;
  }

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
        {JobSectionJSX({
          heading: "Requirements",
          content: job.jobRequirementContent,
          list: job.jobRequirementList,
          styleType: "disc",
        })}
        {JobSectionJSX({
          heading: "What You Will Do",
          content: job.jobRoleContent,
          list: job.jobRoleList,
          styleType: "decimal",
        })}
      </div>
    </div>
  );
};

function JobSectionJSX({
  heading,
  content,
  list,
  styleType = "disc",
}: {
  heading: string;
  content: string;
  list: string[];
  styleType: "disc" | "decimal";
}) {
  return (
    <div className="flex flex-col gap-6">
      <h5 className="text-xl">{heading}</h5>
      <p className="leading-7">{content}</p>
      <ul
        className={` ${
          styleType === "disc" ? "list-disc" : "list-decimal"
        } list-inside`}
      >
        {list.map((item: string, index: number) => {
          return (
            <>
              <li className="relative" key={`${item}-${index}`}>
                <span
                  className={`absolute ${
                    styleType === "decimal" ? "left-7" : "left-8"
                  }`}
                >
                  {item}
                </span>
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{ jobId: number }> = async (
  context
) => {
  const id = context.query.id;
  if (typeof id !== "string") {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: { jobId: +id },
  };
};

export default JobDetailView;
