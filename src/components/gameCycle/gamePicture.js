import correctAudio from '../../assets/correct-answer.mp3';
import incorrectAudio from '../../assets/incorrect-answer.mp3';
import gameEnd from '../../assets/game-end.mp3';

import { BaseAnimatedComponent, BaseComponent } from "../default/BaseComponent";
import { PictureData } from "./data";
import { Storage } from "../default/Storage";
import { MainScreen } from "../mainScreen/MainScreen";
import { CustomPlayer } from "../try/CustomSound";

let textTimer = document.createElement('div');
textTimer.classList.add('timer');

let timerWrapper = document.createElement('div');
timerWrapper.classList.add('timer-wrapper');
timerWrapper.append(textTimer)

export class PictureGameField extends BaseAnimatedComponent{
  constructor(parentElement, categoryIndex){
    super(parentElement, 'div', ['picture-game-field', 'container']);
    this.categoryIndex = categoryIndex;
    this.questions = [];
    this.gameCycle();
  }

  gameCycle() {
    if(this.questions.length < 10) {
      let question = new PictureGameContainer(this.element, new PictureQuestionModel(this.questions.length + 1, this.categoryIndex));
      this.questions.push(question);
    }
  }
}

export class PictureGameContainer extends BaseAnimatedComponent {
  constructor(parentElement, model){
    super(parentElement, 'div', ['picture-game-container']);
    this.player = new CustomPlayer(correctAudio, incorrectAudio, gameEnd, model.currentVolumeValue);
    this.model = model;
    this.indicator = false;


    let authorsImageNum = this.getRundomNumber();
    let authorsImageNumIterator = authorsImageNum.values();
    const correct = authorsImageNumIterator.next().value;
    const incorrect1 = authorsImageNumIterator.next().value;
    const incorrect2 = authorsImageNumIterator.next().value;
    const incorrect3 = authorsImageNumIterator.next().value;



    console.log(correct);
    console.log(incorrect1);
    console.log(incorrect2);
    console.log(incorrect3);








    this.homeBtn = new BaseComponent(this.element, 'button', ['home-btn']);
    this.homeBtn.element.addEventListener('click', () => {
      this.animation.nextScreenAnimation(this.element.parentElement, new MainScreen(document.body))
    })

    if(model.checkboxValue){
      this.element.append(timerWrapper);
      textTimer.style.width = "338px";
      let timeMinut = model.checkboxTimeValue;
      this.timerId = setInterval(() => {    
          let minus = timeMinut;
          let elementWidth = Number.parseInt(getComputedStyle(textTimer).width);
          textTimer.style.width = `${Number.parseInt(getComputedStyle(textTimer).width) - (elementWidth / minus)}px`;
          --timeMinut;
          if (timeMinut <= 0) {
            textTimer.style.width = "0px";
            this.indicator = false;
            this.model.answer = false;
            this.cardsCycle()
            clearInterval(this.timerId);
          }
      }, 1000);
    }

    this.question = new BaseComponent(this.element, 'p', ['question'], `Какую картину написал "${model.currentQuestion[(model.categoryIndex - 1) * 10 + model.questionIndex - 1].author}" ?`);
    this.pictureAnswerContainer = new BaseComponent(this.element, 'div', ['picture-answer-container']);

    this.correctAnswer = new BaseComponent(this.pictureAnswerContainer.element, 'div', ['picture-answer']);
    this.incorrectAnswer1 = new BaseComponent(this.pictureAnswerContainer.element, 'div', ['picture-answer']);
    this.incorrectAnswer2 = new BaseComponent(this.pictureAnswerContainer.element, 'div', ['picture-answer']);
    this.incorrectAnswer3 = new BaseComponent(this.pictureAnswerContainer.element, 'div', ['picture-answer']);

    this.setBackgroundImage(correct, this.correctAnswer.element);
    this.setBackgroundImage(incorrect1, this.incorrectAnswer1.element);
    this.setBackgroundImage(incorrect2, this.incorrectAnswer2.element);
    this.setBackgroundImage(incorrect3, this.incorrectAnswer3.element);

    this.correctAnswer.element.style.order = Math.floor(Math.random() * 20);
    this.incorrectAnswer1.element.style.order = Math.floor(Math.random() * 20);
    this.incorrectAnswer2.element.style.order = Math.floor(Math.random() * 20);
    this.incorrectAnswer3.element.style.order = Math.floor(Math.random()* 20);

    this.correctAnswer.element.addEventListener('click',() => {
      clearTimeout(this.timerId);
      this.player.correct();
      this.correctAnswer.element.classList.add('correct');
      setTimeout(() => {
        this.indicator = true;
        model.answer = true;
        this.cardsCycle()
      }, 100)
    }, {once: true})

    this.incorrectAnswer1.element.addEventListener('click',() => {
      clearTimeout(this.timerId);
      this.player.incorrect();
      this.incorrectAnswer1.element.classList.add('incorrect');
      setTimeout(() => {
        this.indicator = false;
        model.answer = false;
        this.cardsCycle()
      }, 100)
    }, {once: true})

    this.incorrectAnswer2.element.addEventListener('click',() => {
      clearTimeout(this.timerId);
      this.player.incorrect();
      this.incorrectAnswer2.element.classList.add('incorrect');
      setTimeout(() => {
        this.indicator = false;
        model.answer = false;
        this.cardsCycle()
      }, 100)
    }, {once: true})

    this.incorrectAnswer3.element.addEventListener('click',() => {
      clearTimeout(this.timerId);
      this.player.incorrect();
      this.incorrectAnswer3.element.classList.add('incorrect');
      setTimeout(() => {
        this.indicator = false;
        model.answer = false;
        this.cardsCycle()
      }, 100)
    }, {once: true})
  }
  
