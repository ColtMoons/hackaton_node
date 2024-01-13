const { SECRET_KEY, EXPIRE_TOKEN } = require('../../utils/config');
const jwt = require('jsonwebtoken');

const main = (tokenInfo) => {
	const token = jwt.sign(tokenInfo, SECRET_KEY, { expiresIn: EXPIRE_TOKEN });

	return token;
};

module.exports = main;
