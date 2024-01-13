const getPool = require('../../db/getPool');
const errors = require('../../helpers/errors.helper');

const main = async (user, avatar) => {
	try {
		const pool = await getPool();

		const sqlQuery =
			'UPDATE users SET avatar = ? WHERE id = ?';
		const values = [avatar, user.id];
		const [response] = await pool.query(sqlQuery, values);

		if (response.affectedRows !== 1) {
			errors.conflictError('Error al actualizar Avatar', 'UPDATE_AVATAR_ERROR');
		}
	} catch (error) {
		errors.internalServerError(error.message, 'DATA_UPDATE_ERROR');
	}
};

module.exports = main;
