// src/services/dashboard.api.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./base.query";
import type {
	IDashboardData,
	IDashboardStats,
	IRevenueStats,
	IOrderStatusStat,
	IRevenueByDate,
	IOrdersByDate,
	ITopProduct,
	IProductsByCategory,
} from "@/types";

export const dashboardApi = createApi({
	reducerPath: "dashboardApi",
	baseQuery: baseQueryWithReauth,
	tagTypes: ["Dashboard"],
	endpoints: (builder) => ({
		// Get all dashboard data
		getDashboardData: builder.query<
			IDashboardData,
			{ fromDate?: string; toDate?: string; period?: string }
		>({
			query: (params) => {
				const queryParams = new URLSearchParams();
				if (params.fromDate)
					queryParams.append("fromDate", params.fromDate);
				if (params.toDate)
					queryParams.append("toDate", params.toDate);
				if (params.period)
					queryParams.append("period", params.period);
				return `/dashboard?${queryParams.toString()}`;
			},
			providesTags: ["Dashboard"],
		}),

		// Get stats
		getStats: builder.query<IDashboardStats, void>({
			query: () => "/dashboard/stats",
			providesTags: ["Dashboard"],
		}),

		// Get revenue stats
		getRevenueStats: builder.query<IRevenueStats, string | void>({
			query: (period) =>
				period
					? `/dashboard/revenue?period=${period}`
					: "/dashboard/revenue",
			providesTags: ["Dashboard"],
		}),

		// Get order status stats
		getOrderStatusStats: builder.query<IOrderStatusStat[], void>({
			query: () => "/dashboard/order-status",
			providesTags: ["Dashboard"],
		}),

		// Get revenue by date
		getRevenueByDate: builder.query<
			IRevenueByDate[],
			{ fromDate?: string; toDate?: string }
		>({
			query: (params) => {
				const queryParams = new URLSearchParams();
				if (params.fromDate)
					queryParams.append("fromDate", params.fromDate);
				if (params.toDate)
					queryParams.append("toDate", params.toDate);
				return `/dashboard/revenue-by-date?${queryParams.toString()}`;
			},
			providesTags: ["Dashboard"],
		}),

		// Get orders by date
		getOrdersByDate: builder.query<
			IOrdersByDate[],
			{ fromDate?: string; toDate?: string }
		>({
			query: (params) => {
				const queryParams = new URLSearchParams();
				if (params.fromDate)
					queryParams.append("fromDate", params.fromDate);
				if (params.toDate)
					queryParams.append("toDate", params.toDate);
				return `/dashboard/orders-by-date?${queryParams.toString()}`;
			},
			providesTags: ["Dashboard"],
		}),

		// Get top products
		getTopProducts: builder.query<ITopProduct[], number | void>({
			query: (limit) =>
				limit
					? `/dashboard/top-products?limit=${limit}`
					: "/dashboard/top-products",
			providesTags: ["Dashboard"],
		}),

		// Get recent orders
		getRecentOrders: builder.query<any[], number | void>({
			query: (limit) =>
				limit
					? `/dashboard/recent-orders?limit=${limit}`
					: "/dashboard/recent-orders",
			providesTags: ["Dashboard"],
		}),

		// Get products by category
		getProductsByCategory: builder.query<
			IProductsByCategory[],
			void
		>({
			query: () => "/dashboard/products-by-category",
			providesTags: ["Dashboard"],
		}),
	}),
});

export const {
	useGetDashboardDataQuery,
	useGetStatsQuery,
	useGetRevenueStatsQuery,
	useGetOrderStatusStatsQuery,
	useGetRevenueByDateQuery,
	useGetOrdersByDateQuery,
	useGetTopProductsQuery,
	useGetRecentOrdersQuery,
	useGetProductsByCategoryQuery,
} = dashboardApi;
