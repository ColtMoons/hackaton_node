const path = require('path');
const fs = require('fs/promises');
const errors = require('../../helpers/errors.helper');
const { UPLOADS_DIR } = require('../../utils/config');

const main = async (fileName) => {
	try {
		const imgPath = path.join(process.cwd(), '..', UPLOADS_DIR, fileName);

		try {
			await fs.access(imgPath);
		} catch (error) {
			return;
		}

		await fs.unlink(imgPath);
	} catch (error) {
		errors.internalServerError(error.message, 'DELETE_FILE_ERROR');
	}
};

module.exports = main;
