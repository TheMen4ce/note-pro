const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Configures body-parser module so the app can acutally parse the request params to json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Used to support PUT/DELETE with express (see: https://github.com/expressjs/method-override)
app.use(require("method-override")((req) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

// Add all the routes that the app supports
app.use(require('./server/routes/notesRoutes.js'));

// Serve public directory. This directory contains the website and it's code that run ONLY on the client
app.use(express.static(__dirname + '/public'));

// Set the port on which the app/server will run. Use process.env.PORT in case the app runs on a hosted environment (i.e. HEROKU)
const port = process.env.PORT || 4000;
app.listen(port, () => { console.log(`Server running at http://localhost:${port}/`); });