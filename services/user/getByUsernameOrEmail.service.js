const getPool = require('../../db/getPool');
const errors = require('../../helpers/errors.helper');

const main = async (username, email) => {
	try {
		const pool = await getPool();

		const sqlQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
		const values = [username, email];
		const [users] = await pool.query(sqlQuery, values);

		return users;
	} catch (error) {
		errors.internalServerError(error.message, 'DATA_CONSULT_ERROR');
	}
};

module.exports = main;
