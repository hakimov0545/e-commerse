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
	product: string;
	quantity: number;
}

export interface IOrder {
	_id: string;
	user: string;
	products: IOrderProduct[];
	status: "pending" | "shipped" | "delivered" | "cancelled";
	address?: string;
	createdAt: string;
	updatedAt: string;
}

export interface ICreateOrderDto {
	products: IOrderProduct[];
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
	product: string; // product ID
	user: string; // user ID
	rating: number;
	comment: string;
	createdAt: string;
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
