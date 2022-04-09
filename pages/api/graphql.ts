import { ApolloServer } from "apollo-server-micro";
import { schema } from "../../graphql/schema";
import { createContext } from "../../graphql/context";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import path from "path";

import Cors from "micro-cors";

const cors = Cors();

const apolloServer = new ApolloServer({
  schema,

  context: createContext,
});

const startServer = apolloServer.start();

async function graphQlHanlder(req: any, res: any) {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }
  await startServer;

  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export default withIronSessionApiRoute(cors(graphQlHanlder), sessionOptions);

export const config = {
  api: {
    bodyParser: false,
  },
};
