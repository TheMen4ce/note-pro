const serve = require('serve');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
/**
 * CLIENT
 */
serve('client/', {
    port: 3000
});

/**
 * SERVER
 */
let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-Type, Accept");
    next();
};

app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require("method-override")(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method;
        delete req.body._method;
        return method;
    }
}));
app.use(require('./server/routes/notesRoutes.js'));

const hostname = '127.0.0.1';
const port = 5000;
app.listen(port, hostname, () => { console.log(`Server running at http://${hostname}:${port}/`); });