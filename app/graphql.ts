import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddComment = {
  body: Scalars['String'];
  postId: Scalars['String'];
};

export type AddPost = {
  body: Scalars['String'];
};

export type AuthUser = {
  __typename?: 'AuthUser';
  alias: Scalars['String'];
  comments?: Maybe<Array<Maybe<Comment>>>;
  createdAt?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  posts?: Maybe<Array<Maybe<Post>>>;
  token: Scalars['String'];
  totalComments: Scalars['Int'];
  totalPosts: Scalars['Int'];
  updatedAt?: Maybe<Scalars['String']>;
};

export type Comment = {
  __typename?: 'Comment';
  body: Scalars['String'];
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  post: Post;
  updatedAt?: Maybe<Scalars['String']>;
  user: User;
};

export type GetPost = {
  postId: Scalars['String'];
};

export type Login = {
  alias?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  commentOnPost: Comment;
  createNewPost: Post;
  signInToAccount: AuthUser;
};


export type MutationCommentOnPostArgs = {
  data: AddComment;
};


export type MutationCreateNewPostArgs = {
  data: AddPost;
};


export type MutationSignInToAccountArgs = {
  data: Login;
};

export type Post = {
  __typename?: 'Post';
  body: Scalars['String'];
  comments: Array<Maybe<Comment>>;
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  totalComments: Scalars['Int'];
  updatedAt?: Maybe<Scalars['String']>;
  user: User;
};

export type Query = {
  __typename?: 'Query';
  getPost: Post;
  getTrendingPosts: Array<Maybe<Post>>;
};


export type QueryGetPostArgs = {
  data: GetPost;
};

export type User = {
  __typename?: 'User';
  alias: Scalars['String'];
  comments?: Maybe<Array<Maybe<Comment>>>;
  createdAt?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  posts?: Maybe<Array<Maybe<Post>>>;
  totalComments: Scalars['Int'];
  totalPosts: Scalars['Int'];
  updatedAt?: Maybe<Scalars['String']>;
};

export type SignInToAccountMutationVariables = Exact<{
  data: Login;
}>;


export type SignInToAccountMutation = { __typename?: 'Mutation', signInToAccount: { __typename?: 'AuthUser', alias: string, email: string, totalPosts: number, totalComments: number, createdAt?: Maybe<string>, updatedAt?: Maybe<string>, token: string } };

export type CreateNewPostMutationVariables = Exact<{
  data: AddPost;
}>;


export type CreateNewPostMutation = { __typename?: 'Mutation', createNewPost: { __typename?: 'Post', id: string, body: string, createdAt?: Maybe<string>, updatedAt?: Maybe<string>, totalComments: number, user: { __typename?: 'User', alias: string, email: string, totalPosts: number, totalComments: number, createdAt?: Maybe<string>, updatedAt?: Maybe<string> } } };

export type CommentOnPostMutationVariables = Exact<{
  data: AddComment;
}>;


export type CommentOnPostMutation = { __typename?: 'Mutation', commentOnPost: { __typename?: 'Comment', id: string, body: string, createdAt?: Maybe<string>, updatedAt?: Maybe<string>, user: { __typename?: 'User', alias: string, email: string, totalPosts: number, totalComments: number, createdAt?: Maybe<string>, updatedAt?: Maybe<string> } } };

export type GetTrendingPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTrendingPostsQuery = { __typename?: 'Query', getTrendingPosts: Array<Maybe<{ __typename?: 'Post', id: string, body: string, createdAt?: Maybe<string>, updatedAt?: Maybe<string>, totalComments: number, user: { __typename?: 'User', alias: string, email: string, totalPosts: number, totalComments: number, createdAt?: Maybe<string>, updatedAt?: Maybe<string> } }>> };

export type GetPostQueryVariables = Exact<{
  data: GetPost;
}>;


export type GetPostQuery = { __typename?: 'Query', getPost: { __typename?: 'Post', id: string, body: string, createdAt?: Maybe<string>, updatedAt?: Maybe<string>, totalComments: number, user: { __typename?: 'User', alias: string, email: string, totalPosts: number, totalComments: number, createdAt?: Maybe<string>, updatedAt?: Maybe<string> }, comments: Array<Maybe<{ __typename?: 'Comment', id: string, body: string, createdAt?: Maybe<string>, updatedAt?: Maybe<string>, user: { __typename?: 'User', alias: string, email: string, totalPosts: number, totalComments: number, createdAt?: Maybe<string>, updatedAt?: Maybe<string> } }>> } };


export const SignInToAccountDocument = gql`
    mutation SignInToAccount($data: Login!) {
  signInToAccount(data: $data) {
    alias
    email
    totalPosts
    totalComments
    createdAt
    updatedAt
    token
  }
}
    `;
export type SignInToAccountMutationFn = Apollo.MutationFunction<SignInToAccountMutation, SignInToAccountMutationVariables>;

