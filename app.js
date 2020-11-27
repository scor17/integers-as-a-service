const express = require('express');
const accountsController = require('./controllers/accountsController');
const authController = require('./controllers/authController');
const integersController = require('./controllers/integersController');
const bodyParser = require('body-parser');
const { verifyBearer } = require('./services/authService');
const AccountsStore = require('./store/accountsStore');
const IntegersStore = require('./store/integersStore');
const globalErrorHandler = require('./errors/globalErrorHandler');
const HttpStatus = require('http-status-codes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

async function authorize (req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const user = await verifyBearer(token);
    if (user) {
      req.user = user;
      return next();
    }
  }
  res.send(HttpStatus.UNAUTHORIZED, { errors: [{ message: 'Unauthorized.', code: 'UNAUTHORIZED' }] });
}

async function init () {
  console.log('Initializing stores...');
  AccountsStore.init();
  IntegersStore.init();

  console.log('Starting app...');
  app.use(bodyParser.json());

  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'content-type, authorization');
    next();
  });

  const router = express.Router();
  router.post('/auth', authController.login);

  router.post('/accounts', accountsController.post);
  router.get('/accounts', authorize, accountsController.get);

  router.get('/integers/current', authorize, integersController.get);
  router.put('/integers/current', authorize, integersController.put);
  router.post('/integers/next', authorize, integersController.post);

  app.use('/v1', router);

  app.use(globalErrorHandler);

  app.listen(PORT, () => console.log(`App started. Listening on: http://localhost:${PORT}`));
}

init();
