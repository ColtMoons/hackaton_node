const productRouter = require('express').Router();

productRouter.get('/', (request, response) => {
  response.send('from product');
});

module.exports = productRouter;