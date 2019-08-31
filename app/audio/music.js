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
