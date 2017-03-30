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
1. With javascript the user can add infinite answers to the poll

The only breaking dependency is `getElementsByClassName`. This works in every browser except IE < 8. When this doesn't work, you can still insert 5 answers.

2. The results are shown with meter elements, these fall back to div's with div's inside them when not supported

Meters are supported in every browser but IE. It's supported from IOS Safari 10.3, released march 27th, 2017.

3. The browser automaticly refreshes on the results page to keep the results up to date

The browser tries to run a socket in a try statement. When this fails, it sets a timeout of `10s`. After this, it makes the pages refresh.

4. If the browsers supports sockets, the results update without refreshing the page.

Websockets are supported by IE10 > 9. Opera Mini doesn't support it. When a vote comes in at the server the next code runs:
```js
router.post('/vote', (req, res) => {
  // update the polls on the server from the storage to make sure the latest results will be send back to the clients.
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
