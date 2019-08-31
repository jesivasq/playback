<<<<<<< HEAD
// array of buttons that can be pushed
var options = ["btn1", "btn2", "btn3", "btn4"];
// the colors of the four buttons, as of playback15
var colors = ["#f50057", "#00e5ff", "#76ff03", "#ffea00"];
var highscore = 0;
var container = document.getElementById("container"); // the main backdrop for all our shenanigans
var numConfetti = 200; // number of confetti to fall

var delay = 800; // ms: blink duration
var count = 3; // how many buttons to choose
var level = 1;
var guesses = count; // how many guesses remaining
var target = ""; // text IDs of the buttons we want the user to guess
var index = []; // the IDs in the order we want the user to guess them, as an array
var stage = 1; // when the stage increases, the challenge increases
var blinkTimeout = 1500; // how long to pause before calling blink to start a new round
var i = 0; // for function blink()
var chosen = ""; // for function clicky()


/* ***********************
     F U N C T I O N S
   *********************** */

function beginGame(){
	newGame();
	startGame();
}

function newGame(){
	delay = 800; // ms: blink duration
	count = 3; // how many buttons to choose
	level = 1;
	guesses = count; // how many guesses remaining
	target = ""; // text IDs of the buttons we want the user to guess
	index = []; // the IDs in the order we want the user to guess them, as an array
	stage = 1; // when the stage increases, the challenge increases
	blinkTimeout = 1500; // how long to pause before calling blink to start a new round
	i = 0; // for function blink()
	chosen = ""; // for function clicky()

	lvl = document.getElementById("level");
	lvl.innerHTML = "Level " + level;
}

function startGame(){
	console.log("start");
	// hide the title screen
	document.getElementById("setup").style.display = "none";

	// hide the play again screen
	document.getElementById("playAgain").style.display = "none";
	
	// then set display on stage1 to block and ease it in
	document.getElementById("level-holder").style.animation = "levelHolder 2s ease-out 0.5s both";
	document.getElementById("level-holder").style.display = "block";

	document.getElementById("main").style.animation = "upFromBelow 3s ease-out 1s both";
	document.getElementById("main").style.display = "block";
	
	
	// then start the game
	newGame();
	setStage();
	chooseButtons();
	var ti = setTimeout(blink, 5000);
}


// randomly pick a few buttons to push	
function chooseButtons(){
	for(var j = 0 ; j < count; j++){
		index[j] = Math.floor(Math.random()*options.length);
		target += options[index[j]];
	}
}


// https://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop
function blink() {

	playTone(options[index[i]]);

	var blinker = document.getElementById(options[index[i]]);
	blinker.classList.add("blink");

	i++;
	if( i < count){
		setTimeout(blink, delay);
	}
	setTimeout(removeBlink, delay/2, blinker);
	
}

// for the simon buttons
function clicky(e){
	// make that button's sound
	playTone(e.id);

	guesses--;
	chosen += e.id;

	// if the user correctly clicks the chosen 
	//   buttons, they win the round
	if (chosen == target){
		console.log('match');

		// indicate that the user succeeded
		playTone("chord");
		for( var k = 0; k< options.length; k++){
			blinker = document.getElementById(options[k]);
			blinker.classList.add("blink");
			setTimeout(removeBlink, 250, blinker);
		}
		
		// trigger the next level
		var playAgain = setTimeout(replay, 500);
	} else if (guesses == 0){
		var ti = setTimeout(fail, 500);
	}

}

function removeBlink(element){
	element.classList.remove("blink");
}


// replay the current sequence
function blinkAgain(){
	i = 0;
	blink();
}

// user progresses to the next level
function replay(){
	highscore = Math.max(highscore, level);
	document.getElementById("highscore").innerHTML = highscore;
	level++;
	if ( level % 4 == 0 ){ 
		count++;
		playTone("increase");
		delay *= 0.8;
		stage++;
		
		setStage();
		console.log(stage);


		blinkTimeout = 3000; // we need extra time to set up the next stage
	} else {
		blinkTimeout = 1500;
	}

	guesses = count;
	chosen = "";
	target = "";
	index = [];
	i = 0;
	
	lvl = document.getElementById("level");
	lvl.innerHTML = "Level " + level;
	
	chooseButtons();
	var t = setTimeout(blink, blinkTimeout);
}

