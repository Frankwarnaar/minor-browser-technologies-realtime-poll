'use strict';

const express = require('express');
const router = express.Router();
const uuid = require('uuid');

if (typeof localStorage === "undefined" || localStorage === null) {
	var LocalStorage = require('node-localstorage').LocalStorage;
	var localStorage = new LocalStorage('./storage');
}

let activePolls = JSON.parse(localStorage.getItem('polls')) || [];

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
	res.redirect(`/polls/results/${poll.id}`);

	req.io.sockets.emit('poll', poll);
});

module.exports = router;