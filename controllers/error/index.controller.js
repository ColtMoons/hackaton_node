const main = (error, request, response, next) => {
	console.error(error);
	response.status(error.status || 500).send({ ...error, status: 'error' });
};

module.exports = main;