  cardsCycle(){
    let popup = new Popup(this.element, this.model, this.indicator);
    popup.nextBoxBtn.element.addEventListener('click', () => {
      if(this.model.questionIndex === 10){
        this.player.gameEnd();
        this.animation.nextScreenAnimation(popup.element, new WinPopup(this.element, this.model));
      } else if(this.model.questionIndex >= 11) {
        return
      } else {
        this.screenEnd(new PictureGameContainer(this.element.parentElement, new PictureQuestionModel(this.model.questionIndex + 1, this.model.categoryIndex)));
      }
    }, {once: true})
  }

  getRundomNumber(){
    let numbers = new Set();
    numbers.add(this.model.currentQuestion[(this.model.categoryIndex - 1) * 10 + this.model.questionIndex - 1].imageNum)
    while(numbers.size !== 4){
      let newNum = Math.floor(Math.random() * this.model.currentQuestion.length);
      numbers.add(this.model.currentQuestion[newNum].imageNum)
    }
    return numbers
  }

  setBackgroundImage(index, el){
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/DNIWE08/image-data/master/img/${index}.jpg`;
    img.onload = () => {    
      el.style.backgroundImage = `url("${img.src}")`
    }; 
  }
}

export class PictureQuestionModel {
  constructor(questionIndex , categoryIndex){
    this.data = new PictureData()
    this.storage = new Storage('Picture');
    this.currentQuestion = this.data.pictureQuestions;
    this.questionIndex = questionIndex;
    this.categoryIndex = categoryIndex;

    this.settingStorage = new Storage();
    this.checkboxValue = this.settingStorage.getItem('checkbox-value') ? JSON.parse(this.settingStorage.getItem('checkbox-value')) : false;
    this.checkboxTimeValue = this.settingStorage.getItem('time-counter') ? JSON.parse(this.settingStorage.getItem('time-counter')) : 20;

    this.currentVolumeValue = this.settingStorage.getItem('volume-value') ? Number.parseInt(this.settingStorage.getItem('volume-value')) / 100 : 0;
    
    this._answer = this.storage.getItem(`Answer-${this.categoryIndex}`) ? JSON.parse(this.storage.getItem(`Answer-${this.categoryIndex}`)) : Array(10).fill(null);
  }

  get catIndex(){
    return this.categoryIndex
  }

  set catIndex(value){
    this.categoryIndex = value;
  }
  
  get answer(){
    return this._answer
  }

  set answer(value){
    this._answer[this.questionIndex - 1] = value;
    this.storage.setItem(`Answer-${this.categoryIndex}`, JSON.stringify(this._answer))
  }
}

export class Popup extends BaseAnimatedComponent {
  constructor(parentElement, model, answerIndicator){
    super(parentElement, 'div', ['popup', 'container']);

    let picture = new BaseComponent(this.element, 'p', [], `Картина: "${model.currentQuestion[(model.categoryIndex - 1) * 10 + model.questionIndex - 1].name}"`);
    let author = new BaseComponent(this.element, 'p', [], `Автор: "${model.currentQuestion[(model.categoryIndex - 1) * 10 + model.questionIndex - 1].author}"`);
    let indicator = new BaseComponent(this.element, 'div', ['indicator']);
    answerIndicator ? indicator.element.classList.add('correct') : indicator.element.classList.add('incorrect')
    this.pictureImg = new BaseComponent(this.element, 'div', ['question-image']);
    this.setBackgroundImage(model.currentQuestion[(model.categoryIndex - 1) * 10 + model.questionIndex - 1].imageNum);
    this.nextBoxBtn = new BaseComponent(this.element, 'button', ['answer-btn', 'default-btn'], 'Next');

  }

  setBackgroundImage(index){
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/DNIWE08/image-data/master/img/${index}.jpg`;;
    img.onload = () => {      
      this.pictureImg.element.append(img)
    }; 
  }
}