/**
 * __useSignInToAccountMutation__
 *
 * To run a mutation, you first call `useSignInToAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInToAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInToAccountMutation, { data, loading, error }] = useSignInToAccountMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignInToAccountMutation(baseOptions?: Apollo.MutationHookOptions<SignInToAccountMutation, SignInToAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInToAccountMutation, SignInToAccountMutationVariables>(SignInToAccountDocument, options);
      }
export type SignInToAccountMutationHookResult = ReturnType<typeof useSignInToAccountMutation>;
export type SignInToAccountMutationResult = Apollo.MutationResult<SignInToAccountMutation>;
export type SignInToAccountMutationOptions = Apollo.BaseMutationOptions<SignInToAccountMutation, SignInToAccountMutationVariables>;
export const CreateNewPostDocument = gql`
    mutation CreateNewPost($data: AddPost!) {
  createNewPost(data: $data) {
    id
    body
    createdAt
    updatedAt
    totalComments
    user {
      alias
      email
      totalPosts
      totalComments
      createdAt
      updatedAt
    }
  }
}
    `;
export type CreateNewPostMutationFn = Apollo.MutationFunction<CreateNewPostMutation, CreateNewPostMutationVariables>;

/**
 * __useCreateNewPostMutation__
 *
 * To run a mutation, you first call `useCreateNewPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewPostMutation, { data, loading, error }] = useCreateNewPostMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateNewPostMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewPostMutation, CreateNewPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewPostMutation, CreateNewPostMutationVariables>(CreateNewPostDocument, options);
      }
export type CreateNewPostMutationHookResult = ReturnType<typeof useCreateNewPostMutation>;
export type CreateNewPostMutationResult = Apollo.MutationResult<CreateNewPostMutation>;
export type CreateNewPostMutationOptions = Apollo.BaseMutationOptions<CreateNewPostMutation, CreateNewPostMutationVariables>;
export const CommentOnPostDocument = gql`
    mutation CommentOnPost($data: AddComment!) {
  commentOnPost(data: $data) {
    id
    body
    createdAt
    updatedAt
    user {
      alias
      email
      totalPosts
      totalComments
      createdAt
      updatedAt
    }
  }
}
    `;
export type CommentOnPostMutationFn = Apollo.MutationFunction<CommentOnPostMutation, CommentOnPostMutationVariables>;

/**
 * __useCommentOnPostMutation__
 *
 * To run a mutation, you first call `useCommentOnPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommentOnPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commentOnPostMutation, { data, loading, error }] = useCommentOnPostMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCommentOnPostMutation(baseOptions?: Apollo.MutationHookOptions<CommentOnPostMutation, CommentOnPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CommentOnPostMutation, CommentOnPostMutationVariables>(CommentOnPostDocument, options);
      }
export type CommentOnPostMutationHookResult = ReturnType<typeof useCommentOnPostMutation>;
export type CommentOnPostMutationResult = Apollo.MutationResult<CommentOnPostMutation>;
export type CommentOnPostMutationOptions = Apollo.BaseMutationOptions<CommentOnPostMutation, CommentOnPostMutationVariables>;
export const GetTrendingPostsDocument = gql`
    query GetTrendingPosts {
  getTrendingPosts {
    id
    body
    createdAt
    updatedAt
    totalComments
    user {
      alias
      email
      totalPosts
      totalComments
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetTrendingPostsQuery__
 *
 * To run a query within a React component, call `useGetTrendingPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTrendingPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTrendingPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTrendingPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetTrendingPostsQuery, GetTrendingPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTrendingPostsQuery, GetTrendingPostsQueryVariables>(GetTrendingPostsDocument, options);
      }
export function useGetTrendingPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTrendingPostsQuery, GetTrendingPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTrendingPostsQuery, GetTrendingPostsQueryVariables>(GetTrendingPostsDocument, options);
        }
export type GetTrendingPostsQueryHookResult = ReturnType<typeof useGetTrendingPostsQuery>;
export type GetTrendingPostsLazyQueryHookResult = ReturnType<typeof useGetTrendingPostsLazyQuery>;
export type GetTrendingPostsQueryResult = Apollo.QueryResult<GetTrendingPostsQuery, GetTrendingPostsQueryVariables>;
export const GetPostDocument = gql`
    query GetPost($data: GetPost!) {
  getPost(data: $data) {
    id
    body
    createdAt
    updatedAt
    totalComments
    user {
      alias
      email
      totalPosts
      totalComments
      createdAt
      updatedAt
    }
    comments {
      id
      body
      createdAt
      updatedAt
      user {
        alias
        email
        totalPosts
        totalComments
        createdAt
        updatedAt
      }
    }
  }
}
    `;

/**
 * __useGetPostQuery__
 *
 * To run a query within a React component, call `useGetPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetPostQuery(baseOptions: Apollo.QueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
      }
export function useGetPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
        }
export type GetPostQueryHookResult = ReturnType<typeof useGetPostQuery>;
export type GetPostLazyQueryHookResult = ReturnType<typeof useGetPostLazyQuery>;
export type GetPostQueryResult = Apollo.QueryResult<GetPostQuery, GetPostQueryVariables>;