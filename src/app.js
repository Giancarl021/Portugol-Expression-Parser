const express =require('express');
const cors = require('cors');
const locate = require('@giancarl021/locate');

const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);
app.use('/', express.static(locate('src/web')));

module.exports = app;