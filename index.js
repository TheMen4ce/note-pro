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

const port = process.env.PORT || 4000;
app.listen(port, () => { console.log(`Server running at http://localhost:${port}/`); });