import { decorateType, asNexusMethod } from "nexus";
import { GraphQLDateTime } from "graphql-scalars";
export const GQLDate = asNexusMethod(GraphQLDateTime, "date");
export * from "./Jobs";
export * from "./User";
