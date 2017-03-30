'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const WebSocketServer = require('ws').Server;

const app = express();
const server = http.createServer(app);
const wss = module.exports = new WebSocketServer({server: server});

const port = 1337;
const baseDir = 'build/client';

const pollsRouter = require('./routes/polls');

app.engine('ejs', require('express-ejs-extend'));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(express.static(baseDir));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/polls', pollsRouter);

app.listen(port, () => {
	console.log(`Server running on localhost:${port}`);
});

server.listen(8000);
app.get('/', (req, res) => {
	res.redirect('/polls');
});