// from miniMusic:
// https://github.com/xem/miniMusic
function playTone(id){
	if(id == "btn1"){
		with(new AudioContext)[22].map((v,i)=>{with(createOscillator())v&&start(e=[1][i]*.2,connect(destination),frequency.setValueAtTime(440*1.06**(12-v),0)),stop(e+.2)})
	} else if ( id == "btn2"){
		with(new AudioContext)[18].map((v,i)=>{with(createOscillator())v&&start(e=[1][i]*.2,connect(destination),frequency.setValueAtTime(440*1.06**(12-v),0)),stop(e+.2)})
	} else if(id == "btn3"){
		with(new AudioContext)[15].map((v,i)=>{with(createOscillator())v&&start(e=[1][i]*.2,connect(destination),frequency.setValueAtTime(440*1.06**(12-v),0)),stop(e+.2)})
	} else if(id == "btn4"){
		with(new AudioContext)[10].map((v,i)=>{with(createOscillator())v&&start(e=[1][i]*.2,connect(destination),frequency.setValueAtTime(440*1.06**(12-v),0)),stop(e+.2)})
	} else if(id == "increase"){
		with(new AudioContext)[15,17,18,20,22].map((v,i)=>{with(createOscillator())v&&start(e=[5,4,3,2,1][i]*.1,connect(destination),frequency.setValueAtTime(440*1.06**(12-v),0)),stop(e+.1)})
	} else if( id == "fail"){
		with(new AudioContext)[11,15,18,22].map((v,i)=>{with(createOscillator())v&&start(e=[1,2,4,5][i]*.1,connect(destination),frequency.setValueAtTime(440*1.06**(12-v),0)),stop(e+.1)})
	} else if( id == "chord"){
		with(new AudioContext)[10,15,18].map((v,i)=>{with(createOscillator())v&&start(e=[1,1,1][i]*.2,connect(destination),frequency.setValueAtTime(440*1.06**(12-v),0)),stop(e+.2)})
	} else if( id=="daffodil"){
		with(new AudioContext)[13,13,13,13,13,13,15,15,15,15,15,15,15,15,15,17,17,17,17,17,17,18,18,18,18,20,22,22,22,22,22,22,22].map((v,i)=>{with(createOscillator())v&&start(e=[7,9,10,19,21,22,1,6,11,13,18,23,25,27,28,12,24,29,31,33,34,2,4,30,35,36,14,15,16,37,38,39,40][i]*.2,connect(destination),frequency.setValueAtTime(440*1.06**(12-v),0)),stop(e+.2)});
	}
}


function fail(){
	console.log('fail');

	playTone("fail");
	document.getElementById("main").style.animation = "fail .5s linear forwards";

	document.getElementById("playAgain").style.display = "block";
	document.getElementById("playAgain").style.animation = "upFromBelow 3s ease-out 1s both";
}


function setStage(){
	if(stage == 1){
		document.getElementById("btn1").className ="button btn1";
		document.getElementById("btn2").className ="button btn2";
		document.getElementById("btn3").className ="button btn3";
		document.getElementById("btn4").className ="button btn4";
	} else if(stage==2){ // start rotating
		document.getElementById("main").style.animation = "rotate 15s ease-in-out infinite alternate";
	} else if(stage==3){ // blue and green
		document.getElementById("btn1").className ="button btn2";
		document.getElementById("btn2").className ="button btn3";
		document.getElementById("btn3").className ="button btn3";
		document.getElementById("btn4").className ="button btn2";
	} else if(stage==4){ // all yellow
		document.getElementById("btn1").className ="button btn4";
		document.getElementById("btn2").className ="button btn4";
		document.getElementById("btn3").className ="button btn4";
		document.getElementById("btn4").className ="button btn4";
	} else if(stage==5){ // mostly invisible
		document.getElementById("btn1").className ="button btn1";
		document.getElementById("btn2").className ="button btn5";
		document.getElementById("btn3").className ="button btn5";
		document.getElementById("btn4").className ="button btn5";
	} else if(stage==6){ // winner
		// do something fancy
	}
}
=======
// array of buttons that can be pushed
var options = ["btn1", "btn2", "btn3", "btn4"];
// the colors of the four buttons, as of playback15
var colors = ["#f50057", "#00e5ff", "#76ff03", "#ffea00"];
var highscore = 0;
var container = document.getElementById("container"); // the main backdrop for all our shenanigans
var numConfetti = 200; // number of confetti to fall

