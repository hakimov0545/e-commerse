// AUTH TYPES

export default interface IRegisterRequest {
	name: string;
	lastname: string;
	email: string;
	password: string;
}

export default interface ILoginRequest {
	email: string;
	password: string;
}

export default interface IAuthResponse {
	accessToken: string;
	refreshToken: string;
	user: IUser;
}

// CATEGORY TYPES

export interface ICategory {
	_id: string;
	name: string;
	description?: string;
	createdAt: string;
	updatedAt: string;
	slug: string;
}

export interface ICreateCategoryDto {
	name: string;
	description?: string;
}

export interface IUpdateCategoryDto {
	name?: string;
	description?: string;
}

// ORDER TYPES

export interface IOrderProduct {
	product: IProduct;
	quantity: number;
}

export interface IAddOrderProduct {
	product: IProduct;
	quantity: number;
}

export interface IOrder {
	_id: string;
	user: IUser;
	products: IOrderProduct[];
	status: "pending" | "shipped" | "delivered" | "cancelled";
	address?: string;
	createdAt: string;
	updatedAt: string;
	totalAmount: number;
}

export interface ICreateOrderDto {
	products: IAddOrderProduct[];
	address?: string;
}

export interface IUpdateOrderStatusDto {
	status: "pending" | "shipped" | "delivered" | "cancelled";
}

// PRODUCT TYPES

export interface IProduct {
	_id: string;
	name: string;
	description?: string;
	price: number;
	category: string;
	images: string[];
}

export interface IPopulatedProduct {
	_id: string;
	name: string;
	description?: string;
	price: number;
	category: ICategory;
	reviews: IReview[];
	images: string[];
}

export interface ICreateProductDto {
	name: string;
	description?: string;
	price: number;
	category: string;
}

export interface IUpdateProductDto {
	name?: string;
	description?: string;
	price?: number;
	category?: string;
}

// REVIEW TYPES

export interface IReview {
	_id: string;
	product: string | { _id: string; name: string }; // product ID yoki populated product
	user: string | { _id: string; name: string; lastname: string }; // user ID yoki populated user
	rating: number;
	comment: string;
	createdAt: string;
	updatedAt?: string;
}

export interface ICreateReviewDto {
	product: string;
	rating: number;
	comment: string;
}

export interface IUpdateReviewDto {
	rating?: number;
	comment?: string;
}

// USER TYPES

export interface IUser {
	_id: string;
	name: string;
	lastname: string;
	email: string;
	address?: string;
	phone?: string;
	role: "user" | "admin";
	createdAt: string;
	updatedAt: string;
}

export interface IUpdateUserProfileDto {
	name?: string;
	lastname?: string;
	email?: string;
	address?: string;
	phone?: string;
}

export interface IDashboardStats {
	totalUsers: number;
	totalProducts: number;
	totalOrders: number;
	totalReviews: number;
	totalCategories: number;
	totalRevenue: number;
}

export interface IRevenueStats {
	revenue: number;
	orders: number;
	period: string;
}

export interface IOrderStatusStat {
	status: string;
	count: number;
	totalAmount: number;
}

export interface IRevenueByDate {
	date: string;
	revenue: number;
	orders: number;
}

export interface IOrdersByDate {
	date: string;
	count: number;
}

export interface ITopProduct {
	productId: string;
	productName: string;
	productPrice: number;
	totalQuantity: number;
	totalRevenue: number;
}

export interface IProductsByCategory {
	categoryName: string;
	count: number;
	[key: string]: any;
}

export interface IDashboardData {
	stats: IDashboardStats;
	revenueStats: IRevenueStats;
	orderStatusStats: IOrderStatusStat[];
	revenueByDate: IRevenueByDate[];
	ordersByDate: IOrdersByDate[];
	topProducts: ITopProduct[];
	recentOrders: any[];
	productsByCategory: IProductsByCategory[];
}
