const bcrypt = require('bcrypt');
const validateSchema = require('../../helpers/validate.helper');
const randomString = require('randomstring');
const registerSchema = require('../../schemas/user/register.schema');
const userService = require('../../services/user/index.service');
const errors = require('../../helpers/errors.helper');

const main = async (request, response, next) => {
	try {
		//validation
		await validateSchema(registerSchema, request.body);
		const { email, username, password } = request.body;

		//se genera un codigo de registro aleatorio
		const registrationCode = randomString.generate(30);

		//validacion que no exista un usuario con el mismo nombre o email ya registrados
		const users = await userService.getByUserNameOrEmail(username, email);

		if (users.length > 0) {
			errors.conflictError(
				'El usuario o email ya se encuentra registrado',
				'USER_REGISTER_ERROR'
			);
		}

		//se encripta la contraseña
		const passwordEncoded = await bcrypt.hash(password, 5);
		//se registra
		await userService.registerService(
			username,
			passwordEncoded,
			email,
			registrationCode
		);

		//se envia el email de confirmación
		await userService.registerSendEmail(email, registrationCode);

		response.send({
			status: 'success',
			message: 'Usuario registrado con exito',
		});
	} catch (error) {
		next(error);
	}
};

module.exports = main;
