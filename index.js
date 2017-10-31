const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require("method-override")(function (req) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method;
        delete req.body._method;
        return method;
    }
}));
app.use(require('./server/routes/notesRoutes.js'));
app.use(express.static(__dirname + '/public'));

const hostname = '127.0.0.1';
const port = 5000;
app.listen(port, hostname, () => { console.log(`Server running at http://${hostname}:${port}/`); });