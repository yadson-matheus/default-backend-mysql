const express = require('express');

const routes = express.Router();

const UserController = require('./controllers/UserController');

routes.get('/user', UserController.index);
routes.post('/user', UserController.add);
routes.put('/user/:id', UserController.edit);

module.exports = routes;
