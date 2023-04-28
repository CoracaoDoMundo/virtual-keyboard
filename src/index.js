import './style.css';
import './assets/fonts/fonts.css';
import Btn from './scripts/btn_class.js';
import btnValues from './assets/btn_values.json';

function createHeader(text) {
  const header = document.createElement('h1');
  header.textContent = text;
  return header;
}

function addTextField() {
  const field = document.createElement('textarea');
  field.classList.add('textarea');
  field.setAttribute('rows', '10');
  return field;
}

const keyboardSection = document.createElement('div');
keyboardSection.classList.add('field');

function createBtn(i) {
  const button = new Btn(btnValues[i].code, btnValues[i].value.en, btnValues[i].secondValue.en);
  const el = document.createElement('div');
  el.classList.add('btn');
  el.textContent = button.getValue();
  if (el.textContent === 'Backspace') {
    el.classList.add('backspace');
  }
  return el;
}

btnValues.map((_, i) => {
  keyboardSection.append(createBtn(i));
  return keyboardSection;
});

document.body.prepend(createHeader('Virtual keyboard'));
document.body.append(addTextField());
document.body.append(keyboardSection);
