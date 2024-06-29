const nodemailer = require("nodemailer");

const sendMail = async ({ from, to, subject, text, html }) => {
	const transporter = nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: process.env.SMTP_PORT,
		secure: false,
		auth: {
			user: "your-email@gmail.com",
			pass: "your-email-password",
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

// Send mail with the defined transport object
// transporter.sendMail(mailOptions, (error, info) => {
// 	if (error) {
// 		return console.log(error);
// 	}
// 	console.log("Message sent: %s", info.messageId);
// 	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
// });

module.exports = sendMail;
