import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./base.query";
import type {
	ICategory,
	ICreateCategoryDto,
	IUpdateCategoryDto,
} from "@/types";

export const categoryApi = createApi({
	reducerPath: "categoryApi",
	baseQuery: baseQueryWithReauth,
	tagTypes: ["Category"],
	endpoints: (builder) => ({
		// ✅ Barcha kategoriyalarni olish
		getAllCategories: builder.query<ICategory[], void>({
			query: () => ({
				url: "/categories",
				method: "GET",
			}),
			providesTags: ["Category"],
		}),

		// ✅ ID bo‘yicha kategoriya olish
		getCategoryById: builder.query<ICategory, string>({
			query: (id) => ({
				url: `/categories/${id}`,
				method: "GET",
			}),
			providesTags: ["Category"],
		}),

		// ✅ ID bo‘yicha kategoriya va uning mahsulotlarini olish
		getWithProducts: builder.query<ICategory, string>({
			query: (id) => ({
				url: `/categories/${id}/products`,
			}),
			providesTags: ["Category"],
		}),

		// ✅ Yangi kategoriya yaratish (admin)
		createCategory: builder.mutation<
			ICategory,
			ICreateCategoryDto
		>({
			query: (body) => ({
				url: "/categories",
				method: "POST",
				body,
			}),
			invalidatesTags: ["Category"],
		}),

		// ✅ Kategoriya yangilash (admin)
		updateCategory: builder.mutation<
			ICategory,
			{ id: string; data: IUpdateCategoryDto }
		>({
			query: ({ id, data }) => ({
				url: `/categories/${id}`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["Category"],
		}),

		// ✅ Kategoriya o‘chirish (admin)
		deleteCategory: builder.mutation<{ message: string }, string>(
			{
				query: (id) => ({
					url: `/categories/${id}`,
					method: "DELETE",
				}),
				invalidatesTags: ["Category"],
			}
		),
	}),
});

export const {
	useGetAllCategoriesQuery,
	useGetCategoryByIdQuery,
	useGetWithProductsQuery,
	useCreateCategoryMutation,
	useUpdateCategoryMutation,
	useDeleteCategoryMutation,
} = categoryApi;
