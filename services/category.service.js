import BaseService from "./base.service.js";
import categoryModel from "../models/category.model.js";

class CategoryService extends BaseService {
	constructor() {
		super(categoryModel);
	}

	async getWithProducts(id) {
		return await this.model.findById(id).populate("products");
	}
}

export default new CategoryService();
