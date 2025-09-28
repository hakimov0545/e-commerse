import {
	createApi,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:5050/api/products";

const productApi = createApi({
	reducerPath: "productApi",
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
	}),
	endpoints: (builder) => ({
		getAllProducts: builder.query({
			query: () => "/",
		}),
		getProductById: builder.query({
			query: (id) => `/${id}`,
		}),
		getProductByCategory: builder.query({
			query: (category) => `/category/${category}`,
		}),
		createProduct: builder.mutation({
			query: (newProduct) => ({
				url: "/",
				method: "POST",
				body: newProduct,
			}),
		}),
		updateProduct: builder.mutation({
			query: ({ id, updatedProduct }) => ({
				url: `/${id}`,
				method: "PUT",
				body: updatedProduct,
			}),
		}),
		deleteProduct: builder.mutation({
			query: (id) => ({
				url: `/${id}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const {
	useGetAllProductsQuery,
	useGetProductByIdQuery,
	useGetProductByCategoryQuery,
	useCreateProductMutation,
} = productApi;
