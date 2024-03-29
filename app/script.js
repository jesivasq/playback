


// array of buttons that can be pushed
var options = ["btn1", "btn2", "btn3", "btn4"];
// the colors of the four buttons, as of playback15
var colors = ["#f50057", "#00e5ff", "#76ff03", "#ffea00"];
var highscore = 0;

var container = document.getElementById("container"); // the main backdrop for all our shenanigans
var main = document.getElementById("main");

var numConfetti = 200; // number of confetti to fall
var makeMoreConfetti = true;

var numBubbles = 50;
var makeMoreBubbles = true;

var particleCount = 200;
var particles = [];
var particleDivs = [];
var keepMovingParticles = true;
var particlesStopped = false;

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

/****************************************
	C L A S S E S
*****************************************/
class Music {
	constructor() {
		// 
		this.ac = new AudioContext();
		this.btnTempo = 120;
		this.twinkleTempo = 240;
		this.ary = [];

		this.btn1 = new TinyMusic.Sequence(this.ac, this.btnTempo, [
				'C4 e'
			]);
		this.ary.push(this.btn1);

		this.btn2 = new TinyMusic.Sequence(this.ac, this.btnTempo, [
				'E4 e'
			]);
		this.ary.push(this.btn2);

		this.btn3 = new TinyMusic.Sequence(this.ac, this.btnTempo, [
				'G4 e'
			]);
		this.ary.push(this.btn3);

		this.btn4 = new TinyMusic.Sequence(this.ac, this.btnTempo, [
				'C5 e'
			]);
		this.ary.push(this.btn4);

		this.success = new TinyMusic.Sequence(this.ac, this.twinkleTempo, [
				'C5 e',
				'E5 e',
				'G5 e',
				'C6 e'
			]);
		this.ary.push(this.success);

		this.fail = new TinyMusic.Sequence(this.ac, this.twinkleTempo, [
				'C4 e',
				'G3 e',
				'E3 e',
				'C3 q'
			]);
		this.ary.push(this.fail);

		this.twinkleLead = new TinyMusic.Sequence(this.ac, this.twinkleTempo, [
				'C3 q',
				'C3 q',
				'G3 q',
				'G3 q',
				'A3 q',
				'A3 q',
				'G3 h',
				'F3 q',
				'F3 q',
				'E3 q',
				'E3 q',
				'D3 q',
				'D3 q',
				'C3 h',

				'G3 q',
				'G3 q',
				'F3 q',
				'F3 q',
				'E3 q',
				'E3 q',
				'D3 h',

				'G3 q',
				'G3 q',
				'F3 q',
				'F3 q',
				'E3 q',
				'E3 q',
				'D3 h',

				'C3 q',
				'C3 q',
				'G3 q',
				'G3 q',
				'A3 q',
				'A3 q',
				'G3 h',
				'F3 q',
				'F3 q',
				'E3 q',
				'E3 q',
				'D3 q',
				'D3 q',
				'C3 h'

			]);
		this.ary.push(this.twinkleLead);

		this.twinkleBass = new TinyMusic.Sequence(this.ac, 240, [
				'C2 w',
				'F2 h',
				'C2 h',
				'F2 h',
				'C2 h',
				'G2 h',
				'C2 h',

				'C2 h',
				'F2 h',
				'C2 h',
				'G2 h',

				'C2 h',
				'F2 h',
				'C2 h',
				'G2 h',

				'C2 w',
				'F2 h',
				'C2 h',
				'F2 h',
				'C2 h',
				'G2 h',
				'C2 h'
				
			]);
		this.ary.push(this.twinkleBass);

		for( var i = 0; i < this.ary.length; i++){
			this.ary[i].loop = false;
			this.ary[i].gain.gain.value = 0.2;
			this.ary[i].staccato = 0.05;
		}
		this.twinkleBass.gain.gain.value -= 0.1;
		this.twinkleLead.smoothing = 0.4;

	}

	play(sequence){
		switch(sequence) {
			case "btn1":
				this.btn1.play();
				break;
			case "btn2":
				this.btn2.play();
				break;
			case "btn3":
				this.btn3.play();
				break;
			case "btn4":
				this.btn4.play();
				break;
			case "twinkle":
				this.twinkleLead.play();
				this.twinkleBass.play();
				break;
			case "chord":
				this.btn1.play();
				this.btn2.play();
				this.btn3.play();
				this.btn4.play();
				break;
			case "success":
				this.success.play();
				break;
			case "fail":
				this.fail.play();
				break;
			default:
				console.log("no song");
		} 
	}


	stopAll(){
		for( var i = 0; i < this.ary.length; i++){
			this.ary[i].stop();
		}
	}


}

