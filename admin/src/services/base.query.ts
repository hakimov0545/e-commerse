import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { API_URL } from "@/constants";

const rawBaseQuery = fetchBaseQuery({
	baseUrl: `${API_URL}/api`,
	prepareHeaders: (headers) => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			headers.set("Authorization", `Bearer ${token}`);
		}
		return headers;
	},
});

export const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	let result = await rawBaseQuery(args, api, extraOptions);

	if (result.error && result.error.status === 401) {
		// refresh token ishlatish
		const refreshToken = localStorage.getItem("refreshToken");

		const refreshResult = await rawBaseQuery(
			{
				url: "/auth/refresh",
				method: "POST",
				body: { refreshToken },
			},
			api,
			extraOptions
		);

		if (
			refreshResult.data &&
			(refreshResult.data as any).accessToken
		) {
			const newAccessToken = (refreshResult.data as any)
				.accessToken;
			localStorage.setItem("accessToken", newAccessToken);

			// qayta so‘rov
			result = await rawBaseQuery(args, api, extraOptions);
		} else {
			localStorage.clear();
			window.location.href = "/login";
		}
	}

	return result;
};
