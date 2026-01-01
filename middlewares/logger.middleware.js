import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const LOG_DIR = path.join(__dirname, "..", "logs");

await fs.mkdir(LOG_DIR, { recursive: true });

export function logger() {
	return (req, res, next) => {
		const start = process.hrtime.bigint();
		res.on("finish", async () => {
			const end = process.hrtime.bigint();
			const duration = Number(end - start) / 1e6;
			const now = new Date();
			const day = now.toISOString().slice(0, 10);
			const filePath = path.join(LOG_DIR, `${day}.log`);

			const line =
				[
					now.toLocaleString(),
					req.ip || "-",
					req.method,
					req.originalUrl || req.url,
					res.statusCode,
					`${duration.toFixed(1)}ms`,
					JSON.stringify(req.headers["user-agent"] || "-"),
				].join(" | ") + "\n";

			try {
				await fs.appendFile(filePath, line, "utf8");
			} catch (e) {
				console.error("Log yozishda hato ", e.message);
			}
		});
		next();
	};
}
