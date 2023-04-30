import './style.css';
import './assets/fonts/fonts.css';
import Btn from './scripts/btn_class.js';
import btnValues from './assets/btn_values.json';

// LOCAL STORAGE FUNCTIONALITY START //

let lang = 'en';
let capsLock = false;

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

// LOCAL STORAGE FUNCTIONALITY END //

// CREATE A KEYBOARD START //

function createHeader() {
  const header = document.createElement('h1');
  header.style.marginBottom = '0';
  const subhead = document.createElement('h3');
  subhead.style.margin = '0';
  const explLine = document.createElement('p');
  explLine.style.margin = '0';
  if (lang === 'en') {
    header.textContent = 'Virtual keyboard';
    subhead.textContent = 'MacOS edition';
    explLine.textContent = '(for change language press Ctrl+Shift)';
  } else if (lang === 'ru') {
    header.textContent = 'Виртуальная клавиатура';
    subhead.textContent = 'Создана для системы MacOS';
    explLine.textContent = '(для смены языка нажмите Ctrl+Shift)';
  }
  document.body.prepend(explLine);
  document.body.prepend(subhead);
  document.body.prepend(header);
}

function addTextField() {
  const field = document.createElement('textarea');
  field.classList.add('textarea');
  field.setAttribute('rows', '10');
  field.setAttribute('autofocus', '');
  return field;
}

const keyboardSection = document.createElement('div');
keyboardSection.classList.add('field');

function createBtn(i, l) {
  const button = new Btn(
    btnValues[i].code,
    btnValues[i].btnName[l],
    btnValues[i].value[l],
    btnValues[i].secondBtnName[l],
  );
  const el = document.createElement('div');
  const elSecondValue = document.createElement('span');
  el.classList.add('btn');
  el.textContent = button.getName();
  el.setAttribute('id', button.getCode());
  elSecondValue.textContent = button.getSecondName();
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

// CREATE A KEYBOARD END //

// KEYBOARD FUNCTIONALITY BY REAL KEYBOARD USING START //

const field = document.querySelector('textarea');

field.addEventListener('keydown', (event) => event.preventDefault());
field.addEventListener('keyup', (event) => event.preventDefault());

function formButtonsArr() {
  const buttons = document.querySelectorAll('.btn');
  return buttons;
}

function typeOnKeyboard(event) {
  console.log(event.code);
  btnValues.forEach((_, i) => {
    if (event.code === btnValues[i].code && event.code === 'Backspace') {
      field.value = field.value.slice(0, -1);
      // ПОНЯТЬ КАК ОПРЕДЕЛИТЬ ГДЕ КАРЕТКА И ДОДЕЛАТЬ МЕТОД УДАЛЕНИЯ ПРЕДЫДУЩЕГО СИМВОЛА:
      // } else if (event.code === btnValues[i].code && event.code === 'Delete') {
    } else if (event.shiftKey && event.code === btnValues[i].code) {
      field.value += btnValues[i].shiftValue[lang];
    } else if (event.code === btnValues[i].code && capsLock === true) {
      field.value += btnValues[i].value[lang].toUpperCase();
    } else if (event.code === btnValues[i].code) {
      field.value += btnValues[i].value[lang];
    }
  });
}

function changeLanguage(event) {
  if (event.ctrlKey && event.shiftKey) {
    if (lang === 'en') {
      lang = 'ru';
      keyboardSection.innerHTML = '';
      document.querySelector('h1').remove();
      document.querySelector('h3').remove();
      document.querySelector('p').remove();
      createHeader();
      fillKeyboard();
    } else {
      lang = 'en';
      keyboardSection.innerHTML = '';
      document.querySelector('h1').remove();
      document.querySelector('h3').remove();
      document.querySelector('p').remove();
      createHeader();
      fillKeyboard();
    }
  }
}

document.addEventListener('keydown', (event) => {
  const buttons = formButtonsArr();
  if (document.activeElement === field) {
    buttons.forEach((_, i) => {
      if (event.code === buttons[i].id && event.code !== 'CapsLock') {
        buttons[i].classList.add('activeBtn');
      } else if (event.code === buttons[i].id && event.code === 'CapsLock') {
        buttons[i].classList.toggle('activeBtn');
        if (capsLock === false) {
          capsLock = true;
        } else {
          capsLock = false;
        }
      }
    });
    typeOnKeyboard(event);
  }
  changeLanguage(event);
});

document.addEventListener('keyup', (event) => {
  const buttons = formButtonsArr();
  buttons.forEach((_, i) => {
    if (event.code === buttons[i].id && event.code !== 'CapsLock') {
      buttons[i].classList.remove('activeBtn');
    }
  });
});

// KEYBOARD FUNCTIONALITY BY REAL KEYBOARD USING END //

// KEYBOARD INTERFACE FUNCTIONALITY START //

document.body.onmousedown = function (e) {
  if (document.activeElement === field && e.target.classList.contains('btn')) {
    e.preventDefault();
  }
};

function pushButton(event) {
  if (event.target.classList.contains('btn')) {
    console.log(event.target.textContent);
    field.value += event.target.textContent;
  }
}

document.addEventListener('click', (event) => pushButton(event));

// KEYBOARD INTERFACE FUNCTIONALITY END //
