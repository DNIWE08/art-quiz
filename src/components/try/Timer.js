export function customTimer(element, time, callback, bool){
  element.style.width = "338px";
  let timeMinut = time;
  let timerId = setTimeout(function tick() {
    if(bool === true) {

      let minus = timeMinut;
      let elementWidth = Number.parseInt(getComputedStyle(element).width);
      timerId = setTimeout(tick, 1000);
      element.style.width = `${Number.parseInt(getComputedStyle(element).width) - (elementWidth / minus)}px`;
      --timeMinut;
      if (timeMinut <= 0) {
        element.style.width = "0px";
        callback();
        clearTimeout(timerId);
      }
    } else {
      clearTimeout(timerId);
    }
  }, 1000);
}
