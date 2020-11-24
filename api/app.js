const express = require('express');
const accountsController = require('./controllers/accountsController');
const authController = require('./controllers/authController');
const integersController = require('./controllers/integersController');
const bodyParser = require('body-parser');
const HttpStatus = require('http-status-codes');
const authorize = require('./services/authService').authorizeRequest;
const AccountsStore = require('./store/accountsStore');
const IntegersStore = require('./store/integersStore');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

async function init () {
  console.log('Initializing stores...');
  AccountsStore.init();
  IntegersStore.init();

  console.log('Starting app...');
  app.use(bodyParser.json());

  const router = express.Router();
  router.post('/auth', authController.login);

  router.post('/accounts', authorize, accountsController.post);
  router.get('/accounts', authorize, accountsController.get);

  router.get('/integers/current', authorize, integersController.get);
  router.put('/integers/current', authorize, integersController.put);
  router.post('/integers/next', authorize, integersController.post);

  app.use('/v1', router);

  app.use((err, req, res, next) => {
    if (err) {
      console.log(err);
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
