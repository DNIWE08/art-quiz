import { Animation } from "./Animation"

export class BaseAnimatedComponent {
  constructor(parentElement, tagName, classes, textContent){
    let element = document.createElement(tagName);
    element.classList.add(...classes);
    element.textContent = textContent;
    this.element = element;
    
    this.animation = new Animation();
    const TRANSITION_TIME = 500;
    element.style.transition = `all ${TRANSITION_TIME - 50}ms ease`
    element.classList.add('hide');
    setTimeout(() => {
      parentElement.append(element);
      this.animation.animateIn(element)
    }, TRANSITION_TIME);
  }
  
  screenEnd(nextScreen){
    this.animation.nextScreenAnimation(this.element, nextScreen);
    return nextScreen;
  }
  
  soloRemove(){
    this.animation.animateOut().then(() => this.element.remove())
  }
}

export class BaseComponent {
  constructor(parentElement, tagName, classes, textContent){
    let element = document.createElement(tagName);
    element.classList.add(...classes);
    element.textContent = textContent;
    this.element = element;
    parentElement.append(element);
  }
}