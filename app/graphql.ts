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
  getTrendingPosts: Array<Maybe<Post>>;
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


export type CreateNewPostMutation = { __typename?: 'Mutation', createNewPost: { __typename?: 'Post', id: string, body: string, createdAt?: Maybe<string>, updatedAt?: Maybe<string>, totalComments: number, user: { __typename?: 'User', alias: string, email: string, totalPosts: number, totalComments: number } } };

export type CommentOnPostMutationVariables = Exact<{
  data: AddComment;
}>;


export type CommentOnPostMutation = { __typename?: 'Mutation', commentOnPost: { __typename?: 'Comment', id: string, body: string, createdAt?: Maybe<string>, updatedAt?: Maybe<string>, user: { __typename?: 'User', alias: string, email: string } } };


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