import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./base.query";
import type {
	ICreateOrderDto,
	IOrder,
	IUpdateOrderStatusDto,
} from "@/types";

export const orderApi = createApi({
	reducerPath: "orderApi",
	baseQuery: baseQueryWithReauth,
	tagTypes: ["Order"],
	endpoints: (builder) => ({
		// ✅ Buyurtma yaratish (faqat login user)
		createOrder: builder.mutation<IOrder, ICreateOrderDto>({
			query: (body) => ({
				url: "/orders",
				method: "POST",
				body,
			}),
			invalidatesTags: ["Order"],
		}),

		// ✅ Foydalanuvchining buyurtmalari
		getMyOrders: builder.query<IOrder[], void>({
			query: () => ({
				url: "/orders/my",
				method: "GET",
			}),
			providesTags: ["Order"],
		}),

		// ✅ Barcha buyurtmalar (faqat admin)
		getAllOrders: builder.query<IOrder[], void>({
			query: () => ({
				url: "/orders",
				method: "GET",
			}),
			providesTags: ["Order"],
		}),

		// ✅ Buyurtma statusini yangilash (faqat admin)
		updateOrderStatus: builder.mutation<
			IOrder,
			{ id: string; data: IUpdateOrderStatusDto }
		>({
			query: ({ id, data }) => ({
				url: `/orders/${id}/status`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["Order"],
		}),
	}),
});

export const {
	useCreateOrderMutation,
	useGetMyOrdersQuery,
	useGetAllOrdersQuery,
	useUpdateOrderStatusMutation,
} = orderApi;
