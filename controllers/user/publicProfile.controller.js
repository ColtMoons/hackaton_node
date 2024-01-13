const main = async (request, response, next) => {
	try {
		const { id, username, avatar, createdAt } = request.user;

		const userDTO = { id, username, avatar, createdAt };

		response.send({
			status: 'success',
			message: 'Usuario obtenido con éxito',
			data: {
				user: userDTO,
			},
		});
	} catch (error) {
		next(error);
	}
};

module.exports = main;
