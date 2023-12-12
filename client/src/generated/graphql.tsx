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

export type Booking = {
  __typename?: 'Booking';
  date: Scalars['String'];
  id: Scalars['String'];
  pet?: Maybe<Pet>;
  user?: Maybe<User>;
};

export type Image = {
  __typename?: 'Image';
  alt: Scalars['String'];
  src: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPet: Pet;
};


export type MutationCreatePetArgs = {
  name: Scalars['String'];
  userId: Scalars['String'];
};

export type Pet = {
  __typename?: 'Pet';
  avatarUrl: Scalars['String'];
  birth: Scalars['String'];
  createdAt: Scalars['String'];
  deletedAt?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  images: Array<Image>;
  name: Scalars['String'];
  stats?: Maybe<PetStats>;
  updatedAt: Scalars['String'];
  user?: Maybe<User>;
};

export type PetStats = {
  __typename?: 'PetStats';
  favoriteCount: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  bookings: Array<Booking>;
  currentUser: User;
  pets: Array<Pet>;
};

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  pets: Array<Pet>;
  stats?: Maybe<UserStats>;
  updatedAt: Scalars['String'];
};

export type UserStats = {
  __typename?: 'UserStats';
  petCount: Scalars['Int'];
};

export type GetPetsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPetsQuery = { __typename?: 'Query', pets: Array<{ __typename?: 'Pet', id: string, name: string, birth: string, images: Array<{ __typename?: 'Image', src: string, alt: string }> }> };

export type CreateNewPetMutationVariables = Exact<{
  userId: Scalars['String'];
  name: Scalars['String'];
}>;


export type CreateNewPetMutation = { __typename?: 'Mutation', createPet: { __typename?: 'Pet', id: string } };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', id: string, name: string, avatarUrl?: string | null, createdAt: string }, pets: Array<{ __typename?: 'Pet', id: string, name: string }> };


export const GetPetsDocument = gql`
    query GetPets {
  pets {
    id
    name
    birth
    images {
      src
      alt
    }
  }
}
    `;

/**
 * __useGetPetsQuery__
 *
 * To run a query within a React component, call `useGetPetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPetsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPetsQuery(baseOptions?: Apollo.QueryHookOptions<GetPetsQuery, GetPetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPetsQuery, GetPetsQueryVariables>(GetPetsDocument, options);
      }
export function useGetPetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPetsQuery, GetPetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPetsQuery, GetPetsQueryVariables>(GetPetsDocument, options);
        }
export type GetPetsQueryHookResult = ReturnType<typeof useGetPetsQuery>;
export type GetPetsLazyQueryHookResult = ReturnType<typeof useGetPetsLazyQuery>;
export type GetPetsQueryResult = Apollo.QueryResult<GetPetsQuery, GetPetsQueryVariables>;
export const CreateNewPetDocument = gql`
    mutation CreateNewPet($userId: String!, $name: String!) {
  createPet(userId: $userId, name: $name) {
    id
  }
}
    `;
export type CreateNewPetMutationFn = Apollo.MutationFunction<CreateNewPetMutation, CreateNewPetMutationVariables>;

/**
 * __useCreateNewPetMutation__
 *
 * To run a mutation, you first call `useCreateNewPetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewPetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewPetMutation, { data, loading, error }] = useCreateNewPetMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateNewPetMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewPetMutation, CreateNewPetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewPetMutation, CreateNewPetMutationVariables>(CreateNewPetDocument, options);
      }
export type CreateNewPetMutationHookResult = ReturnType<typeof useCreateNewPetMutation>;
export type CreateNewPetMutationResult = Apollo.MutationResult<CreateNewPetMutation>;
export type CreateNewPetMutationOptions = Apollo.BaseMutationOptions<CreateNewPetMutation, CreateNewPetMutationVariables>;
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  currentUser {
    id
    name
    avatarUrl
    createdAt
  }
  pets {
    id
    name
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;