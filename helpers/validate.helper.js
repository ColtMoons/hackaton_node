const { schemaValidationError } = require('./errors.helper');

const main = async (schema, body) => {
	try {
    await schema.validateAsync(body);
	} catch (error) {
    console.error(error);
    schemaValidationError(error.details[0]?.message);
  }
};

module.exports = main;