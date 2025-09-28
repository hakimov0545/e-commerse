import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./base.query";
import type IAuthResponse from "@/types";
import type IRegisterRequest from "@/types";
import type ILoginRequest from "@/types";

// Typelar

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: baseQueryWithReauth,
	endpoints: (builder) => ({
		register: builder.mutation<IAuthResponse, IRegisterRequest>({
			query: (body) => ({
				url: "/auth/register",
				method: "POST",
				body,
			}),
		}),
		login: builder.mutation<IAuthResponse, ILoginRequest>({
			query: (body) => ({
				url: "/auth/login",
				method: "POST",
				body,
			}),
		}),
		logout: builder.mutation<{ message: string }, void>({
			query: () => ({
				url: "/auth/logout",
				method: "POST",
			}),
		}),
		refresh: builder.mutation<
			IAuthResponse,
			{ refreshToken: string }
		>({
			query: (body) => ({
				url: "/auth/refresh",
				method: "POST",
				body,
			}),
		}),
	}),
});

export const {
	useRegisterMutation,
	useLoginMutation,
	useLogoutMutation,
	useRefreshMutation,
} = authApi;
