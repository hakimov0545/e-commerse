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
			const fileName = uuidv4() + ".jpg";
			console.log(fileName);
			const currentDir = __dirname;
			console.log(currentDir);
			const staticDir = path.join(currentDir, "..", "static");
			const filePath = path.join(staticDir, fileName);

			if (!fs.existsSync(staticDir)) {
				fs.mkdirSync(staticDir, { recursive: true });
			}

			file.mv(filePath);
			return fileName;
		} catch (error) {
			throw BaseError.BadRequest("Error saving file " + error);
		}
	}
}

export default new FileService();
