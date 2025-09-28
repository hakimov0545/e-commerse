import BaseService from "./base.service.js";
import productModel from "../models/product.model.js";
import fileService from "./file.service.js";

class ProductService extends BaseService {
	constructor() {
		super(productModel);
	}

	async getByCategory(categoryId) {
		return await this.model.find({ category: categoryId });
	}

	async create(data, pictures) {
		const picturePaths = pictures
			? pictures.map((file) => {
					const fileName = fileService.save(file);
					return fileName;
			  })
			: [];
		const productData = { ...data, images: picturePaths };
		return await this.model.create(productData);
	}
}

export default new ProductService();
