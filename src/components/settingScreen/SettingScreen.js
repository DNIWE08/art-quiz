import schoolLogo from '../../assets/school-logo.png';

import { BaseAnimatedComponent, BaseComponent } from "../default/BaseComponent";
import { MainScreen } from '../mainScreen/MainScreen';
import { ArtistScreen } from '../artistScreen/ArtistScreen';
import { Storage } from '../default/Storage';
import { Observable } from '../default/Observable';
import { PictureScreen } from '../pictureScreen/PictureScreen';

export class SettingScreen extends BaseAnimatedComponent{
  constructor(parentElement, prevScreen){
    super(parentElement, 'div', ['setting-screen', 'container']); 
    this.settingNav = new BaseComponent(this.element, 'div', ['setting-nav', 'setting']);
    this.settingsClose = new BaseComponent(this.settingNav.element, 'button', ['settings-btn--close']);
    this.settingsClose.element.innerHTML = `
    <svg width="29" height="20" viewBox="0 0 11 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.59246 19.9171C8.38082 19.9179 8.17171 19.8711 7.98049 19.7804C7.78927 19.6897 7.6208 19.5573 7.48747 19.393L0.644967 10.893C0.436602 10.6395 0.322693 10.3215 0.322693 9.99339C0.322693 9.66525 0.436602 9.34729 0.644967 9.09381L7.7283 0.593805C7.96876 0.304498 8.3143 0.122564 8.68891 0.0880259C9.06351 0.0534879 9.43649 0.169176 9.7258 0.409639C10.0151 0.650102 10.197 0.995643 10.2316 1.37025C10.2661 1.74485 10.1504 2.11783 9.90996 2.40714L3.57747 10.0005L9.69746 17.5938C9.8707 17.8018 9.98074 18.055 10.0146 18.3235C10.0484 18.592 10.0046 18.8646 9.88836 19.109C9.77211 19.3535 9.58828 19.5595 9.35863 19.7027C9.12897 19.8459 8.8631 19.9203 8.59246 19.9171Z" />
    </svg>`;

    this.settingsHeadingText = new BaseComponent(this.settingNav.element, 'div', ['text'], 'Settings');
    this.textVolume = new BaseComponent(this.element, 'h2', [], 'Volume');
    this.volumeSlider = new BaseComponent(this.element, 'input', []);
    this.volumeSlider.element.type = 'range';
    this.volumeSlider.element.id = 'volume-slider';
    this.volumeSlider.element.min = '0';
    this.volumeSlider.element.max = '100';
    this.volumeSlider.element.step = '1';
    this.element.insertAdjacentHTML('beforeend', 
      `<div class="volume-icons">
        <div class="muted-icon"></div>
        <div class="volume-icon"></div>
      </div>`
    );
    this.textTimeGame = new BaseComponent(this.element, 'h2', [], 'Time game');
    this.timerCheckboxContainer = new BaseComponent(this.element, 'div', ['timer-checkbox--container']);
    this.timerCheckboxLabel = new BaseComponent(this.timerCheckboxContainer.element, 'label', ['text']);
    this.timerCheckboxLabel.element.setAttribute('for', 'timer-input');
    this.timerCheckbox = new BaseComponent(this.timerCheckboxContainer.element, 'input', []);
    this.timerCheckbox.element.type = 'checkbox';
    this.timerCheckbox.element.id = 'timer-input';
    this.textTimeAnswer = new BaseComponent(this.element, 'h2', [], 'Time to answer');
    this.timerCounterContainer = new BaseComponent(this.element, 'div', ['timer-counter--container']);
    this.minusBtn = new BaseComponent(this.timerCounterContainer.element, 'button', ['minus-btn']);
    this.timerOutputText = new BaseComponent(this.timerCounterContainer.element, 'div', ['timer-otput', 'text']);
    this.plusBtn = new BaseComponent(this.timerCounterContainer.element, 'button', ['plus-btn']);
    this.settingsBtns = new BaseComponent(this.element, 'div', ['setting-btns']);
    this.resetBtn = new BaseComponent(this.settingsBtns.element, 'button', ['default-btn', 'set-btns', 'reset-btn'], 'Default');
    this.saveBtn = new BaseComponent(this.settingsBtns.element, 'button', ['default-btn', 'set-btns', 'reset-btn'], 'Save');
    this.element.insertAdjacentHTML('beforeend', 
      `<div class="footer">
        <img src="${schoolLogo}" alt="school logo">
        <p>Gleb Zakharevich</p>
        <p>2021</p>
      </div>`
    );

    this.model = new SettingsModel(new Storage());

    this.model.onTimeCounterChanged.subscribe(value => {
      this.updatetimerOutputText(value);
    })

    this.model.onVolumeSettingsValue.subscribe(value => {
      this.updatetimerInputValue(value);
    })

    this.model.onTimeCheckboxValueChanged.subscribe(value => {
      this.timerCheckbox.element.checked = value
      this.timerCheckboxLabel.element.textContent = this.labelCheckboxUpdate(value);
    })

    this.settingsClose.element.onclick = () => {
      if(prevScreen === 'Main screen'){
        this.screenEnd(new MainScreen(document.body))
      } else if(prevScreen === 'Artist screen'){
        this.screenEnd(new ArtistScreen(document.body))
      } else if(prevScreen === 'Picture screen'){
        this.screenEnd(new PictureScreen(document.body))
      }
    };

    this.volumeSlider.element.setAttribute('value', this.model.volumeSettingsValue.toString());
    this.volumeSlider.element.addEventListener('input', () => {
      this.model.volumeSettingsValue = this.volumeSlider.element.value;
      this.updateColorInput(this.volumeSlider.element);
    })

    this.timerCheckboxLabel.element.textContent = this.labelCheckboxUpdate(this.model.timeCheckboxValue);

    this.timerCheckbox.element.checked = this.model.timeCheckboxValue;
    this.timerCheckbox.element.onclick = () => {
      this.model.timeCheckboxValue = this.timerCheckbox.element.checked;
    }

    this.minusBtn.element.onclick = () => {
      if(this.model.timeCounterValue === 5) return
      this.model.timeCounterValue -= 5;
    }
    this.timerOutputText.element.textContent = this.model.timeCounterValue.toString();

    this.plusBtn.element.onclick = () => {
      if(this.model.timeCounterValue === 30) return
      this.model.timeCounterValue += 5;
    }

    this.resetBtn.element.onclick = () => {
      this.model.resetSettings()
    }
    this.saveBtn.element.onclick = () => {
      if(prevScreen === 'Main screen'){
        this.screenEnd(new MainScreen(document.body))
      } else if(prevScreen === 'Artist screen'){
        this.screenEnd(new ArtistScreen(document.body))
      } else if(prevScreen === 'Picture screen'){
        this.screenEnd(new PictureScreen(document.body))
      }
    }

    window.addEventListener('load', this.updateColorInput(this.volumeSlider.element))
  }

