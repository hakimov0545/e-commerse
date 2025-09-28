import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "@/services/auth.api";
import { categoryApi } from "@/services/category.api";
import { orderApi } from "@/services/order.api";
import { productApi } from "@/services/product.api";
import { reviewApi } from "@/services/review.api";
import { userApi } from "@/services/user.api";
import { wishlistApi } from "@/services/wishlist.api";

const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[categoryApi.reducerPath]: categoryApi.reducer,
		[orderApi.reducerPath]: orderApi.reducer,
		[productApi.reducerPath]: productApi.reducer,
		[reviewApi.reducerPath]: reviewApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
		[wishlistApi.reducerPath]: wishlistApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			categoryApi.middleware,
			authApi.middleware,
			orderApi.middleware,
			reviewApi.middleware,
			userApi.middleware,
			wishlistApi.middleware,
			productApi.middleware
		),
});

export default store;
