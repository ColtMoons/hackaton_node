const joi = require('joi');
const joiMessage = require('./joi.messages');

const imageSchema = joi.object({
	name: joi.string().required().messages(joiMessage.errorMessage),
	mimetype: joi
		.string()
		.valid('image/png', 'image/jpeg')
		.required()
		.messages(joiMessage.errorMessage),
	size: joi.number().max(5000000).required().messages(joiMessage.errorMessage),
}).unknown(true);

module.exports = imageSchema;
