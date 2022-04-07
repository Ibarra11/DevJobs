import type { IronSessionOptions } from "iron-session";
import internal from "stream";
const sessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: "dev_jobs",
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
      email: string;
    };
  }
}

export { sessionOptions };