var delay = 800; // ms: blink duration
var count = 3; // how many buttons to choose
var level = 1;
var guesses = count; // how many guesses remaining
var target = ""; // text IDs of the buttons we want the user to guess
var index = []; // the IDs in the order we want the user to guess them, as an array
var stage = 1; // when the stage increases, the challenge increases
var blinkTimeout = 1500; // how long to pause before calling blink to start a new round
var i = 0; // for function blink()
var chosen = ""; // for function clicky()


/* ***********************
     F U N C T I O N S
   *********************** */

function beginGame(){
	newGame();
	startGame();
}

function newGame(){
	delay = 800; // ms: blink duration
	count = 3; // how many buttons to choose
	level = 1;
	guesses = count; // how many guesses remaining
	target = ""; // text IDs of the buttons we want the user to guess
	index = []; // the IDs in the order we want the user to guess them, as an array
	stage = 1; // when the stage increases, the challenge increases
	blinkTimeout = 1500; // how long to pause before calling blink to start a new round
	i = 0; // for function blink()
	chosen = ""; // for function clicky()

	lvl = document.getElementById("level");
	lvl.innerHTML = "Level " + level;
}

function startGame(){
	console.log("start");
	// hide the title screen
	document.getElementById("setup").style.display = "none";

	// hide the play again screen
	document.getElementById("playAgain").style.display = "none";
	
	// then set display on stage1 to block and ease it in
	document.getElementById("level-holder").style.animation = "levelHolder 2s ease-out 0.5s both";
	document.getElementById("level-holder").style.display = "block";

	document.getElementById("main").style.animation = "upFromBelow 3s ease-out 1s both";
	document.getElementById("main").style.display = "block";
	
	
	// then start the game
	newGame();
	setStage();
	chooseButtons();
	var ti = setTimeout(blink, 5000);
}


// randomly pick a few buttons to push	
function chooseButtons(){
	for(var j = 0 ; j < count; j++){
		index[j] = Math.floor(Math.random()*options.length);
		target += options[index[j]];
	}
}


// https://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop
function blink() {

	playTone(options[index[i]]);

	var blinker = document.getElementById(options[index[i]]);
	blinker.classList.add("blink");

	i++;
	if( i < count){
		setTimeout(blink, delay);
	}
	setTimeout(removeBlink, delay/2, blinker);
	
}

// for the simon buttons
function clicky(e){
	// make that button's sound
	playTone(e.id);

	guesses--;
	chosen += e.id;

	// if the user correctly clicks the chosen 
	//   buttons, they win the round
	if (chosen == target){
		console.log('match');

		// indicate that the user succeeded
		playTone("chord");
		for( var k = 0; k< options.length; k++){
			blinker = document.getElementById(options[k]);
			blinker.classList.add("blink");
			setTimeout(removeBlink, 250, blinker);
		}
		
		// trigger the next level
		var playAgain = setTimeout(replay, 500);
	} else if (guesses == 0){
		var ti = setTimeout(fail, 500);
	}

}

function removeBlink(element){
	element.classList.remove("blink");
}


// replay the current sequence
function blinkAgain(){
	i = 0;
	blink();
}

// user progresses to the next level
function replay(){
	highscore = Math.max(highscore, level);
	document.getElementById("highscore").innerHTML = highscore;
	level++;
	if ( level % 4 == 0 ){ 
		count++;
		playTone("increase");
		delay *= 0.8;
		stage++;
		
		setStage();
		console.log(stage);


		blinkTimeout = 3000; // we need extra time to set up the next stage
	} else {
		blinkTimeout = 1500;
	}

	guesses = count;
	chosen = "";
	target = "";
	index = [];
	i = 0;
	
	lvl = document.getElementById("level");
	lvl.innerHTML = "Level " + level;
	
	chooseButtons();
	var t = setTimeout(blink, blinkTimeout);
}

