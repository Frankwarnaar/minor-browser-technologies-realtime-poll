class App {
	constructor() {
		const Controller = require('./Controller');
		const View = require('./View');
		const Utils = require('./Utils');

		this.controller = new Controller(this);
		this.view = new View(this);
		this.utils = new Utils();

		this.$ = {
			answersContainer: document.getElementById('inputs'),
			newAnswer: document.getElementById('newInput'),
			pollQuestion: this.utils.getElementsByAttribute('data-poll-id')
		};

		this.init();
	}

	init() {
		this.controller.init();
		if(this.$.pollQuestion.length > 0) {
			this.socket();
		}
	}

	socket() {
		try {
			const socket = io();
			socket.on('poll', poll => {
				this.view.renderResults(poll);
			});
		}
		catch (e) {
			setTimeout(() => {
				location.reload();
			}, 10000);
		}
	}
}

module.exports = App;