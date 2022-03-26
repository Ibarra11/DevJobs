import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
const GET_JOB = gql`
  query Job($id: Int!) {
    job(id: $id) {
      id
      jobDescription
      jobRequirementContent
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

  console.log(data);

  return <p>Job: {jobId}</p>;
};

export default JobDetailView;
