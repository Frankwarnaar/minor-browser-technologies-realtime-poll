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

	renderResults(poll) {
		const $poll = this.app.getElementsByAttribute('data-poll-id')[0];
		const $meters = this.app.getElementsByAttribute('data-meter');
		const $meterFills = Array.from(document.getElementsByClassName('meter__fill'));
		const $votes = this.app.getElementsByAttribute('data-votes');

		if ($poll) {
			const pollId = $poll.getAttribute('data-poll-id');
			if (pollId === poll.id) {

				poll.answers.forEach(answer => {
					$meters.forEach($meter => {
						if ($meter.getAttribute('data-answer') === answer.name) {
							$meter.setAttribute('value', answer.votes);
							$meter.setAttribute('max', poll.votes);
						}
					});

					$meterFills.forEach($fill => {
						$fill.style.width = `${answer.votes / poll.votes * 100}%`;
					});

					$votes.forEach($vote => {
						if ($vote.getAttribute('data-answer') === answer.name) {
							$vote.innerHTML = answer.votes;
						}
					});
				});
			}
		}

	}
}

module.exports = View;