class SimonButton {

    constructor(elementId, tone, musicPointer, gamePointer) {
        this.elementId = elementId;
        this.tone = tone;
        this.musicPointer = musicPointer;
        this.element = document.getElementById(this.elementId);
        this.gamePointer = gamePointer;
    }

    blink() {
        this.playTone();

        this.element.classList.add("blink");

        setTimeout(() => {
            this.removeBlink();
          }, this.gamePointer.delay / 2);
    }

    removeBlink(){
        this.element.classList.remove("blink");
    }

    playTone() {
        this.musicPointer.play(this.tone);
    }

    onPress() {
        blink();

        gamePointer.guessesRemaining--;
        gamePointer.chosen += this.id;

        if(gamePointer.chosen == gamePointer.target){
            // then the User has successfully completed the sequence
            // and move on to the next level
        } else if (gamePointer.guessesRemaining == 0){
            // then the User has lost the game
        }
    }
}
