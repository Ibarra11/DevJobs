import { GetServerSideProps } from "next";
import { withSessionSsr } from "../lib/session";
const AppliedJobs = () => {
  return (
    <div>
      <table className="border-300 border-2 w-full  border-red-500">
        <thead className="border-2 border-orange-500">
          <tr>
            <th>Company</th>
            <th>Applied Date</th>
            <th>Status</th>
            <th>Job Details</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    if (!user) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    // get the first 25 results
    return {
      props: { user },
    };
  }
);

export default AppliedJobs;
