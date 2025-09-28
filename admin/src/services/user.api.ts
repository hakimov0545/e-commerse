// src/services/user.api.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./base.query";
import type { IUpdateUserProfileDto, IUser } from "@/types";

export const userApi = createApi({
	reducerPath: "userApi",
	baseQuery: baseQueryWithReauth,
	tagTypes: ["User"],
	endpoints: (builder) => ({
		// ✅ Get current user's profile
		getProfile: builder.query<IUser, void>({
			query: () => "/users/profile",
			providesTags: ["User"],
		}),

		// ✅ Update current user's profile
		updateProfile: builder.mutation<IUser, IUpdateUserProfileDto>(
			{
				query: (body) => ({
					url: "/users/profile",
					method: "PUT",
					body,
				}),
				invalidatesTags: ["User"],
			}
		),

		// ✅ Get all users (admin only)
		getAllUsers: builder.query<IUser[], void>({
			query: () => "/users",
			providesTags: ["User"],
		}),

		// ✅ Delete user (admin only)
		deleteUser: builder.mutation<
			{ success: boolean; id: string },
			string
		>({
			query: (id) => ({
				url: `/users/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["User"],
		}),
	}),
});

export const {
	useGetProfileQuery,
	useUpdateProfileMutation,
	useGetAllUsersQuery,
	useDeleteUserMutation,
} = userApi;
