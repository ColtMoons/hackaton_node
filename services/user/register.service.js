const getPool = require('../../db/getPool');
const errors = require('../../helpers/errors.helper');

const main = async (username, password, email, registrationCode) => {
	try {
		const pool = await getPool();

		const sqlQuery =
			'INSERT INTO users (username, password, email, registrationCode) VALUES (?, ?, ?, ?)';
		const values = [username, password, email, registrationCode];

		const [response] = await pool.query(sqlQuery, values);

		if (response.affectedRows !== 1) {
			errors.conflictError(
				'Error al insertar nuevo Usuario',
				'INSERT_USER_ERROR'
			);
		}

		console.log(response);

		return response.insertId;
	} catch (error) {
		errors.internalServerError(error.message, 'DATA_INSERT_ERROR');
	}
};

module.exports = main;
