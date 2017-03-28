'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();
const port = 1337;
const baseDir = 'build/client';

const pollsRouter = require('./routes/polls');

app.engine('ejs', require('express-ejs-extend'));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(express.static(baseDir));
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
	res.io = io;
	next();
});

const server = app.listen(port, (err) => {
	err ? console.error(err) : console.log(`app running on http://localhost:${port}`);
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {
	console.log(`Client ${socket.id} connected`);

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});

app.use('/polls', pollsRouter);

app.get('/', (req, res) => {
	res.render("index");
});