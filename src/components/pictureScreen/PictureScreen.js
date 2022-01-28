import logo from '../../assets/logo.png';

import { BaseAnimatedComponent, BaseComponent } from "../default/BaseComponent";
import { SettingScreen } from '../settingScreen/SettingScreen';
import { Storage } from '../default/Storage';
import { Animation } from '../default/Animation';
import { PictureGameField } from '../gameCycle/gamePicture';
import { PictureData } from '../gameCycle/data';
import { MainScreen } from '../mainScreen/MainScreen';
import { ImageDiscriptionData } from '../artistScreen/ArtistScreen';

export class PictureScreen extends BaseAnimatedComponent {
  constructor(parentElement){
    super(parentElement, 'div', ['arist-screen', 'container']);
    this.settingNav = new BaseComponent(this.element, 'div', ['arist-nav', 'setting']);
    this.settingNav.element.insertAdjacentHTML('beforeend', 
    `<div class="logo">
      <img class="logo-image" src="${logo}" alt="logo">
    </div>`);
    this.settingOpen = new BaseComponent(this.settingNav.element, 'div', ['setting']);
    this.settingOpen.element.innerHTML = 
      `<svg width="34" height="34" viewBox="0 0 34 34" xmlns="http://www.w3.org/2000/svg">
        <path d="M28.6875 17.8074V16.9999V16.1818L30.7275 14.3968C31.1035 14.0653 31.3503 13.6116 31.4242 13.1158C31.4981 12.62 31.3943 12.1141 31.1313 11.6874L28.6238 7.43738C28.4374 7.11466 28.1695 6.84661 27.8469 6.66012C27.5243 6.47363 27.1583 6.37526 26.7856 6.37488C26.5547 6.37311 26.325 6.409 26.1056 6.48113L23.5238 7.35238C23.078 7.05617 22.613 6.78995 22.1319 6.55551L21.59 3.87801C21.4928 3.38884 21.2267 2.94943 20.8382 2.63669C20.4498 2.32396 19.9636 2.15783 19.465 2.16738H14.4925C13.9939 2.15783 13.5078 2.32396 13.1193 2.63669C12.7308 2.94943 12.4647 3.38884 12.3675 3.87801L11.8256 6.55551C11.3411 6.7899 10.8725 7.0561 10.4231 7.35238L7.89438 6.43863C7.67264 6.38086 7.443 6.35933 7.21438 6.37488C6.84174 6.37526 6.47574 6.47363 6.15312 6.66012C5.83049 6.84661 5.56258 7.11466 5.37626 7.43738L2.86876 11.6874C2.62076 12.1134 2.5286 12.6125 2.60807 13.099C2.68755 13.5855 2.9337 14.0293 3.30438 14.3543L5.31251 16.1924V17.818L3.30438 19.603C2.92323 19.9303 2.67034 20.382 2.59059 20.878C2.51085 21.3739 2.6094 21.8821 2.86876 22.3124L5.37626 26.5624C5.56258 26.8851 5.83049 27.1532 6.15312 27.3396C6.47574 27.5261 6.84174 27.6245 7.21438 27.6249C7.44532 27.6267 7.675 27.5908 7.89438 27.5186L10.4763 26.6474C10.922 26.9436 11.387 27.2098 11.8681 27.4443L12.41 30.1218C12.5072 30.6109 12.7733 31.0503 13.1618 31.3631C13.5503 31.6758 14.0364 31.8419 14.535 31.8324H19.55C20.0486 31.8419 20.5347 31.6758 20.9232 31.3631C21.3117 31.0503 21.5778 30.6109 21.675 30.1218L22.2169 27.4443C22.7015 27.2099 23.17 26.9437 23.6194 26.6474L26.1906 27.5186C26.41 27.5908 26.6397 27.6267 26.8706 27.6249C27.2433 27.6245 27.6093 27.5261 27.9319 27.3396C28.2545 27.1532 28.5224 26.8851 28.7088 26.5624L31.1313 22.3124C31.3793 21.8863 31.4714 21.3873 31.3919 20.9008C31.3125 20.4143 31.0663 19.9705 30.6956 19.6455L28.6875 17.8074ZM26.7856 25.4999L23.1413 24.2674C22.2881 24.99 21.3131 25.5549 20.2619 25.9355L19.5075 29.7499H14.4925L13.7381 25.978C12.6952 25.5866 11.7255 25.0227 10.8694 24.3099L7.21438 25.4999L4.70688 21.2499L7.59688 18.6999C7.40042 17.6 7.40042 16.4741 7.59688 15.3743L4.70688 12.7499L7.21438 8.49988L10.8588 9.73238C11.7119 9.00977 12.6869 8.4449 13.7381 8.06426L14.4925 4.24988H19.5075L20.2619 8.02176C21.3048 8.41321 22.2746 8.9771 23.1306 9.68988L26.7856 8.49988L29.2931 12.7499L26.4031 15.2999C26.5996 16.3997 26.5996 17.5257 26.4031 18.6255L29.2931 21.2499L26.7856 25.4999Z"/>
        <path d="M17 23.375C15.7391 23.375 14.5066 23.0011 13.4582 22.3006C12.4099 21.6001 11.5928 20.6045 11.1103 19.4396C10.6278 18.2747 10.5015 16.9929 10.7475 15.7563C10.9935 14.5197 11.6006 13.3838 12.4922 12.4922C13.3838 11.6006 14.5197 10.9935 15.7563 10.7475C16.9929 10.5015 18.2747 10.6278 19.4396 11.1103C20.6045 11.5928 21.6001 12.4099 22.3006 13.4582C23.0011 14.5066 23.375 15.7391 23.375 17C23.3835 17.8396 23.2245 18.6724 22.9071 19.4497C22.5897 20.227 22.1205 20.9331 21.5268 21.5268C20.9331 22.1205 20.227 22.5897 19.4497 22.9071C18.6724 23.2245 17.8396 23.3835 17 23.375ZM17 12.75C16.4383 12.7369 15.8798 12.8379 15.3582 13.0469C14.8367 13.2558 14.363 13.5684 13.9657 13.9657C13.5684 14.363 13.2558 14.8367 13.0469 15.3582C12.8379 15.8798 12.7369 16.4383 12.75 17C12.7369 17.5617 12.8379 18.1202 13.0469 18.6418C13.2558 19.1633 13.5684 19.6371 13.9657 20.0343C14.363 20.4316 14.8367 20.7442 15.3582 20.9532C15.8798 21.1621 16.4383 21.2631 17 21.25C17.5617 21.2631 18.1202 21.1621 18.6418 20.9532C19.1633 20.7442 19.6371 20.4316 20.0343 20.0343C20.4316 19.6371 20.7442 19.1633 20.9532 18.6418C21.1621 18.1202 21.2631 17.5617 21.25 17C21.2631 16.4383 21.1621 15.8798 20.9532 15.3582C20.7442 14.8367 20.4316 14.363 20.0343 13.9657C19.6371 13.5684 19.1633 13.2558 18.6418 13.0469C18.1202 12.8379 17.5617 12.7369 17 12.75Z"/>
      </svg>`
    ;
    this.categoryHeading = new BaseComponent(this.element, 'h2', ['text'], 'Categories');
    this.categorySelectContainer = new BaseComponent(this.element, 'div', ['category-select']);

    this.gameNavigation = new BaseComponent(this.element, 'div', ['game-navigation']);

    this.homeOpenBtn = new BaseComponent(this.gameNavigation.element, 'button', ['score-btn', 'default-btn'], 'Home');
    this.homeOpenBtn.element.onclick = () => {
      this.screenEnd(new MainScreen(document.body))
    }
    
    this.categoriesOpenBtn = new BaseComponent(this.gameNavigation.element, 'button', ['score-btn', 'current-page', 'default-btn'], 'Categories');

    this.artistScoreOpenBtn = new BaseComponent(this.gameNavigation.element, 'button', ['score-btn', 'default-btn'], 'Score');
    this.artistScoreOpenBtn.element.onclick = () => {
      this.screenEnd(new PictureScore(document.body))
    }


    this.settingOpen.element.onclick = () => {
      this.screenEnd(new SettingScreen(document.body, 'Picture screen'))
    }

    this.categoryIndex = 1;
    this.storage = new Storage('Picture');
    this.artistCategoryCards = this.start();
  }

