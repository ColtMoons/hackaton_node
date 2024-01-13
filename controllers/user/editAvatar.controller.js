const validateSchema = require('../../helpers/validate.helper');
const schema = require('../../schemas/user/editAvatar.schema');
const fileService = require('../../services/files/index.service');
const userService = require('../../services/user/index.service');
const errors = require('../../helpers/errors.helper');

const main = async (request, response, next) => {
	try {
		//validar archivos
		await validateSchema(schema, request.files || {});

		//almacenar nueva foto
		const fileName = await fileService.savePhoto(request.files.avatar, 150);

		//actualizar base de datos
		try {
			await userService.updateAvatar(request.user, fileName);
		} catch (error) {
			await fileService.deleteFile(fileName);
			next(error);
		}

		//eliminar foto vieja
		if (request.user.avatar) await fileService.deleteFile(request.user.avatar);

		response.send({
			status: 'success',
			message: 'Avatar Actualizado con exito',
		});
	} catch (error) {
		next(error);
	}
};

module.exports = main;
