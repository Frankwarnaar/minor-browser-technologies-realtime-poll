class Controller {
	constructor(app) {
		this.app = app;
	}

	init() {
		this.bindEvents();
	}

	bindEvents() {
		const $inputs = Array.from(this.app.$.inputs);
		$inputs.forEach($input => {
			$input.addEventListener('keyup', (e) => {
				if (e.which === 9) {
					this.app.view.renderInput();
				}
			});
		});
	}
}

module.exports = Controller;