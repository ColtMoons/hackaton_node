const path = require('path');
const fs = require('fs/promises');
const randomstring = require('randomstring');
const sharp = require('sharp');
const { UPLOADS_DIR } = require('../../utils/config');
const errors = require('../../helpers/errors.helper');

const main = async (image, width) => {
	try {
		const uploadDir = path.join(process.cwd(), '..', UPLOADS_DIR);

		try {
			await fs.access(uploadDir);
		} catch (error) {
			await fs.mkdir(uploadDir);
		}

		const imgSharp = sharp(image.data);
		imgSharp.resize(width);
		const nameRandom = randomstring.generate(15) + '.jpg';
		const imgPath = path.join(uploadDir, nameRandom);

		await imgSharp.toFile(imgPath);
		return nameRandom;
	} catch (error) {
    errors.internalServerError(error.message, 'SAVE_PHOTO_ERROR');
  }
};

module.exports = main;
