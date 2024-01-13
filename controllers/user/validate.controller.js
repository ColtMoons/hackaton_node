const validateSchema = require('../../helpers/validate.helper');
const schema = require('../../schemas/user/validate.schema');
const userService = require('../../services/user/index.service');
const errors = require('../../helpers/errors.helper');

const main = async (request, response, next) => {
	try {
		const { registrationCode } = request.params;
		//validar schema
		await validateSchema(schema, { registrationCode });

		const users = await userService.getByRegistrationCode(registrationCode);

		if (users.length > 1) {
			errors.conflictError(
				'Se detecto más de un usuario con el mismo registration code',
				'USER_VALIDATE_ERROR'
			);
		}

		if (users.length === 0) {
			errors.conflictError(
				'Usuario anteriormente activado',
				'USER_VALIDATE_ERROR'
			);
		}

		await userService.activate(users[0]);

		response.send({
			status: 'success',
			message: 'Usuario activado con éxito',
		});
	} catch (error) {
		next(error);
	}
};

module.exports = main;
