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
}
