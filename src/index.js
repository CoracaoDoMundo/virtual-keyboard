import './style.css';
import './assets/fonts/fonts.css';
import Btn from './scripts/btn_class.js';
import btnValues from './assets/btn_values.json';

const lang = 'en';

// function setLocalStorage() {
//   localStorage.setItem('language', lang);
// }
// window.addEventListener('beforeunload', setLocalStorage);

// function getLocalStorage() {
//   if (localStorage.getItem('language') === 'undefined') {
//     lang = 'en';
//   } else {
//     lang = localStorage.getItem('language');
//     console.log(lang);
//   }
// }

// window.addEventListener('load', getLocalStorage);

function createHeader() {
  const header = document.createElement('h1');
  header.style.marginBottom = '0';
  const subhead = document.createElement('h3');
  subhead.style.marginTop = '0';
  if (lang === 'en') {
    header.textContent = 'Virtual keyboard';
    subhead.textContent = '(MacOS edition)';
  } else if (lang === 'ru') {
    header.textContent = 'Виртуальная клавиатура';
    subhead.textContent = '(Создана для системы MacOS)';
  }
  document.body.prepend(subhead);
  document.body.prepend(header);
}

function addTextField() {
  const field = document.createElement('textarea');
  field.classList.add('textarea');
  field.setAttribute('rows', '10');
  return field;
}

const keyboardSection = document.createElement('div');
keyboardSection.classList.add('field');

function createBtn(i, l) {
  const button = new Btn(btnValues[i].code, btnValues[i].value[l], btnValues[i].secondValue[l]);
  const el = document.createElement('div');
  const elSecondValue = document.createElement('span');
  el.classList.add('btn');
  el.textContent = button.getValue();
  elSecondValue.textContent = button.getSecondValue();
  elSecondValue.classList.add('btnSecondValue');
  el.prepend(elSecondValue);
  if (el.textContent === 'Backspace') {
    el.classList.add('backspace');
  }
  if (el.textContent === 'Tab') {
    el.classList.add('tab');
  }
  if (el.textContent === 'DEL') {
    el.classList.add('del');
  }
  if (el.textContent === 'Caps Lock') {
    el.classList.add('caps');
  }
  if (el.textContent === 'Shift' && i === 42) {
    el.classList.add('shift');
  }
  if (el.textContent === 'ENTER') {
    el.classList.add('enter');
  }
  if (el.textContent === 'Command' || i === 59 || i === 61) {
    el.classList.add('cmnd');
  }
  if (el.textContent === ' ') {
    el.classList.add('space');
  }
  return el;
}

function fillKeyboard() {
  btnValues.map((_, i) => {
    keyboardSection.append(createBtn(i, lang));
    return keyboardSection;
  });
}

window.addEventListener('load', fillKeyboard);
window.addEventListener('load', createHeader);

document.body.append(addTextField());
document.body.append(keyboardSection);

const btns = document.querySelectorAll('.btn');
const field = document.querySelector('textarea');
// console.log(btns);
