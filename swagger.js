import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Auth API",
			version: "1.0.0",
			description:
				"Authentication va foydalanuvchilarni boshqarish uchun API",
		},
		servers: [
			{
				url: "http://localhost:5050/api/auth",
				description: "Local server",
			},
		],
	},
	apis: ["./routes/*.js"], // Router fayllarda yozilgan Swagger annotationlarni o‘qiydi
};

const swaggerSpec = swaggerJsdoc(options);

export function swaggerDocs(app) {
	app.use(
		"/api/docs",
		swaggerUi.serve,
		swaggerUi.setup(swaggerSpec)
	);
}
