import BaseService from "./base.service.js";
import categoryModel from "../models/category.model.js";

class CategoryService extends BaseService {
	constructor() {
		super(categoryModel);
	}
}

export default new CategoryService();
