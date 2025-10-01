import BaseService from "./base.service.js";
import productModel from "../models/product.model.js";
import fileService from "./file.service.js";

class ProductService extends BaseService {
	constructor() {
		super(productModel);
	}

	async getPopulated(id) {
		return await this.model
			.findById(id)
			.populate("category")
			.populate("reviews");
	}

	async getAllPopulated() {
		return await this.model.find().populate("category");
	}

	async getByCategory(categoryId) {
		return await this.model.find({ category: categoryId });
	}

	async generateUniqueSlug(name) {
		let baseSlug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
		let slug = baseSlug;
		let count = 1;
		while (await this.model.exists({ slug })) {
			slug = `${baseSlug}-${count++}`;
		}
		return slug;
	}

	async create(data, pictures) {
		const picturePaths = pictures
			? pictures.map((file) => {
					const fileName = fileService.save(file);
					return fileName;
			  })
			: [];
		const slug = await this.generateUniqueSlug(data.name);
		const productData = { ...data, images: picturePaths, slug };
		return await this.model.create(productData);
	}
}

export default new ProductService();
