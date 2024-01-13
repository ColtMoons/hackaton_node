const userService = require('../../services/user/index.service');
const errors = require('../../helpers/errors.helper');

const main = async (request, response, next) => {
	try {
		const userId = request.user?.id || request.params.userId;
		const users = await userService.getById(userId);

		if (users.length === 0) {
      errors.notFoundError('Usuario no encontrado', 'USER_NOT_FOUND');
    }
		request.user = users[0];

		next();
	} catch (error) {
		next(error);
	}
};

module.exports = main;
