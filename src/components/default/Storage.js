export class Storage {
  constructor(prefix = ""){
    this.prefix = prefix;
  }
  setItem(key, value) {
    localStorage.setItem(this.prefix + key, value)
  }

  getItem(key){
    return localStorage.getItem(this.prefix + key)
  }
}