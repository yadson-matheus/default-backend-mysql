const express = require('express');
const cors = require('cors');

const app = express();

const routes = require('./routes');
const {host, port, path} = require('../config/config');

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(path, routes);

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}${path}`);
});