  start(){
    let artistCategoryCards = []
    for(let i = 1; i <= 12; i++) {
      let categoryCard = new PictureQuizCategoryCard(this.categorySelectContainer.element, this.categoryIndex);
      let categoryAnswers = JSON.parse(this.storage.getItem(`Answer-${this.categoryIndex}`));
      let filterAnswers = categoryAnswers !== null ? categoryAnswers.every(el => el !== null) : null;
      let filterScore = 0;
      if(!filterAnswers) {
        categoryCard.cardImage.element.classList.add('fill-mode');
      } else {
        categoryAnswers.forEach(el => el === true ? filterScore += 1 : true);
        categoryCard.element.classList.add('Score');
        categoryCard.cardScore.element.textContent = `${filterScore}/10`;
      }
      artistCategoryCards.push(categoryCard);
      this.categoryIndex++;
    }
    return artistCategoryCards;
  }

  removeCategoryCards(){
    this.artistCategoryCards.forEach(el => el.destroy());
  }
}

export class PictureQuizCategoryCard extends BaseComponent {
  constructor(parentElement, category){
    super(parentElement, 'div', ['category-card']);
    this.cardNumber = new BaseComponent(this.element, 'p', ['name'], `Category ${category}`);
    this.cardScore = new BaseComponent(this.element, 'p', ['score']);
    this.cardImage = new BaseComponent(this.element, 'div', ['category-imgae']);
    this.setBackgroundImage(category * 13);

    this.animation = new Animation();
    this.cardImage.element.addEventListener('click',() => {
      this.animation.nextScreenAnimation(this.element.parentElement.parentElement, new PictureGameField(document.body, category));
    }, {once: true})
  }