var m = new Music();




class Confetto{

	constructor(x,y){
		//this.d = 10 * Math.random() + 15; // length, width
		this.d = 45;
		this.x = x;
		this.y = y;
		if(x <= 10){
			this.vx = Math.random() * 15; // velocity x
		} else {
			this.vx = Math.random() * -15;
		}
		
		this.vy = Math.random() * -30 - 30; // velocity y
		this.g = 1; // gravity

		this.diva = document.createElement("div");
		//this.diva.classList.add("confetto");
		this.diva.classList.add("svgStar");
		this.diva.style.left = this.x + "px";
		this.diva.style.top = this.y + "px";
		this.diva.style.width = this.d + "px";
		this.diva.style.height = this.d + "px";
		this.diva.style.animation = "rotate 3s infinite, fadeOut 1s forwards 1s";
		
		//this.diva.style.background = colors[Math.floor(Math.random()*4)];
		//container.appendChild(this.diva);
		this.diva.style.background = "url('star.svg')";
		
	}
	

	move(){
		if(this.y < window.innerHeight + 10){
			this.vy += this.g;
			this.x += this.vx;
			this.y += this.vy;
		}
	}

	display(){
		this.diva.style.left = this.x + "px";
		this.diva.style.top = this.y + "px";
	}
}

/*--------------------------------------*/

class ConfettiSystem{
	constructor(parent){
		this.confettiArray = [];
		this.stopConfetti = false;
		this.numConfetti = 200;

		for(var i = 0; i < this.numConfetti/2; i++){
			
			var y = window.innerHeight;
			
			// left side
			var x = 0;
			var c = new Confetto(x,y);
			this.confettiArray.push(c);
			parent.appendChild(c.diva);
			
			// right side
			x = window.innerWidth;
			c = new Confetto(x,y);
			this.confettiArray.push(c);
			parent.appendChild(c.diva);
		}
	}

	moveDivs(){
		for(var i = 0; i < this.numConfetti; i++){
			this.confettiArray[i].move();
			this.confettiArray[i].display();	
		}
		if(!this.stopConfetti){
			//window.requestAnimationFrame(function(){this.moveDivs();});
			window.requestAnimationFrame(() => {this.moveDivs();});
			//console.log("moveIt");
		}
	}

	removeDivs(){
		this.stopConfetti = true;
		for(var i = 0 ; i < this.confettiArray.length; i++){
			this.confettiArray[i].diva.parentNode.removeChild(this.confettiArray[i].diva);
		}
	}
}

/*--------------------------------------*/
class Star{
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.r = Math.random()*10 + 1; // radius
		this.t = Math.random()*10 + 1; // time to delay fade in

		this.diva = document.createElement("div");
		this.diva.classList.add("star");
		this.diva.style.left = this.x + "px";
		this.diva.style.top = this.y + "px";
		this.diva.style.width = this.r + "px";
		this.diva.style.height = this.r + "px";
	}

}

class StarSystem{
	constructor(parent){
		this.numStars = 100;
		this.starArray = [];

		const twinkle = (e) => {
			e.target.style.animation = "twinkle " + (Math.random()*10 + 5) + "s infinite";
		}

		for(var i = 0 ; i < this.numStars; i++){
			var x = Math.random()*window.innerWidth;
			var y = Math.random()*window.innerHeight;
			var s = new Star(x,y);
			this.starArray.push(s);
			s.diva.style.animation = "fadeIn 2s ease-in " + s.t + "s backwards";
			parent.appendChild(s.diva);
			s.diva.addEventListener("animationend", twinkle);
		}

	}

	// https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Tips
	fadeOut(){
		const removeDiv = (e) => {
			e.target.parentNode.removeChild(e.target);
		}
		const setFade = (e) => {
			e.target.style.animation = "fadeOut 2s forwards";
			e.target.addEventListener("animationend", removeDiv);
		}

		for(var i = 0; i < this.starArray.length; i++){
			this.starArray[i].diva.addEventListener("animationiteration", setFade);
		}
	}

}

/*--------------------------------------*/



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

	//setLevelText();
	animateConfettiStop();
	stopMakingBubbles();
	stopParticles();
	if(typeof(ss) != "undefined"){
		ss.fadeOut();
	}
}

// function setLevelText(){
// 	lvl = document.getElementById("level");
// 	lvl.innerHTML = "Level " + level;
// }

