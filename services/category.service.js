import BaseService from "./base.service.js";
import categoryModel from "../models/category.model.js";

class CategoryService extends BaseService {
	constructor() {
		super(categoryModel);
	}

	async generateUniqueSlug(name) {
		let baseSlug = name
			.toLowerCase()
			.replace(/\s+/g, "-")
			.replace(/[^a-z0-9-]/g, "");
		let slug = baseSlug;
		let count = 1;
		while (await this.model.exists({ slug })) {
			slug = `${baseSlug}-${count++}`;
		}
		return slug;
	}

	async create(data) {
		const slug = await this.generateUniqueSlug(data.name);
		return await this.model.create({ ...data, slug });
	}

	async getWithProducts(id) {
		return await this.model.findById(id).populate("products");
	}
}

export default new CategoryService();