export class WinPopup extends BaseAnimatedComponent {
  constructor(parentElement, model){
    super(parentElement, 'div', ['win-popup']);

    let correctAnswerCount = 0;

    model.answer.forEach(element => {
      element === true ? correctAnswerCount++ : correctAnswerCount += 0;
    });

    let medal = new BaseComponent(this.element, 'div', ['result-medal']);
    let viewResult = new BaseComponent(this.element, 'div', ['result-count']);
    let lastWord = new BaseComponent(this.element, 'div', ['last-word']);

    this.homeBtn = new BaseComponent(this.element, 'button', ['answer-btn', 'default-btn'], 'Home');
    this.nextQuizBtn = new BaseComponent(this.element, 'button', ['answer-btn', 'default-btn'], 'Next Quiz');

    if(correctAnswerCount === 10) {
      medal.element.classList.add('grand');
      viewResult.element.textContent = 'Grand result';
      lastWord.element.textContent = 'Congratulations!'
    } else if (correctAnswerCount > 0 && correctAnswerCount < 10){
      medal.element.classList.add('greate');
      viewResult.element.textContent = `${correctAnswerCount}/10`;
      lastWord.element.textContent = 'Congratulations!'
    } else if(correctAnswerCount === 0) {
      medal.element.classList.add('game-over');
      viewResult.element.textContent = 'Game over';
      lastWord.element.textContent = 'Don\'t worry!'
    }

    this.homeBtn.element.addEventListener('click', () => {
      this.animation.nextScreenAnimation(document.body.lastElementChild, new MainScreen(document.body));
    }, {once: true})
    this.nextQuizBtn.element.addEventListener('click', () => {
      if(model.categoryIndex === 12){
        model.catIndex = 0
      }
      this.animation.nextScreenAnimation(this.element.parentElement.parentElement, new PictureGameField(document.body, model.categoryIndex + 1));
    }, {once: true})
  }
  setBackgroundImage(index){
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/DNIWE08/image-data/master/img/${index}.jpg`;;
    img.onload = () => {      
      this.pictureImg.element.append(img)
    }; 
  }
}