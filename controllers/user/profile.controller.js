const main = async (request, response, next) => {
	try {
		const { id, username, email, role, avatar, createdAt } = request.user;

		const userDTO = { id, username, email, role, avatar, createdAt };

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
