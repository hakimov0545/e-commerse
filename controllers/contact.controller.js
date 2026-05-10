import contactService from "../services/contact.service.js";

class ContactController {
	async getAll(req, res) {
		try {
			const contacts = await contactService.getAll();
			res.status(200).json(contacts);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}

	async create(req, res) {
		try {
			const contact = await contactService.create(req.body);
			res.status(201).json(contact);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}
}

export default new ContactController();
