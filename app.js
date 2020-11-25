const express = require('express');
const accountsController = require('./controllers/accountsController');
const authController = require('./controllers/authController');
const integersController = require('./controllers/integersController');
const bodyParser = require('body-parser');
const authorize = require('./services/authService').authorizeRequest;
const AccountsStore = require('./store/accountsStore');
const IntegersStore = require('./store/integersStore');
const globalErrorHandler = require('./errors/globalErrorHandler');
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

  router.post('/accounts', accountsController.post);
  router.get('/accounts', authorize, accountsController.get);

  router.get('/current', authorize, integersController.get);
  router.put('/current', authorize, integersController.put);
  router.post('/next', authorize, integersController.post);

  app.use('/v1', router);

  app.use(globalErrorHandler);
  app.listen(PORT, () => console.log(`App started. Listening on: http://localhost:${PORT}`));
}

init();
