class View {
	constructor(app) {
		this.app = app;
	}

	renderInput() {
		const $answers = document.getElementsByClassName('answer-input');
		const name = $answers[$answers.length - 1].getAttribute('name');
		const number = Number(name.substr(6)) + 1;
		const $label = document.createElement('label');
		const $answer = document.createElement('input');

		$answer.setAttribute('type', 'text');
		$answer.setAttribute('name', `answer${number}`);
		$answer.className = 'answer-input';

		$label.appendChild($answer);
		$label.insertAdjacentHTML('afterbegin', `Antwoord ${number}`);

		this.app.$.answersContainer.appendChild($label);
	}
}

module.exports = View;