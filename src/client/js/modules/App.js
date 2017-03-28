class App {
	constructor() {
		const Controller = require('./Controller');

		this.controller = new Controller(this);

		this.$ = {
			inputs: document.getElementsByTagName('input')
		};

		this.init();
	}

	init() {
		this.controller.init();
	}
}

module.exports = App;