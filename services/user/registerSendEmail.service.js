const sendEmail = require('../../helpers/email.helper');
const emailHelper = require('../../helpers/email.helper');

const main = async (email, registrationCode) => {
	const emailBody = `
		<h1>Bienvenido</h1>
		Gracias por registrarte en Diario de Viajes. Para activar tu cuenta, haz click en el siguiente enlace:
		
		<a href="http://localhost:8080/users/validate/${registrationCode}">Activar mi cuenta</a>`;
	const emailSubject = 'Bienvenido al Sistema';

	await sendEmail(email, emailSubject, emailBody);
};

module.exports = main;
