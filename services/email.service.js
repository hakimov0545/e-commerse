import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

class EmailService {
	constructor() {
		if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
			throw new Error(
				"EMAIL_USER va EMAIL_PASSWORD .env faylida to'liq sozlangan bo'lishi kerak",
			);
			process.exit(1);
		}

		this.transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 465,
			secure: true,
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASSWORD,
			},
		});
	}

	async sendVerificationCode(email, verificationCode, userName) {
		try {
			const mailOptions = {
				from: process.env.EMAIL_USER,
				to: email,
				subject: "Parolni yangilash uchun verification code",
				html: `
					<h2>Salom ${userName}!</h2>
					<p>Parolni yangilash uchun quyidagi kodni ishlating:</p>
					<h1 style="background-color: #f0f0f0; padding: 10px; border-radius: 5px;">
						${verificationCode}
					</h1>
					<p>Bu kod 10 minut davomida amal qiladi.</p>
					<p>Agar siz bu so'rovni yubormaganiz bo'lsa, ushbu emailni inobatga olmang.</p>
					<hr>
					<p style="color: #999; font-size: 12px;">E-Commerce Platform</p>
				`,
			};

			const info = await this.transporter.sendMail(mailOptions);
			return info;
		} catch (error) {
			console.error("Email sending error:", error);
			throw new Error(
				"Email yuborishda xato: " + error.message,
			);
		}
	}

	async sendEmail(email, subject, htmlContent) {
		try {
			const mailOptions = {
				from: process.env.EMAIL_USER,
				to: email,
				subject: subject,
				html: htmlContent,
			};

			const info = await this.transporter.sendMail(mailOptions);
			return info;
		} catch (error) {
			console.error("Email sending error:", error);
			throw new Error(
				"Email yuborishda xato: " + error.message,
			);
		}
	}
}

export default new EmailService();