// from miniMusic:
// https://github.com/xem/miniMusic
function playTone(id){
	if(id == "btn1"){
		with(new AudioContext)[22].map((v,i)=>{with(createOscillator())v&&start(e=[1][i]*.2,connect(destination),frequency.setValueAtTime(440*1.06**(12-v),0)),stop(e+.2)})
	} else if ( id == "btn2"){
		with(new AudioContext)[18].map((v,i)=>{with(createOscillator())v&&start(e=[1][i]*.2,connect(destination),frequency.setValueAtTime(440*1.06**(12-v),0)),stop(e+.2)})
	} else if(id == "btn3"){
		with(new AudioContext)[15].map((v,i)=>{with(createOscillator())v&&start(e=[1][i]*.2,connect(destination),frequency.setValueAtTime(440*1.06**(12-v),0)),stop(e+.2)})
	} else if(id == "btn4"){
		with(new AudioContext)[10].map((v,i)=>{with(createOscillator())v&&start(e=[1][i]*.2,connect(destination),frequency.setValueAtTime(440*1.06**(12-v),0)),stop(e+.2)})
	} else if(id == "increase"){
		with(new AudioContext)[15,17,18,20,22].map((v,i)=>{with(createOscillator())v&&start(e=[5,4,3,2,1][i]*.1,connect(destination),frequency.setValueAtTime(440*1.06**(12-v),0)),stop(e+.1)})
	} else if( id == "fail"){
		with(new AudioContext)[11,15,18,22].map((v,i)=>{with(createOscillator())v&&start(e=[1,2,4,5][i]*.1,connect(destination),frequency.setValueAtTime(440*1.06**(12-v),0)),stop(e+.1)})
	} else if( id == "chord"){
		with(new AudioContext)[10,15,18].map((v,i)=>{with(createOscillator())v&&start(e=[1,1,1][i]*.2,connect(destination),frequency.setValueAtTime(440*1.06**(12-v),0)),stop(e+.2)})
	} else if( id=="daffodil"){
		with(new AudioContext)[13,13,13,13,13,13,15,15,15,15,15,15,15,15,15,17,17,17,17,17,17,18,18,18,18,20,22,22,22,22,22,22,22].map((v,i)=>{with(createOscillator())v&&start(e=[7,9,10,19,21,22,1,6,11,13,18,23,25,27,28,12,24,29,31,33,34,2,4,30,35,36,14,15,16,37,38,39,40][i]*.2,connect(destination),frequency.setValueAtTime(440*1.06**(12-v),0)),stop(e+.2)});
	}
}


function fail(){
	console.log('fail');

	playTone("fail");
	document.getElementById("main").style.animation = "fail .5s linear forwards";

	document.getElementById("playAgain").style.display = "block";
	document.getElementById("playAgain").style.animation = "upFromBelow 3s ease-out 1s both";
}


function setStage(){
	if(stage == 1){
		document.getElementById("btn1").className ="button btn1";
		document.getElementById("btn2").className ="button btn2";
		document.getElementById("btn3").className ="button btn3";
		document.getElementById("btn4").className ="button btn4";
	} else if(stage==2){ // start rotating
		document.getElementById("main").style.animation = "rotate 15s ease-in-out infinite alternate";
	} else if(stage==3){ // blue and green
		document.getElementById("btn1").className ="button btn2";
		document.getElementById("btn2").className ="button btn3";
		document.getElementById("btn3").className ="button btn3";
		document.getElementById("btn4").className ="button btn2";
	} else if(stage==4){ // all yellow
		document.getElementById("btn1").className ="button btn4";
		document.getElementById("btn2").className ="button btn4";
		document.getElementById("btn3").className ="button btn4";
		document.getElementById("btn4").className ="button btn4";
	} else if(stage==5){ // mostly invisible
		document.getElementById("btn1").className ="button btn1";
		document.getElementById("btn2").className ="button btn5";
		document.getElementById("btn3").className ="button btn5";
		document.getElementById("btn4").className ="button btn5";
	} else if(stage==6){ // winner
		// do something fancy
	}
}
>>>>>>> da594fc23ce7c9f8c4532430f41e2923aee4865c
