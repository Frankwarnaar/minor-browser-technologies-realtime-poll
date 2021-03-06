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
		$answer.setAttribute('placeholder', 'antwoord');
		$answer.className = 'answer-input';

		$label.appendChild($answer);
		$label.insertAdjacentHTML('afterbegin', `Antwoord ${number}`);

		this.app.$.answersContainer.appendChild($label);
	}

	renderResults(poll) {
		const $poll = this.app.utils.getElementsByAttribute('data-poll-id')[0];
		const $meters = this.app.utils.getElementsByAttribute('data-meter');
		const $meterFills = this.app.utils.arrayFrom(document.getElementsByClassName('meter__fill'));
		const $totalVotes = this.app.utils.getElementsByAttribute('data-poll-votes');
		const $votes = this.app.utils.getElementsByAttribute('data-votes');

		if ($poll) {
			$totalVotes[0].innerHTML = poll.votes;

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
							$vote.innerHTML = `${answer.votes} stemmen <span>(${(answer.votes / poll.votes * 100).toFixed()}%)</span>`;
						}
					});
				});
			}
		}

	}
}

module.exports = View;