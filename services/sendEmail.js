const nodemailer = require("nodemailer");

const sendMail = async ({ from, to, subject, text, html }) => {
	const transporter = nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: process.env.SMTP_PORT,
		secure: false,
		auth: {
			user: process.env.NODEMAILER_EMAIL,
			pass: process.env.NODEMAILER_PASSWORD,
		},
	});

	let info = await transporter.sendMail({
		from: `FileShare-Hub <${from}>`,
		to,
		subject,
		text,
		html,
	});
};

module.exports = sendMail;