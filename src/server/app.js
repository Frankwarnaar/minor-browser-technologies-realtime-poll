'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 1337;
const baseDir = 'build/client';

const pollRouter = require('./routes/polls');

app.engine('ejs', require('express-ejs-extend'));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(express.static(baseDir));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/polls', pollRouter);

app.get('/', (req, res) => {
	res.render("index");
});

app.listen(port, (err) => {
	err ? console.error(err) : console.log(`app running on http://localhost:${port}`);
});