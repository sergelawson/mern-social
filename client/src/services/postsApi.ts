import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PostType } from "model";

// Define a service using a base URL and expected endpoints

export const postsApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query<PostType[], void>({
      query: () => `/posts`,
      providesTags: ["Post"],
    }),
    getPost: builder.query<PostType, Pick<PostType, "_id">>({
      query: (id) => `/posts/${id}`,
    }),
    createPost: builder.mutation<PostType, PostType>({
      query: (post) => ({
        url: `/posts`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: builder.mutation<PostType, PostType>({
      query: (post) => ({
        url: `/posts/${post._id}`,
        method: "PATCH",
        body: post,
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation<PostType, Pick<PostType, "_id">>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
    likePost: builder.mutation<PostType, Pick<PostType, "_id">>({
      query: (id) => ({
        url: `/posts/${id}/like`,
        method: "PATCH",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
} = postsApi;
