// src/services/wishlist.api.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./base.query";
import type { IPopulatedProduct } from "@/types";

export const wishlistApi = createApi({
	reducerPath: "wishlistApi",
	baseQuery: baseQueryWithReauth,
	tagTypes: ["Wishlist"],
	endpoints: (builder) => ({
		// ✅ Get current user's wishlist
		getWishlist: builder.query<IPopulatedProduct[], void>({
			query: () => "/wishlist",
			providesTags: ["Wishlist"],
		}),

		// ✅ Add product to wishlist
		addToWishlist: builder.mutation<
			{ message: string; wishlist: IPopulatedProduct[] },
			string
		>({
			query: (productId) => ({
				url: `/wishlist/${productId}`,
				method: "POST",
			}),
			invalidatesTags: ["Wishlist"],
		}),

		// ✅ Remove product from wishlist
		removeFromWishlist: builder.mutation<
			{ message: string; wishlist: IPopulatedProduct[] },
			string
		>({
			query: (productId) => ({
				url: `/wishlist/${productId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Wishlist"],
		}),

		// ✅ Clear all items from wishlist
		clearWishlist: builder.mutation<
			{ message: string; wishlist: IPopulatedProduct[] },
			void
		>({
			query: () => ({
				url: "/wishlist/clear",
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
	useClearWishlistMutation,
} = wishlistApi;