function startGame(){
	console.log("start");
	// hide the title screen
	document.getElementById("setup").style.display = "none";

	// hide the play again screen
	document.getElementById("playAgain").style.display = "none";
	
	// then set display on stage1 to block and ease it in
	//document.getElementById("level-holder").style.animation = "levelHolder 2s ease-out 0.5s both";
	//document.getElementById("level-holder").style.display = "block";

	document.getElementById("main").style.animation = "upFromBelow 3s ease-out both";
	document.getElementById("main").style.display = "block";
	setTimeout(function(){m.play("success");}, 3000);
	
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

	//playTone(options[index[i]]);
	m.play(options[index[i]]);

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
	//playTone(e.id);
	m.play(e.id);

	guesses--;
	chosen += e.id;

	// if the user correctly clicks the chosen 
	//   buttons, they win the round
	if (chosen == target){
		console.log('match');
		var ti = setTimeout(success, 1000);

	} else if (guesses == 0){
		var ti = setTimeout(fail, 1000);
	}

}

function removeBlink(element){
	element.classList.remove("blink");
}

// if the user successfully guesses the sequence
function success(){
	// indicate that the user succeeded
	//playTone("chord");
	m.play("chord");
	for( var k = 0; k< options.length; k++){
		blinker = document.getElementById(options[k]);
		blinker.classList.add("blink");
		setTimeout(removeBlink, 250, blinker);
	}
	// confetti cannon
	var cs = new ConfettiSystem(container);
	window.requestAnimationFrame(() => {cs.moveDivs();});
	setTimeout(() => {cs.removeDivs();}, 3000);


	// trigger the next level
	var playAgain = setTimeout(replay, 1500);	
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
	if( level == 20 ){
		winGame();
	} else if( level % 4 == 0 ){ 
		count++;
		//playTone("increase");
		m.play("success");
		delay *= 0.8;
		stage++;
		
		setStage();
		console.log(stage);


		blinkTimeout = 3000; // we need extra time to set up the next stage
		startNext();
	} else {
		blinkTimeout = 1500;
		startNext();
	}

}

function startNext(){
	guesses = count;
	chosen = "";
	target = "";
	index = [];
	i = 0;
	
	//setLevelText();
	
	chooseButtons();
	var t = setTimeout(blink, blinkTimeout);
}

function fail(){
	console.log('fail');

	m.play("fail");
	document.getElementById("main").style.animation = "fail .5s linear forwards";

	document.getElementById("playAgain").style.display = "block";
	document.getElementById("playAgain").style.animation = "upFromBelow 3s ease-out 1s both";

	if(stage == 5 ){
		ss.fadeOut();
	}
	stopMakingBubbles();

}


function setStage(){
	container.className = "stage" + stage;
	if(stage == 1){
		document.getElementById("btn1").className ="button btn1";
		document.getElementById("btn2").className ="button btn2";
		document.getElementById("btn3").className ="button btn3";
		document.getElementById("btn4").className ="button btn4";
		
	} else if(stage==2){ // start rotating
		// makeMoreConfetti = true;
		// startConfetti();
		//container.style.background = "#CFD8DC";
		document.getElementById("main").style.animation = "rotate 15s ease-in-out infinite alternate";
	} else if(stage==3){ // blue and green
		//animateConfettiStop();
		makeMoreBubbles = true;
		startBubbles();

		document.getElementById("btn1").className ="button btn2";
		document.getElementById("btn2").className ="button btn3";
		document.getElementById("btn3").className ="button btn3";
		document.getElementById("btn4").className ="button btn2";
		//container.style.background = "#80deea";
	} else if(stage==4){ // all yellow
		stopMakingBubbles();
		startParticles();
		document.getElementById("btn1").className ="button btn4";
		document.getElementById("btn2").className ="button btn4";
		document.getElementById("btn3").className ="button btn4";
		document.getElementById("btn4").className ="button btn4";
		//container.style.background = "#ffcc80";
	} else if(stage==5){ // invisible
		stopParticles();
		//container.style.background = "#101f27";
		ss = new StarSystem(container);
		document.getElementById("btn1").className ="button btn5";
		document.getElementById("btn2").className ="button btn5";
		document.getElementById("btn3").className ="button btn5";
		document.getElementById("btn4").className ="button btn5";
	} else if(stage=="win"){ // winner
		ss.fadeOut();
		//container.style.background = "#ffcc80";
		// do something fancy
	}
}

function winGame(){
	// do something Awesome!
	console.log("winner!");

	//setLevelText();
	
	highscore = 20;
	document.getElementById("highscore").innerHTML = highscore;

	//playTone("daffodil");
	m.play("twinkle");

	stage = "win";
	setStage();

	main.style.display = "none";
	//startParticles();
	makeMoreConfetti = true;
	startConfetti();
}

// -------------Confetti-------------------
function startConfetti(){
	for(var i = 0; i < numConfetti ; i++){
		makeConfettiDiv();
	}
}

