import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";

export default withIronSessionApiRoute(userRoute, sessionOptions);
async function userRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.session?.user) {
    res.json({
      isLoggedIn: true,
    });
  } else {
    res.json({
      isLoggedIn: false,
    });
  }
}
