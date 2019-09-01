class Game {
	constructor(highscore){
		this.highscore = Math.max(0, highscore);
		this.delay = 800;
		this.sequenceLength = 3; // how 
		this.level = 1;
		this.guessesRemaining = sequenceLength;
		this.target = "";
		this.index = [];
		this.stage = 1;
		this.blinkTimeout = 1500;
		this.i = 0;
		this.chosen = "";
	}	



}