const nodemailer = require('nodemailer');
const {
	SMTP_HOST,
	SMTP_PORT,
	SMTP_USER,
	SMTP_PASS,
} = require('../utils/config');
const { sendEmailError } = require('./errors.helper');

const transporter = nodemailer.createTransport({
	host: SMTP_HOST,
	port: SMTP_PORT,
	auth: {
		user: SMTP_USER,
		pass: SMTP_PASS,
	},
	tls: {
		rejectUnauthorized: false,
	},
});

const sendMail = async (emailTo, subject, body) => {
	try {
		const mailOptions = {
			from: SMTP_USER,
			to: emailTo,
			subject: subject,
			text: body,
		};

		await transporter.sendMail(mailOptions);
	} catch (error) {
		console.log(error);
		sendEmailError();
	}
};

module.exports = sendMail;