  updateColorInput(slider) {
    let position = slider.value;
    let color = `linear-gradient(90deg, #ffbca2 ${position}%, #c4c4c4 ${position}%)`;
    slider.style.background = color;
  }

  loadScreen(){
    this.updateColorInput(this.volumeSlider.element);
  }

  updatetimerOutputText(value){
    this.timerOutputText.element.textContent = value;
  }

  updatetimerInputValue(value){
    this.volumeSlider.element.value = value;
    this.updateColorInput(this.volumeSlider.element);
  }

  labelCheckboxUpdate(value) {
    if(value) {
      return "On"
    } else {
      return "Off"
    }
  }
}

export class SettingsModel {
  constructor(storage) {
    this.storage = storage;
    this.defaultValues = {
      volumeValue: 0,
      timerInput: false,
      timerValue: 20,
    }
    
    this._volumeSliderValue = this.storage.getItem('volume-value') ? this.storage.getItem('volume-value') :  this.defaultValues.volumeValue;
    this._timeCounterValue = Number.parseInt(this.storage.getItem('time-counter')) ? Number.parseInt(this.storage.getItem('time-counter')) : this.defaultValues.timerValue;
    let checkedValue = this.storage.getItem('checkbox-value');
    if(checkedValue) {
      if(checkedValue === 'true') {
        this._timeCheckboxValue = true;
      } else {
        this._timeCheckboxValue = false;
      }
    } else {
      this._timeCheckboxValue = this.defaultValues.timerInput;
    }

    this.onTimeCounterChanged = new Observable();
    this.onVolumeSettingsValue = new Observable();
    this.onTimeCheckboxValueChanged = new Observable();
  }

  get timeCounterValue(){
    return this._timeCounterValue;
  }

  set timeCounterValue(value){
    this._timeCounterValue = value;
    this.storage.setItem('time-counter', value);
    this.onTimeCounterChanged.emit(value);
  }

  get volumeSettingsValue() {
    return this._volumeSliderValue;
  }

  set volumeSettingsValue(value) {
    this._volumeSliderValue = value;
    this.storage.setItem('volume-value', value);
    this.onVolumeSettingsValue.emit(value);
  }

  get timeCheckboxValue() {
    return this._timeCheckboxValue;
  }

  set timeCheckboxValue(value) {
    this._timeCheckboxValue = value;
    this.storage.setItem('checkbox-value', value);
    this.onTimeCheckboxValueChanged.emit(value)
  }

  resetSettings(){
    this.volumeSettingsValue = this.defaultValues.volumeValue;
    this.timeCounterValue = this.defaultValues.timerValue;
    this.timeCheckboxValue = this.defaultValues.timerInput;
  }
}