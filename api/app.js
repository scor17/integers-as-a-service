const express = require('express');
const accountsController = require('./controllers/accountsController');
const authController = require('./controllers/authController');
const integersController = require('./controllers/integersController');
const bodyParser = require('body-parser');
const HttpStatus = require('http-status-codes');
const app = express();

const PORT = 8080;

async function init () {
  console.log('Starting app...');
  app.use(bodyParser.json());

  const router = express.Router();
  router.post('/auth', authController.login);

  router.post('/accounts', accountsController.post);
  router.get('/accounts/:id', accountsController.get);

  router.get('/integers/current', integersController.get);
  router.put('/integers/current', integersController.put);
  router.post('/integers/next', integersController.post);

  app.use('/v1', router);

  app.use((err, req, res, next) => {
    if (err) {
      switch (err.status) {
        case HttpStatus.BAD_REQUEST:
          return res.status(err.status).json({ message: err.message, code: 'BAD_REQUEST' });
        default:
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error.', code: 'INTERNAL_SERVER_ERROR' });
      }
    }
  });
  app.listen(PORT, () => console.log(`App started. Listening on: http://localhost:${PORT}`));
}

init();
