class Controller {
	constructor(app) {
		this.app = app;
	}

	init() {
		this.bindEvents();
		if (this.app.$.newAnswer) {
			this.app.$.newAnswer.className = "";
		}
	}

	bindEvents() {
		if (this.app.$.newAnswer) {
			this.app.$.newAnswer.addEventListener('click', (e) => {
				e.preventDefault();
				this.app.view.renderInput();
			});
		}
	}
}

module.exports = Controller;