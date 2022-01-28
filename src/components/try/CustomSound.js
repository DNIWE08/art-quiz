export class CustomPlayer {
  constructor(correctAudio, incorrectAudio, endSound, volume) {
    this.audio = new Audio();
    this.correctSrcAudio = correctAudio;
    this.incorrectSrcAudio = incorrectAudio;
    this.endSound = endSound;
    this.volume = volume;
    this.audio.volume = this.volume;
  }

  correct(){
    this.audio.src = this.correctSrcAudio;
    this.audio.play()
  }

  incorrect(){
    this.audio.src = this.incorrectSrcAudio;
    this.audio.play()
  }
  gameEnd(){
    this.audio.src = this.endSound;
    this.audio.play()
  }
}