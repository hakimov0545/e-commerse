import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./base.query";
import type { IContact } from "@/types";

export const contactApi = createApi({
	reducerPath: "contactApi",
	baseQuery: baseQueryWithReauth,
	tagTypes: ["Contact"],
	endpoints: (builder) => ({
		// ✅ Barcha kontaktlarni olish
		getAllContacts: builder.query<IContact[], void>({
			query: () => ({
				url: "/contacts",
				method: "GET",
			}),
			providesTags: ["Contact"],
		}),
	}),
});

export const { useGetAllContactsQuery } = contactApi;
