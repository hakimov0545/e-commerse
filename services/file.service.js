import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { BaseError } from "../errors/base.error.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class FileService {
	save(file) {
		try {
			// Multer dan kelmagan file bo'lsa (fieldname, originalname va.b.z)
			if (!file || !file.filename) {
				throw new Error("Invalid file object");
			}

			// Multer allaqachon fayl saqlab bo'lganidan, shundan faqat nom olish
			// Multer uploads/ papkasiga saqlab bo'ladi
			return "uploads/" + file.filename;
		} catch (error) {
			throw BaseError.BadRequest(
				"Error processing file " + error
			);
		}
	}
}

export default new FileService();