function makeConfettiDiv(){
	x = Math.random()*window.innerWidth;
	y = Math.random()*-50;
	c = colors[Math.floor(colors.length * Math.random())];

	diva = document.createElement("div");
	diva.classList.add("confetti");
	diva.style.left = x + "px";
	diva.style.top = y + "vh";
	diva.style.background = c;
	container.appendChild(diva);
	diva.addEventListener("animationend", animationConfettiEnded);
	animateConfetti(diva);
}

function animateConfetti(element){
	var t = Math.random()*10 + 1;
	element.style.animation = "slideDown " + t + "1s linear";
}

function animationConfettiEnded(){
	//console.log(event);
	container.removeChild(event.target);
	if(makeMoreConfetti){
		makeConfettiDiv();
	}
}

function animateConfettiStop(){
	makeMoreConfetti = false;
}
// ----------------------------------------------
//            Bubbles

function startBubbles(){
	for(i=0; i<50; i++){
		makeBubble();
	}
}

function makeBubble(){
	x = Math.random()*window.innerWidth;
	y = Math.random()*100;

	outer = document.createElement("div");
	outer.classList.add("outer");
	outer.style.left = x + "px";
	outer.style.top = (y + 100) + "vh";

	inner = document.createElement("div");
	inner.classList.add("inner");

	diva = document.createElement("div");
	diva.classList.add("bubble");

	inner.appendChild(diva);
	outer.appendChild(inner);
	container.appendChild(outer);

	outer.addEventListener("animationend", endAnimateBubble);
	animateBubble(outer);
}

function animateBubble(element){
	var t = Math.random()*20 + 10;
	element.style.animation = "raiseBubble " + t + "s ease-in forwards";
}

function endAnimateBubble(){
	//console.log(event.target);
	container.removeChild(event.target);
	if(makeMoreBubbles){
		makeBubble();
	}
}

function stopMakingBubbles(){
	makeMoreBubbles = false;
}

/***************************************************/
//  PARTICLES
function Particle(){
	this.radius = 2 + Math.random()*8;
	this.x = window.innerWidth/2;
	this.y = window.innerHeight/2;
	this.color = colors[Math.floor(Math.random()*colors.length)];

	// random initial velocities
	this.vx = Math.random() * 12 - 6;
	this.vy = Math.random() * 12 - 6;
}

function createParticles(){
	for( var i = 0; i < particleCount; i++ ){
		// create particle
		var particle = new Particle();
		particles.push(particle);

		// create particle holder
		diva = document.createElement("div");
		diva.classList.add("particle");
		document.getElementById("container").appendChild(diva);
		particleDivs.push(diva);
	}

}


function moveParticles(timestamp){

	for( var i = 0; i < particleCount; i++){
		// check to see if they're off screen
		if(particles[i].y > window.innerHeight || particles[i].y < 0 || particles[i].x > window.innerWidth || particles[i].x < 0){
			// if they're offscreen but we're not stopped, reposition them to center
			if(!particlesStopped){
				particles[i].x = window.innerWidth/2;
				particles[i].y = window.innerHeight/2;
				particles[i].vy = Math.random() * 12 - 6;
			} else {
				// if they're offscreen and we're stopped, remove them
				document.getElementById("container").removeChild(particleDivs[i]);
				particleDivs.splice(i,1);
				particles.splice(i,1);
				particleCount--;
			}
		// if they're not offscreen, keep moving them
		} else {
			if(particlesStopped){
				//get'em offscreen faster
				particles[i].vx*=1.2;
				particles[i].vy*=1.2;
			}
			//particles[i].vy += gravity;
			particles[i].x += particles[i].vx;
			particles[i].y += particles[i].vy;
			
			particleDivs[i].style.left = particles[i].x + "px";
			particleDivs[i].style.top = particles[i].y + "px";
			particleDivs[i].style.background = particles[i].color;
			particleDivs[i].style.width = 2* particles[i].radius + "px";
			particleDivs[i].style.height = 2* particles[i].radius + "px";
		}
	}
	if(keepMovingParticles){
		window.requestAnimationFrame(moveParticles);
		console.log("moveParticles");
	}
	
}


// beginning state
function resetParticles(){
	//document.getElementById("container").innerHTML = "";
	particleCount = 500;
	particles = [];
	particleDivs = [];
	console.log("resetParticles");	
}

// call the functions to make and animate particles
function startParticles(){
	resetParticles();
	particlesStopped = false;
	keepMovingParticles = true;
	createParticles();
	window.requestAnimationFrame(moveParticles);
	console.log("start particles");
}

function stopParticles(){
	particlesStopped = true;
	setTimeout(function(){keepMovingParticles = false; console.log("stopped");}, 1500);
}