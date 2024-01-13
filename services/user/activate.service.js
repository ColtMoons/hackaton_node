const getPool = require('../../db/getPool');
const errors = require('../../helpers/errors.helper');

const main = async (user) => {
	try {
		const pool = await getPool();

		const sqlQuery =
			'UPDATE users SET active = TRUE, registrationCode = null WHERE id = ?';
		const values = [user.id];
		const [response] = await pool.query(sqlQuery, values);

		if (response.affectedRows !== 1) {
			errors.conflictError('Error al activar Usuario', 'USER_ACTIVATE_ERROR');
		}
	} catch (error) {
		errors.internalServerError(error.message, 'DATA_UPDATE_ERROR');
	}
};

module.exports = main;
