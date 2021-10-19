const express = require('express');

const routes = express.Router();

const controllers = {
    parse: require('./controllers/parse')
};

routes.post('/parse', controllers.parse);

module.exports = routes;