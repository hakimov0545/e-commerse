// src/services/product.api.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./base.query";
import type {
	IPopulatedProduct,
	IProduct,
	IUpdateProductDto,
} from "@/types";

export const productApi = createApi({
	reducerPath: "productApi",
	baseQuery: baseQueryWithReauth,
	tagTypes: ["Product"],
	endpoints: (builder) => ({
		// GET all products
		getProducts: builder.query<IProduct[], void>({
			query: () => "/products",
			providesTags: ["Product"],
		}),

		// GET product by id
		getProductById: builder.query<IProduct, string>({
			query: (id) => `/products/${id}`,
			providesTags: ["Product"],
		}),

		// GET products by category
		getProductsByCategory: builder.query<IProduct[], string>({
			query: (categoryId) => `/products/category/${categoryId}`,
			providesTags: ["Product"],
		}),

		// GET populated product
		getPopulatedProduct: builder.query<IPopulatedProduct, string>(
			{
				query: (id) => `/products/populated/${id}`,
				providesTags: ["Product"],
			}
		),

		// GET all products populated

		getAllProductsPopulated: builder.query<
			IPopulatedProduct[],
			void
		>({
			query: () => "/products/populated",
			providesTags: ["Product"],
		}),

		// CREATE product
		createProduct: builder.mutation<IProduct, FormData>({
			query: (body) => ({
				url: "/products",
				method: "POST",
				body,
			}),
			invalidatesTags: ["Product"],
		}),

		// UPDATE product
		updateProduct: builder.mutation<
			IProduct,
			{ id: string; data: IUpdateProductDto }
		>({
			query: ({ id, data }) => ({
				url: `/products/${id}`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["Product"],
		}),

		// DELETE product
		deleteProduct: builder.mutation<
			{ success: boolean; id: string },
			string
		>({
			query: (id) => ({
				url: `/products/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Product"],
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetProductByIdQuery,
	useGetProductsByCategoryQuery,
	useGetPopulatedProductQuery,
	useGetAllProductsPopulatedQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
	useDeleteProductMutation,
} = productApi;
