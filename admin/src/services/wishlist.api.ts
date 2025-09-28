// src/services/wishlist.api.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./base.query";
import type { IProduct } from "@/types";

export const wishlistApi = createApi({
	reducerPath: "wishlistApi",
	baseQuery: baseQueryWithReauth,
	tagTypes: ["Wishlist"],
	endpoints: (builder) => ({
		// ✅ Get current user's wishlist
		getWishlist: builder.query<IProduct[], void>({
			query: () => "/wishlist",
			providesTags: ["Wishlist"],
		}),

		// ✅ Add product to wishlist
		addToWishlist: builder.mutation<IProduct, string>({
			query: (productId) => ({
				url: `/wishlist/${productId}`,
				method: "POST",
			}),
			invalidatesTags: ["Wishlist"],
		}),

		// ✅ Remove product from wishlist
		removeFromWishlist: builder.mutation<
			{ success: boolean; productId: string },
			string
		>({
			query: (productId) => ({
				url: `/wishlist/${productId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Wishlist"],
		}),
	}),
});

export const {
	useGetWishlistQuery,
	useAddToWishlistMutation,
	useRemoveFromWishlistMutation,
} = wishlistApi;
