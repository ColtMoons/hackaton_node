const conflictError = (message, code = 'CONFLICT') => {
  const error = new Error();
  error.code = code;
  error.httpStatus = 409;
  error.message = message;

  throw error;
}

const notFoundError = (message, code = 'NOT_FOUND') => {
	const error = new Error();
	error.code = code;
	error.httpStatus = 404;
	error.message = message;

	throw error;
};

const notAuthorizedError = (message, code = 'UNAUTHORIZED') => {
	const error = new Error();
	error.code = code;
	error.httpStatus = 401;
	error.message = message;

	throw error;
};

const forbiddenError = (message, code = 'FORBIDDEN') => {
	const error = new Error();
	error.code = code;
	error.httpStatus = 403;
	error.message = message;

	throw error;
};

const internalServerError = (message, code = 'INTERNAL_ERROR') => {
	const error = new Error();
	error.code = code;
	error.httpStatus = 500;
	error.message = message;

	throw error;
};

const badRequestError = (message, code = 'BAD_REQUEST_ERROR') => {
	const error = new Error();
	error.code = code;
	error.httpStatus = 400;
	error.message = message;

	throw error;
};


const sendEmailError = (message = 'Error when send email') => {
  internalServerError(message, 'SEND:EMAIL_ERROR');
}

const schemaValidationError = (message = 'Data validation Error') => {
  badRequestError(message);
}

module.exports = {
	conflictError,
	notFoundError,
	notAuthorizedError,
	forbiddenError,
	internalServerError,
	sendEmailError,
	schemaValidationError,
};