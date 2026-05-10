import contactModel from "../models/contact.model.js";

class ContactService {
	async create(data) {
		return await contactModel.create(data);
	}

	async getAll() {
		return await contactModel.find();
	}
}

export default new ContactService();
