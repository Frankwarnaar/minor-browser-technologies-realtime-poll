class App {
	constructor() {
		const Controller = require('./Controller');
		const View = require('./View');

		this.controller = new Controller(this);
		this.view = new View(this);

		this.$ = {
			answersContainer: document.getElementById('inputs'),
			newAnswer: document.getElementById('newInput')
		};

		this.init();
	}

	init() {
		this.controller.init();
	}
}

module.exports = App;