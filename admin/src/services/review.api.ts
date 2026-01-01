// src/services/review.api.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./base.query";
import type {
	ICreateReviewDto,
	IReview,
	IUpdateReviewDto,
} from "@/types";

export const reviewApi = createApi({
	reducerPath: "reviewApi",
	baseQuery: baseQueryWithReauth,
	tagTypes: ["Review"],
	endpoints: (builder) => ({
		// GET all reviews
		getAllReviews: builder.query<IReview[], void>({
			query: () => "/reviews",
			providesTags: ["Review"],
		}),

		// CREATE review
		createReview: builder.mutation<IReview, ICreateReviewDto>({
			query: (body) => ({
				url: "/reviews",
				method: "POST",
				body,
			}),
			invalidatesTags: ["Review"],
		}),

		// GET all reviews for a product
		getReviewsByProduct: builder.query<IReview[], string>({
			query: (productId) => `/reviews/product/${productId}`,
			providesTags: ["Review"],
		}),

		// GET review by ID
		getReviewById: builder.query<IReview, string>({
			query: (id) => `/reviews/${id}`,
			providesTags: ["Review"],
		}),

		// UPDATE review
		updateReview: builder.mutation<
			IReview,
			{ id: string; data: IUpdateReviewDto }
		>({
			query: ({ id, data }) => ({
				url: `/reviews/${id}`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["Review"],
		}),

		// DELETE review
		deleteReview: builder.mutation<
			{ success: boolean; id: string },
			string
		>({
			query: (id) => ({
				url: `/reviews/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Review"],
		}),
	}),
});

export const {
	useGetAllReviewsQuery,
	useCreateReviewMutation,
	useGetReviewsByProductQuery,
	useGetReviewByIdQuery,
	useUpdateReviewMutation,
	useDeleteReviewMutation,
} = reviewApi;
