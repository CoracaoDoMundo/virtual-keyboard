import './style.css';
import './assets/fonts/fonts.css';
import Btn from './scripts/btn_class.js';
import btnValues from './assets/btn_values.json';
import pawSvg from './assets/img/icons/paw.svg';

// LOCAL STORAGE FUNCTIONALITY START //

let lang = 'en';
let capsLock = false;

function setLocalStorage() {
  localStorage.setItem('language', lang);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('language') === 'undefined' || localStorage.getItem('language') === 'null') {
    lang = 'en';
  } else {
    lang = localStorage.getItem('language');
  }
}

window.addEventListener('load', getLocalStorage);

// LOCAL STORAGE FUNCTIONALITY END //

// CREATE A KEYBOARD START //

function createHeader() {
  const header = document.createElement('h1');
  header.style.marginBottom = '0';
  const subhead = document.createElement('h3');
  subhead.style.margin = '0';
  const headerStrikethrough = document.createElement('span');
  headerStrikethrough.style.textDecoration = 'line-through';
  const explLine = document.createElement('p');
  explLine.style.margin = '0';
  if (lang === 'en') {
    header.textContent = 'Virtual keyboard';
    subhead.textContent = ' MacOS edition';
    headerStrikethrough.textContent = 'Corgi';
    explLine.textContent = '(for change language press Ctrl+Shift)';
    subhead.prepend(headerStrikethrough);
  } else if (lang === 'ru') {
    header.textContent = 'Виртуальная клавиатура';
    subhead.textContent = ' Создана для системы MacOS';
    headerStrikethrough.textContent = 'Корги';
    explLine.textContent = '(для смены языка нажмите Ctrl+Shift)';
  }
  document.body.prepend(explLine);
  document.body.prepend(subhead);
  document.body.prepend(header);
}

function addTextField() {
  const field = document.createElement('textarea');
  field.classList.add('textarea');
  field.setAttribute('rows', '12');
  field.setAttribute('autofocus', '');
  return field;
}

const keyboardSection = document.createElement('div');
keyboardSection.classList.add('keyboard');

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
  if (button.getName() === 'Caps Lock' && capsLock === true) {
    el.classList.add('activeBtn');
  }
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

const paw = document.createElement('img');
paw.classList.add('paw');
paw.src = pawSvg;
paw.setAttribute('alt', ' ');
document.body.append(paw);

// CREATE A KEYBOARD END //

// KEYBOARD FUNCTIONALITY BY REAL KEYBOARD USING START //

const field = document.querySelector('textarea');

field.addEventListener('keydown', (event) => event.preventDefault());
field.addEventListener('keyup', (event) => event.preventDefault());

function formButtonsArr() {
  const buttons = document.querySelectorAll('.btn');
  return buttons;
}

function backspaceBtnFunc(x) {
  if (field.selectionStart === field.selectionEnd) {
    field.value = field.value.split('').slice(0, field.selectionStart - 1).join('') + field.value.split('').slice(field.selectionStart).join('');
    field.selectionEnd = x - 2;
  } else if (field.selectionStart !== field.selectionEnd) {
    field.value = field.value.split('').slice(0, field.selectionStart).join('') + field.value.split('').slice(field.selectionEnd).join('');
    field.selectionEnd = x - 1;
  }
}

function deleteBtnFunc(x) {
  if (field.selectionStart === field.selectionEnd) {
    field.value = field.value.split('').slice(0, field.selectionStart).join('') + field.value.split('').slice(field.selectionStart + 1).join('');
    field.selectionEnd = x - 1;
  } else if (field.selectionStart !== field.selectionEnd) {
    field.value = field.value.split('').slice(0, field.selectionStart).join('') + field.value.split('').slice(field.selectionEnd).join('');
    field.selectionEnd = x - 1;
  }
}

function shiftBtnFunc(x, i, event) {
  if (field.selectionStart !== field.selectionEnd && event.key !== 'Shift') {
    field.value = field.value.split('').slice(0, field.selectionStart).join('') + btnValues[i].shiftValue[lang] + field.value.split('').slice(field.selectionEnd).join('');
    field.selectionEnd = x;
  } else if (field.selectionStart === field.selectionEnd && event.key !== 'Shift') {
    field.value = field.value.split('').slice(0, field.selectionStart).join('') + btnValues[i].shiftValue[lang] + field.value.split('').slice(field.selectionEnd).join('');
    field.selectionEnd = x;
  }
}

