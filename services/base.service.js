export default class BaseService {
	constructor(model) {
		this.model = model;
	}

	async getAll(filter = {}) {
		return await this.model.find(filter);
	}

	async getById(id) {
		return await this.model.findById(id);
	}

	async getOne(filter = {}) {
		return await this.model.findOne(filter);
	}

	async create(data) {
		return await this.model.create(data);
	}

	async update(id, data) {
		return await this.model.findByIdAndUpdate(id, data, {
			new: true,
		});
	}

	async delete(id) {
		return await this.model.findByIdAndDelete(id);
	}

	async paginate(page = 1, limit = 10) {
		const skip = (page - 1) * limit;
		const data = await this.model.find().skip(skip).limit(limit);
		const total = await this.model.countDocuments();
		return {
			data,
			total,
			page,
			totalPages: Math.ceil(total / limit),
		};
	}
}
