import { NexusGenObjects } from "../graphql/nexus-generated-types";

export type UserJobs = { job: NexusGenObjects["Job"]; appliedAt: string }[];

export interface UserSession {
  id: number;
  email: string;
  role: "DEVELOPER" | "EMPLOYER";
}
