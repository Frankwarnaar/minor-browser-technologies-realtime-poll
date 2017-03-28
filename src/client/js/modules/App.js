class App {
	constructor() {
		const Controller = require('./Controller');
		const View = require('./View');

		this.controller = new Controller(this);
		this.view = new View(this);

		this.$ = {
			answersContainer: document.getElementById('inputs'),
			newAnswer: document.getElementById('newInput'),
			pollQuestion: this.getElementsByAttribute('data-poll-id')
		};

		this.init();
	}

	//   Source: http://stackoverflow.com/questions/9496427/get-elements-by-attribute-when-queryselectorall-is-not-available-without-using-l#answer-15342661
	getElementsByAttribute(attribute, context) {
		const nodeList = (context || document).getElementsByTagName('*');
		const nodeArray = [];

		let node = null;
		let iterator = 0;

		while (node = nodeList[iterator++]) {
			if (node.hasAttribute(attribute)) nodeArray.push(node);
		}

		return nodeArray;
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

		}
	}
}

module.exports = App;