  setBackgroundImage(index){
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/DNIWE08/image-data/master/img/${index}.jpg`;;
    img.onload = () => {      
      this.cardImage.element.style.backgroundImage = `url(${img.src})`;
    }; 
  }
}

export class PictureScore extends BaseAnimatedComponent {
  constructor(parentElement){
    super(parentElement, 'div', ['artis-score-screen', 'container']);

    let headingDiscription = new BaseComponent(this.element, 'h2', ['score-discription'], 'Picture quiz score');
    let categoryWrapper = new BaseComponent(this.element, 'div', ['score-categories-wrapper']);

    this.artistScore = new Storage('Picture');
    this.data = new PictureData();
    this.dataChunk = this.data.chunksQuestionsByPicture;
    for(let i = 1; i <= 12; i++) {
      let categoryContainer = new BaseComponent(categoryWrapper.element, 'div', ['score-category-container']);
      let categoryContainerDiscription = new BaseComponent(categoryContainer.element, 'div', ['score-category-discription'], `Category ${i}`);
      let scoreCategory = this.artistScore.getItem(`Answer-${i}`) === null ? Array(10).fill(null) : JSON.parse(this.artistScore.getItem(`Answer-${i}`));
      scoreCategory.forEach((el, index) => {
        let imageNumber = Number(this.dataChunk[i-1][index].imageNum);
        if(el === true) {
          this.pic = new BaseComponent(categoryContainer.element, 'div', ['correct', 'score-element'])
          this.setBackgroundImage(imageNumber, this.pic.element);
        } else {
          this.pic = new BaseComponent(categoryContainer.element, 'div', ['incorrect', 'score-element'])
          this.setBackgroundImage(imageNumber, this.pic.element);
        }
        let imageDiscriptionData = new ImageDiscriptionData(this.pic.element, this.dataChunk[i-1][index]);
      })
    }

    this.gameNavigation = new BaseComponent(this.element, 'div', ['game-navigation', 'score-navigation']);

    this.homeOpenBtn = new BaseComponent(this.gameNavigation.element, 'button', ['score-btn'], 'Home');
    this.homeOpenBtn.element.onclick = () => {
      this.screenEnd(new MainScreen(document.body))
    }
    
    this.categoriesOpenBtn = new BaseComponent(this.gameNavigation.element, 'button', ['score-btn'], 'Categories');
    this.categoriesOpenBtn.element.onclick = () => {
      this.screenEnd(new PictureScreen(document.body))
    }

    this.artistScoreOpenBtn = new BaseComponent(this.gameNavigation.element, 'button', ['score-btn', 'current-page'], 'Score');
    
  }

  setBackgroundImage(index, el){
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/DNIWE08/image-data/master/img/${index}.jpg`;
    img.onload = () => {    
      el.style.backgroundImage = `url("${img.src}")`
    }; 
  }
}
