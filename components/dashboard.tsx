import { ReactNode } from "react";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import Layout from "./layout";
import { NextApiRequest } from "next";
const Dashboard = () => {
  return <Layout />;
};

export const getServerSideProps = async (req: NextApiRequest) => {
  console.log(req);
  return {
    props: {},
  };
};

// export const getServerSideProps = withIronSessionSsr(
//   async function getServerSideProps({ req }) {
//     console.log(req.session);
//     console.log("hello");
//     const { user } = req.session;
//     if (!user) {
//       return {
//         redirect: {
//           destination: "/login",
//           permanent: false,
//         },
//       };
//     }
//     return {
//       props: { user },
//     };
//   },
//   sessionOptions
// );

export default Dashboard;
