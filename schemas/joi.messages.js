const errorMessage = {
	'any.required': 'El campo "{#key}" es requerido',
	'string.base': 'El valor de "{#key}" debe ser una cadena',
	'string.empty': 'El campo "{#key}" no debe estar vacio',
	'number.base': 'El valor de "{#key}" debe ser un numero',
	'number.max': 'El archivo no debe exceder los 5 MB',
	'object.base': 'El valor de "{#key}" debe ser un objeto',
	'any.only': 'Solo se permiten fotos jpeg o png',
	'string.email': 'Debe proporcionar un correo electronico valido para "{#key}"',
	'string.min': 'El campo "{#key}" debe tener al menos {#limit} caracteres',
	'string.max': 'El campo "{#key}" no debe exceder los {#limit} caracteres',
	'object.unknown': 'No se permiten campos adicionales ene este objeto',
};

const errorMessageUsername = {
	'string.pattern.base':
		'El campo "{#key}" no debe contener espacios en blanco.',
};

const errorMessagePassword = {
	'string.pattern.base':
		'La contraseña debe contener al menos una mayuscula, una minuscula, un numero y un simbolo de puntuacion para "{#key}"',
};

module.exports = { errorMessage, errorMessageUsername, errorMessagePassword };
