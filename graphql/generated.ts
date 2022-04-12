import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CredentialsInputType = {
  email: Scalars['String'];
  password: Scalars['String'];
  role: Scalars['String'];
};

export type Job = {
  __typename?: 'Job';
  apply: Scalars['String'];
  company: Scalars['String'];
  contract: Scalars['String'];
  id: Scalars['Int'];
  jobDescription: Scalars['String'];
  jobRequirementContent: Scalars['String'];
  jobRequirementList: Array<Scalars['String']>;
  jobRoleContent: Scalars['String'];
  jobRoleList: Array<Scalars['String']>;
  location: Scalars['String'];
  logoUrl: Scalars['String'];
  position: Scalars['String'];
  postedAt: Scalars['String'];
  website: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addNewUser: User;
  getUser?: Maybe<User>;
};


export type MutationAddNewUserArgs = {
  input: CredentialsInputType;
};


export type MutationGetUserArgs = {
  input: CredentialsInputType;
};

export type Query = {
  __typename?: 'Query';
  job?: Maybe<Job>;
  jobs: Array<Job>;
};


export type QueryJobArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Int'];
  role: Scalars['String'];
};

export type JobsQueryVariables = Exact<{ [key: string]: never; }>;


export type JobsQuery = { __typename?: 'Query', jobs: Array<{ __typename?: 'Job', id: number, postedAt: string, contract: string, company: string, position: string, location: string }> };

export type JobQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type JobQuery = { __typename?: 'Query', job?: { __typename?: 'Job', id: number, company: string, position: string, postedAt: string, contract: string, location: string, website: string, apply: string, jobDescription: string, jobRequirementContent: string, jobRequirementList: Array<string>, jobRoleContent: string, jobRoleList: Array<string> } | null };

export type AddNewUserMutationVariables = Exact<{
  input: CredentialsInputType;
}>;


export type AddNewUserMutation = { __typename?: 'Mutation', addNewUser: { __typename?: 'User', id: number, email: string, createdAt: string, role: string } };

export type GetUserMutationVariables = Exact<{
  input: CredentialsInputType;
}>;


export type GetUserMutation = { __typename?: 'Mutation', getUser?: { __typename?: 'User', id: number, email: string, createdAt: string, role: string } | null };


export const JobsDocument = gql`
    query Jobs {
  jobs {
    id
    postedAt
    contract
    company
    position
    location
  }
}
    `;

/**
 * __useJobsQuery__
 *
 * To run a query within a React component, call `useJobsQuery` and pass it any options that fit your needs.
 * When your component renders, `useJobsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJobsQuery({
 *   variables: {
 *   },
 * });
 */
export function useJobsQuery(baseOptions?: Apollo.QueryHookOptions<JobsQuery, JobsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<JobsQuery, JobsQueryVariables>(JobsDocument, options);
      }
export function useJobsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<JobsQuery, JobsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<JobsQuery, JobsQueryVariables>(JobsDocument, options);
        }
export type JobsQueryHookResult = ReturnType<typeof useJobsQuery>;
export type JobsLazyQueryHookResult = ReturnType<typeof useJobsLazyQuery>;
export type JobsQueryResult = Apollo.QueryResult<JobsQuery, JobsQueryVariables>;
export const JobDocument = gql`
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

/**
 * __useJobQuery__
 *
 * To run a query within a React component, call `useJobQuery` and pass it any options that fit your needs.
 * When your component renders, `useJobQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJobQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useJobQuery(baseOptions: Apollo.QueryHookOptions<JobQuery, JobQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<JobQuery, JobQueryVariables>(JobDocument, options);
      }
export function useJobLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<JobQuery, JobQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<JobQuery, JobQueryVariables>(JobDocument, options);
        }
export type JobQueryHookResult = ReturnType<typeof useJobQuery>;
export type JobLazyQueryHookResult = ReturnType<typeof useJobLazyQuery>;
export type JobQueryResult = Apollo.QueryResult<JobQuery, JobQueryVariables>;
export const AddNewUserDocument = gql`
    mutation AddNewUser($input: CredentialsInputType!) {
  addNewUser(input: $input) {
    id
    email
    createdAt
    role
  }
}
    `;
export type AddNewUserMutationFn = Apollo.MutationFunction<AddNewUserMutation, AddNewUserMutationVariables>;

/**
 * __useAddNewUserMutation__
 *
 * To run a mutation, you first call `useAddNewUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddNewUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addNewUserMutation, { data, loading, error }] = useAddNewUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddNewUserMutation(baseOptions?: Apollo.MutationHookOptions<AddNewUserMutation, AddNewUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddNewUserMutation, AddNewUserMutationVariables>(AddNewUserDocument, options);
      }
export type AddNewUserMutationHookResult = ReturnType<typeof useAddNewUserMutation>;
export type AddNewUserMutationResult = Apollo.MutationResult<AddNewUserMutation>;
export type AddNewUserMutationOptions = Apollo.BaseMutationOptions<AddNewUserMutation, AddNewUserMutationVariables>;
export const GetUserDocument = gql`
    mutation GetUser($input: CredentialsInputType!) {
  getUser(input: $input) {
    id
    email
    createdAt
    role
  }
}
    `;
export type GetUserMutationFn = Apollo.MutationFunction<GetUserMutation, GetUserMutationVariables>;

/**
 * __useGetUserMutation__
 *
 * To run a mutation, you first call `useGetUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getUserMutation, { data, loading, error }] = useGetUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetUserMutation(baseOptions?: Apollo.MutationHookOptions<GetUserMutation, GetUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetUserMutation, GetUserMutationVariables>(GetUserDocument, options);
      }
export type GetUserMutationHookResult = ReturnType<typeof useGetUserMutation>;
export type GetUserMutationResult = Apollo.MutationResult<GetUserMutation>;
export type GetUserMutationOptions = Apollo.BaseMutationOptions<GetUserMutation, GetUserMutationVariables>;