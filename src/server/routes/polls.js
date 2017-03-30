'use strict';

const express = require('express');
const router = express.Router();
const uuid = require('uuid');

const wss = require('../app');

if (typeof localStorage === "undefined" || localStorage === null) {
	var LocalStorage = require('node-localstorage').LocalStorage;
	var localStorage = new LocalStorage('./storage');
}

let activePolls = JSON.parse(localStorage.getItem('polls')) || [];
let sockets = [];
const polls = {
	get() {
		activePolls = JSON.parse(localStorage.getItem('polls')) || [];
	},
	insert(poll) {
		activePolls.push(poll);
		localStorage.setItem('polls', JSON.stringify(activePolls));
	},
	update(poll) {
		activePolls.map(single => single.id === poll.id ? poll : single);
		localStorage.setItem('polls', JSON.stringify(activePolls));
	}
};


router.get('/', (req, res) => {
	res.render("index", {
		polls: activePolls
	});
});

router.post('/create', (req, res) => {
	const poll = {};

	poll.id = uuid.v1();
	poll.question = req.body.question;
	poll.answers = [];
	poll.votes = 0;

	for (const param in req.body) {
		if (param.includes('answer') && req.body[param].length > 0) {
			poll.answers.push({
				name: req.body[param],
				votes: 0
			});
		}
	}

	polls.insert(poll);
	res.redirect(`/polls/get/${poll.id}`);
});

router.get('/get/:id/', (req, res) => {
	polls.get();
	const poll = activePolls.find(single => single.id === req.params.id);

	res.render('poll', {
		poll: poll
	});
});

router.get('/results/:id/', (req, res) => {
	polls.get();
	const poll = activePolls.find(single => single.id === req.params.id);

	res.render('results', {
		poll: poll
	});
});

router.post('/vote', (req, res) => {
	polls.get();
	const poll = activePolls.find(poll => poll.id === req.body.id);
	poll.answers.map(answer => {
		if (answer.name === req.body.answer) {
			answer.votes++;
			poll.votes++;
		}
	});
	polls.update(poll);
	sockets.map(socket => {
		socket.send(JSON.stringify(poll));
	});
	res.redirect(`/polls/results/${poll.id}`);
});

wss.on('connection', socket => {
	console.log('Client connected');
	sockets.push(socket);

	socket.on('close', () => {
		console.log('Client disconnected');
		sockets = sockets.filter(single => {
			return single !== socket;
		});
	});
});

module.exports = router;