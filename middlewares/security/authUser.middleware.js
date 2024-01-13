const { SECRET_KEY } = require('../../utils/config');
const jwt = require('jsonwebtoken');
const errors = require('../../helpers/errors.helper');

const main = (request, response, next) => {
	try {
		const { authorization } = request.headers;
		if (!authorization) {
			errors.notAuthorizedError('Token requerido');
		}

		let tokenInfo;
		try {
			tokenInfo = jwt.verify(authorization, SECRET_KEY);
		} catch (error) {
			errors.notAuthorizedError('El token es incorrecto');
		}

    request.user = tokenInfo;
    next();
	} catch (error) {
		next(error);
	}
};

module.exports = main;
