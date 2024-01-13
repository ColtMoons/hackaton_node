const bcrypt = require('bcrypt');
const validateSchema = require('../../helpers/validate.helper');
const schema = require('../../schemas/user/login.schema');
const userService = require('../../services/user/index.service');
const errors = require('../../helpers/errors.helper');
const securityService = require('../../services/security/index.service');

const main = async (request, response, next) => {
	try {
		//validación
		await validateSchema(schema, request.body);

		const users = await userService.getByUserNameOrEmail(request.body.username, '');
		if (users.length === 0) {
			errors.notFoundError('Usuario no encontrado', 'USER_NOT_FOUND');
		}

		const validPassword = await bcrypt.compare(
			request.body.password,
			users[0].password
		);

		if (!validPassword) {
			errors.notAuthorizedError(
				'Credenciales incorrectas',
				'INVALID_CREDENTIALS'
			);
		}

		if (!users[0].active) {
			if (users[0].registrationCode !== null) {
				errors.forbiddenError('Usuario aún no activado', 'PENDING_ACTIVATION');
			} else {
				errors.forbiddenError('El usuario esta desactivado', 'USER_INACTIVE');
			}
		}

		const tokenInfo = {
			id: users[0].id,
			role: users[0].role,
		};

		const token = securityService.createToken(tokenInfo);

		response.send({
			status: 'success',
			message: 'Usuario logueado con exito',
			data: {
				token,
			},
		});
	} catch (error) {
		next(error);
	}
};

module.exports = main;
