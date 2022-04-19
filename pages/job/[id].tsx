import { useRouter } from "next/router";
import { gql, useMutation } from "@apollo/client";
import {
  useJobQuery,
  AddJobToUserMutationFn,
  useAddJobToUserMutation,
} from "../../graphql/generated";
import { withSessionSsr } from "../../lib/session";
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

const ADD_JOB_TO_USER = gql`
  mutation AddJobToUser($jobId: Int!, $userId: Int!) {
    addJobToUser(jobId: $jobId, userId: $userId) {
      id
    }
  }
`;
const JobDetailView = ({
  jobId,
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data, loading, error } = useJobQuery({ variables: { id: jobId } });
  const [addJobMutation] = useAddJobToUserMutation({
    onCompleted: (data) => {
      console.log(data);
    },
  });
  const router = useRouter();

  function handleJobApplying() {
    addJobMutation({
      variables: {
        jobId: job.id,
        userId: user.id,
      },
    });
  }
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

  //  onClick={() => addJobMutation({
  //             variables: {
  //               jobId: job.id,
  //               userId:
  //           }})

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
            <button className="py-3 px-7" onClick={handleJobApplying}>
              Apply Now
            </button>
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

type UserSession = {
  id: number;
  email: string;
  role: "DEVELOPER" | "EMPLOYER";
};

export const getServerSideProps = withSessionSsr<{
  jobId: number;
  user: UserSession;
}>(async function getServerSideProps({ req, query }) {
  const user = req.session.user;

  const redirect: (to: string) => {
    destination: string;
    permanent: boolean;
  } = (to) => ({
    destination: to,
    permanent: false,
  });

  if (!user) {
    return {
      redirect: redirect("/login"),
    };
  }
  if (typeof query.id !== "string") {
    return {
      redirect: redirect("/"),
    };
  }
  if (isNaN(+query.id)) {
    return {
      redirect: redirect("/"),
    };
  }

  return {
    props: { user, jobId: +query.id },
  };
});

export default JobDetailView;
