export class Animation {
  animateIn(element) {
    return new Promise((res) => {
      setTimeout(() => {
        element.classList.add("hide");
        element.ontransitionend = () => {
          element.classList.remove("hide");
          res(null);
        };
         element.style.opacity = 1;
      },50)
    })
  }

  animateOut(element) {
    return new Promise((res) => {
      element.classList.add("hide");
      element.ontransitionend = () => {
        res(null)
      };
      element.style.opacity = 0;
    })
  }
  
  nextScreenAnimation(thisScreen, nextScreen) {
    this.animateOut(thisScreen)
    .then(() => {
      thisScreen.remove();
      let setting = nextScreen;
      return nextScreen;
    })
  }
}