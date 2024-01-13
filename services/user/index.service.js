const getByUserNameOrEmail = require('./getByUsernameOrEmail.service');
const getByRegistrationCode = require('./getByRegistrationCode.service');
const registerService = require('./register.service');
const registerSendEmail = require('./registerSendEmail.service');
const activate = require('./activate.service');
const getById = require('./getById.service');
const updateAvatar = require('./updateAvatar.service');

module.exports = {
	registerService,
	getByUserNameOrEmail,
	registerSendEmail,
	getByRegistrationCode,
	activate,
	getById,
	updateAvatar,
};
