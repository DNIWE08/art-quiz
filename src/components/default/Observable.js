export class Observable {
  constructor() {
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }
  
  unsubscribe(listener){
    this.listeners = this.listeners.filter(el => el !== listener)
  }

  emit(params) {
    this.listeners.forEach(listener => listener(params));
  }
}
