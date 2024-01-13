const config = require('./utils/config');
const express = require('express');
const router = require('./routes/index.routes');
const errorController = require('./controllers/error/index.controller');
const fileUpload = require('express-fileupload');

const app = express();

app.use(express.json());
app.use(express.static(config.UPLOADS_DIR));
app.use(fileUpload());
app.use(router);
app.use(errorController);

app.listen(config.PORT, () => {
	console.log(`Server running on port ${config.PORT}`);
});