function capslockBtnFunc(x, i) {
  field.value = field.value.split('').slice(0, field.selectionStart).join('') + btnValues[i].value[lang].toUpperCase() + field.value.split('').slice(field.selectionEnd).join('');
  field.selectionEnd = x;
}

function regularBtnFunc(x, i) {
  field.value = field.value.split('').slice(0, field.selectionStart).join('') + btnValues[i].value[lang] + field.value.split('').slice(field.selectionEnd).join('');
  field.selectionEnd = x;
}

function typeOnKeyboard(event) {
  const x = field.selectionStart + 1;
  btnValues.forEach((_, i) => {
    if (event.code === btnValues[i].code && event.code === 'Backspace') {
      backspaceBtnFunc(x);
    } else if (event.code === btnValues[i].code && event.code === 'Delete') {
      deleteBtnFunc(x);
    } else if (event.shiftKey
        && event.code === btnValues[i].code) {
      shiftBtnFunc(x, i, event);
    } else if (event.code === btnValues[i].code && capsLock === true && event.code !== 'CapsLock') {
      capslockBtnFunc(x, i);
    } else if (event.code === btnValues[i].code && event.code !== 'CapsLock' && !event.shiftKey) {
      regularBtnFunc(x, i);
    }
  });
}

function changeLanguage(event) {
  if (event.ctrlKey && event.shiftKey) {
    if (lang === 'en') {
      lang = 'ru';
    } else if (lang === 'ru') {
      lang = 'en';
    }
    keyboardSection.innerHTML = '';
    document.querySelector('h1').remove();
    document.querySelector('h3').remove();
    document.querySelector('p').remove();
    createHeader();
    fillKeyboard();
  }
}

document.addEventListener('keydown', (event) => {
  const buttons = formButtonsArr();
  if (document.activeElement !== field) {
    field.focus();
  } else if (document.activeElement === field) {
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

function unpushBtn(event) {
  const buttons = formButtonsArr();
  buttons.forEach((_, i) => {
    if (event.code !== 'CapsLock') {
      if (capsLock === false) {
        buttons[i].classList.remove('activeBtn');
      } else {
        buttons[i].classList.remove('activeBtn');
        buttons[29].classList.toggle('activeBtn');
      }
    }
  });
}

document.addEventListener('keyup', (event) => { unpushBtn(event); });

// KEYBOARD FUNCTIONALITY BY REAL KEYBOARD USING END //

// KEYBOARD INTERFACE FUNCTIONALITY START //

document.body.onmousedown = (e) => {
  if (document.activeElement === field && e.target.classList.contains('btn')) {
    e.preventDefault();
  }
};

function pushButtonOnVirtualKeyboard(event) {
  if (event.target.classList.contains('btn') && document.activeElement === document.body) {
    field.focus();
  }
  if (event.target.classList.contains('btn')
  && document.activeElement === field
  && event.target.textContent !== '^Control'
  && event.target.textContent !== '⌥Option'
  && event.target.textContent !== '⌘Command'
  && event.target.textContent !== 'Fn') {
    const x = field.selectionStart + 1;
    const i = btnValues.findIndex((el) => event.target.id === el.code);
    event.target.classList.add('activeBtn');
    if (event.target.textContent === 'DEL') {
      deleteBtnFunc(x);
    } else if (event.target.textContent === 'Backspace') {
      backspaceBtnFunc(x);
    } else if (event.target.textContent === 'Caps Lock') {
      if (capsLock === false) {
        capsLock = true;
        event.target.classList.add('activeBtn');
      } else {
        capsLock = false;
        event.target.classList.remove('activeBtn');
      }
    } else if (capsLock === true && event.target.textContent !== 'Caps Lock') {
      capslockBtnFunc(x, i);
    } else if (event.shiftKey && event.target.textContent !== 'Caps Lock') {
      shiftBtnFunc(x, i, event);
    } else if (capsLock !== true && event.target.textContent !== 'Caps Lock') {
      regularBtnFunc(x, i);
    }
  } else if (event.target.classList.contains('btn')
  && document.activeElement === field) {
    event.target.classList.add('activeBtn');
  }
}

keyboardSection.addEventListener('mousedown', (event) => pushButtonOnVirtualKeyboard(event));
keyboardSection.addEventListener('mouseup', (event) => {
  if (event.target.textContent !== 'Caps Lock') {
    event.target.classList.remove('activeBtn');
  }
});
keyboardSection.addEventListener('mouseout', (event) => {
  if (event.target.textContent !== 'Caps Lock') {
    event.target.classList.remove('activeBtn');
  }
});

// KEYBOARD INTERFACE FUNCTIONALITY END //
