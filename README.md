# Realtime Poll
This repo contains a poll that shows the results realtime, built with the progressive enhanced principle. You can create a poll. Share the url of your poll with your friends. When they vote, you see the results updating automaticly.

## Installation
To run the project you have to run the next commands
```
$ npm install
$ npm run production
```

## Functionality
### Core
1. The user can create polls
2. The user can vote
3. The user can check the results of a poll

### Enhancements
NOTE: The clientside javascript shown below is transpiled to es5 before being sent to the client.

#### 1. With javascript the user can add infinite answers to the poll

When the user has javascript, he/she can add infinite answers to a new poll. The next method is called when a new input has to be rendered:
```js
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
```


#### 2. The results are shown with meter elements, these fall back to div's with div's inside them when not supported

Meters are supported in every browser but IE. It's supported from IOS Safari 10.3, released march 27th, 2017. This is the code for the meters, with fallback inside the meter elements:
```ejs
<meter data-meter data-answer="<%= answer.name %>" max="<%= poll.votes %>" value="<%= answer.votes %>">
	<div class="meter">
		<div class="meter__fill" data-answer="<%= answer.name %>" style="width: <%= answer.votes / poll.votes * 100 %>%"></div>
	</div>
</meter>
```


#### 3. The browser automaticly refreshes on the results page to keep the results up to date

The browser tries to run a socket in a try statement. When this fails, it sets a timeout of `10s`. After this, it makes the pages refresh. This happens with a try statement
```js
try {
	const socket = new WebSocket('ws://localhost:8000', 'echo-protocol');

	socket.onmessage = (e) => {
		this.view.renderResults(JSON.parse(e.data));
	};
}
catch (e) {
	setTimeout(() => {
		location.reload();
	}, 10000);
}
```

#### 4. If the browsers supports sockets, the results update without refreshing the page.

Websockets are supported by IE > 9. Opera Mini doesn't support it. When a vote comes in at the server the next code runs:
```js
router.post('/vote', (req, res) => {
  // update the polls on the server from the storage to make sure the latest results will be sent back to the clients.
	polls.get(); 
	const poll = activePolls.find(poll => poll.id === req.body.id);
	// +1 the votes count of the voted answer
  poll.answers.map(answer => {
		if (answer.name === req.body.answer) {
			answer.votes++;
			poll.votes++;
		}
	});
  // Update the storage with the updated poll.
	polls.update(poll);
  // Send the poll with the new votes count to the every active client.
	sockets.map(socket => {
		socket.send(JSON.stringify(poll));
	});
	res.redirect(`/polls/results/${poll.id}`);
});
```
The results are being updated with the data coming from the socket message.

## Accessability issues
### Images
No images are used within this project. So nothing breaks when the images aren't shown.

### Custom fonts
In this project I'm using the native fonts of the user. When this is not available, I'm using `sans-serif`. So the font should always be available.

### Colors
I checked the colors I used in this project with a [contrast checker](http://webaim.org/resources/contrastchecker/). The contrasts are good in this project. I only use these colors:
* White
* Black
* Bordeaux
I only use Bordeaux in contrast with white. This works well.

### Javascript
Without Javascript the user can still create polls, vote and watch the results. This functionality is all built with express (serverside). The user can only create options to vote on equal to the amount of initially created inputs. The results page doesn't reload.

### Cookies & localStorage
Cookies and localstorage are not used within this app. When disabled, nothing breaks.

### Mouse / trackpad
The app works fine when the user has to tab through it. Inputs are wrapped inside labels, to make them accessable.

### Slow internet
The app is built very clean. No custom fonts, images or libraries are required. The only files loaded are:
1. The page ~2kb
2. css (not necessary) ~ 4kb
3. js (not necessary) ~ 1kb
Because of the small transfer size, the page even loads on GPRS (50kb/s) in `2.35s`. When the css or javascript doesn't load, you can still use the poll.
