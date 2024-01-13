const joi = require('joi');
const imageSchema = require('../img.schema');
const joiMsg = require('../joi.messages');

const editAvatarSchema = joi.object({
	avatar: imageSchema.required(),
});

module.exports = editAvatarSchema;
