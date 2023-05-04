import './style.css';
import './assets/fonts/fonts.css';
import Btn from './scripts/btn_class.js';
import btnValues from './assets/btn_values.json';
import pawSvg from './assets/img/icons/paw.svg';
import wofSound from './assets/sounds/dog-wof.mp3';
import keySound from './assets/sounds/key-sound.mp3';

// LOCAL STORAGE FUNCTIONALITY START //

let lang;
let capsLock = false;
let leftShift = false;
let rightShift = false;
let ctrl = false;

function getLocalStorage() {
  const localValue = localStorage.getItem('language');
  if (localValue === undefined || localValue === null) {
    lang = 'en';
  } else {
    lang = localValue;
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

function formButtonsArr() {
  const buttons = document.querySelectorAll('.btn');
  return buttons;
}

function changeBtnNamesCaps() {
  const buttons = formButtonsArr();
  if (capsLock === true) {
    buttons.forEach((__, index) => {
      if (btnValues[index].secondBtnName[lang] === '' && btnValues[index].shiftValue[lang] !== '') {
        const mainValue = buttons[index].lastChild;
        mainValue.textContent = btnValues[index].shiftValue[lang];
      }
    });
  } else if (capsLock !== true) {
    buttons.forEach((__, index) => {
      if (btnValues[index].secondBtnName[lang] === '' && btnValues[index].shiftValue[lang] !== '') {
        const mainValue = buttons[index].lastChild;
        mainValue.textContent = btnValues[index].btnName[lang];
      }
    });
  }
}

function createBtn(i, l) {
  const button = new Btn(
    btnValues[i].code,
    btnValues[i].btnName[l],
    btnValues[i].value[l],
    btnValues[i].secondBtnName[l],
  );
  const el = document.createElement('div');
  const elValue = document.createElement('span');
  elValue.classList.add('btnValue');
  const elSecondValue = document.createElement('span');
  el.classList.add('btn');
  elValue.textContent = button.getName();
  el.setAttribute('id', button.getCode());
  elSecondValue.textContent = button.getSecondName();
  elSecondValue.classList.add('btnSecondValue');
  const btnCover = document.createElement('div');
  btnCover.classList.add('cover');
  el.prepend(btnCover);
  el.prepend(elSecondValue);
  el.append(elValue);
  if (button.getName() === 'Caps Lock' && capsLock === true) {
    el.classList.add('activeBtn');
    changeBtnNamesCaps();
  }
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
    if (leftShift === true && el.id === 'ShiftLeft') {
      el.classList.add('activeBtn');
    }
  }
  if (rightShift === true && el.id === 'ShiftRight') {
    el.classList.add('activeBtn');
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
  if (el.textContent === '^Control' && ctrl === true) {
    el.classList.add('activeBtn');
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
const pawSound = new Audio(wofSound);
paw.addEventListener('click', () => pawSound.play());

// CREATE A KEYBOARD END //

// KEYBOARD FUNCTIONALITY BY REAL KEYBOARD USING START //

const field = document.querySelector('textarea');
const clickSound = new Audio(keySound);

field.addEventListener('keydown', (event) => event.preventDefault());
field.addEventListener('keyup', (event) => event.preventDefault());

function backspaceBtnFunc(x) {
  clickSound.play();
  if (field.selectionStart === field.selectionEnd) {
    field.value = field.value.split('').slice(0, field.selectionStart - 1).join('') + field.value.split('').slice(field.selectionStart).join('');
    field.selectionEnd = x - 2;
  } else if (field.selectionStart !== field.selectionEnd) {
    field.value = field.value.split('').slice(0, field.selectionStart).join('') + field.value.split('').slice(field.selectionEnd).join('');
    field.selectionEnd = x - 1;
  }
}

function deleteBtnFunc(x) {
  clickSound.play();
  if (field.selectionStart === field.selectionEnd) {
    field.value = field.value.split('').slice(0, field.selectionStart).join('') + field.value.split('').slice(field.selectionStart + 1).join('');
    field.selectionEnd = x - 1;
  } else if (field.selectionStart !== field.selectionEnd) {
    field.value = field.value.split('').slice(0, field.selectionStart).join('') + field.value.split('').slice(field.selectionEnd).join('');
    field.selectionEnd = x - 1;
  }
}

function shiftBtnFunc(x, i, event) {
  clickSound.play();
  if (field.selectionStart !== field.selectionEnd && event.key !== 'Shift') {
    field.value = field.value.split('').slice(0, field.selectionStart).join('') + btnValues[i].shiftValue[lang] + field.value.split('').slice(field.selectionEnd).join('');
    field.selectionEnd = x;
  } else if (field.selectionStart === field.selectionEnd && event.key !== 'Shift') {
    field.value = field.value.split('').slice(0, field.selectionStart).join('') + btnValues[i].shiftValue[lang] + field.value.split('').slice(field.selectionEnd).join('');
    field.selectionEnd = x;
  }
}

function changeBtnNamesShift() {
  const buttons = formButtonsArr();
  if (leftShift === true || rightShift === true) {
    buttons.forEach((__, index) => {
      if (btnValues[index].shiftValue[lang] !== '') {
        const secondValue = buttons[index].firstChild;
        const mainValue = buttons[index].lastChild;
        secondValue.textContent = secondValue.textContent === '' ? '' : btnValues[index].btnName[lang];
        mainValue.textContent = btnValues[index].shiftValue[lang];
      }
    });
  } else if (leftShift !== true && rightShift !== true && capsLock !== true) {
    buttons.forEach((__, index) => {
      if (btnValues[index].shiftValue[lang] !== '') {
        const secondValue = buttons[index].firstChild;
        const mainValue = buttons[index].lastChild;
        secondValue.textContent = secondValue.textContent === '' ? '' : btnValues[index].secondBtnName[lang];
        mainValue.textContent = btnValues[index].btnName[lang];
      }
    });
  }
}

function capslockBtnFunc(x, i) {
  clickSound.play();
  field.value = field.value.split('').slice(0, field.selectionStart).join('') + btnValues[i].value[lang].toUpperCase() + field.value.split('').slice(field.selectionEnd).join('');
  field.selectionEnd = x;
}

function regularBtnFunc(x, i) {
  clickSound.play();
  field.value = field.value.split('').slice(0, field.selectionStart).join('') + btnValues[i].value[lang] + field.value.split('').slice(field.selectionEnd).join('');
  field.selectionEnd = x;
}

function btnToRight() {
  clickSound.play();
  field.selectionEnd += 1;
  field.selectionStart = field.selectionEnd;
}

function btnToLeft() {
  clickSound.play();
  field.selectionStart -= 1;
  field.selectionEnd = field.selectionStart;
}

function btnToUp() {
  clickSound.play();
  field.selectionStart = 0;
  field.selectionEnd = field.selectionStart;
}

function btnToDown() {
  clickSound.play();
  field.selectionStart = field.value.length;
}

function typeOnKeyboard(event) {
  const x = field.selectionStart + 1;
  btnValues.forEach((_, i) => {
    if (event.code === btnValues[i].code && event.code === 'Backspace') {
      backspaceBtnFunc(x);
    } else if (event.code === btnValues[i].code && event.code === 'Delete') {
      deleteBtnFunc(x);
    } else if (event.code === btnValues[i].code && event.code === 'ArrowRight') {
      btnToRight();
    } else if (event.code === btnValues[i].code && event.code === 'ArrowLeft') {
      btnToLeft();
    } else if (event.code === btnValues[i].code && event.code === 'ArrowUp') {
      btnToUp();
    } else if (event.code === btnValues[i].code && event.code === 'ArrowDown') {
      btnToDown();
    } else if (event.shiftKey
        && event.code === btnValues[i].code) {
      changeBtnNamesShift();
      shiftBtnFunc(x, i, event);
    } else if (event.code === btnValues[i].code && capsLock === true && event.code !== 'CapsLock') {
      capslockBtnFunc(x, i);
    } else if (event.code === btnValues[i].code && event.code !== 'CapsLock' && !event.shiftKey) {
      if (event.key !== 'Meta' && event.key !== 'Alt' && event.key !== 'Control') {
        regularBtnFunc(x, i);
      }
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
    document.querySelector('h1').remove();
    document.querySelector('h3').remove();
    document.querySelector('p').remove();
    createHeader();
    const buttons = formButtonsArr();
    buttons.forEach((_, i) => {
      changeBtnNamesCaps();
      const mainValue = buttons[i].lastChild;
      mainValue.textContent = btnValues[i].btnName[lang];
      mainValue.classList.add('animated');
      const secondValue = buttons[i].firstChild;
      secondValue.textContent = btnValues[i].secondBtnName[lang];
      secondValue.classList.add('animated');
      mainValue.addEventListener('animationend', () => mainValue.classList.remove('animated'));
      secondValue.addEventListener('animationend', () => secondValue.classList.remove('animated'));
    });

    localStorage.setItem('language', lang);
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
        clickSound.play();
        buttons[i].classList.toggle('activeBtn');
        if (capsLock === false) {
          capsLock = true;
          changeBtnNamesCaps();
        } else {
          capsLock = false;
          changeBtnNamesCaps();
        }
      }
      if (event.code === 'ControlLeft') {
        ctrl = true;
      }
      if (event.code === 'ShiftLeft') {
        leftShift = true;
      } else if (event.code === 'ShiftRight') {
        rightShift = true;
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
    if (event.code === 'ShiftLeft' && leftShift === true) {
      leftShift = false;
      changeBtnNamesShift();
    }
    if (event.code === 'ShiftRight' && rightShift === true) {
      rightShift = false;
      changeBtnNamesShift();
    }
    if (event.code === 'ControlLeft' && ctrl === true) {
      ctrl = false;
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
  clickSound.play();
  if (event.target.classList.contains('cover') && document.activeElement === document.body) {
    field.focus();
  }
  if (event.target.parentNode.classList.contains('btn')
  && document.activeElement === field
  && event.target.parentNode.textContent !== '^Control'
  && event.target.parentNode.textContent !== '⌥Option'
  && event.target.parentNode.textContent !== '⌘Command'
  && event.target.parentNode.textContent !== 'Fn') {
    const x = field.selectionStart + 1;
    const i = btnValues.findIndex((el) => event.target.parentNode.id === el.code);
    event.target.parentNode.classList.add('activeBtn');
    if (event.target.parentNode.textContent === 'DEL') {
      deleteBtnFunc(x);
    } else if (event.target.parentNode.textContent === 'Backspace') {
      backspaceBtnFunc(x);
    } else if (event.target.parentNode.id === 'ArrowRight') {
      btnToRight();
    } else if (event.target.parentNode.id === 'ArrowDown') {
      btnToDown();
    } else if (event.target.parentNode.id === 'ArrowLeft') {
      btnToLeft();
    } else if (event.target.parentNode.id === 'ArrowUp') {
      btnToUp();
    } else if (event.target.parentNode.textContent === 'Caps Lock') {
      clickSound.play();
      if (capsLock === false) {
        capsLock = true;
        event.target.parentNode.classList.add('activeBtn');
      } else {
        capsLock = false;
        event.target.parentNode.classList.remove('activeBtn');
      }
      changeBtnNamesCaps();
    } else if (capsLock === true && event.target.parentNode.textContent !== 'Caps Lock') {
      capslockBtnFunc(x, i);
    } else if (event.shiftKey && event.target.parentNode.textContent !== 'Caps Lock') {
      shiftBtnFunc(x, i, event);
    } else if (capsLock !== true && event.target.parentNode.textContent !== 'Caps Lock') {
      if (event.target.parentNode.id === 'ShiftLeft') {
        leftShift = true;
      } else if (event.target.parentNode.id === 'ShiftRight') {
        rightShift = true;
      }
      changeBtnNamesShift();
      regularBtnFunc(x, i);
    }
  } else if (event.target.parentNode.classList.contains('btn')
  && document.activeElement === field) {
    event.target.parentNode.classList.add('activeBtn');
  }
}

keyboardSection.addEventListener('mousedown', (event) => pushButtonOnVirtualKeyboard(event));
keyboardSection.addEventListener('mouseup', (event) => {
  if (event.target.parentNode.textContent !== 'Caps Lock') {
    event.target.parentNode.classList.remove('activeBtn');
  }
  if (event.target.parentNode.id === 'ShiftLeft' && leftShift === true) {
    leftShift = false;
  } else if (event.target.parentNode.id === 'ShiftRight' && rightShift === true) {
    rightShift = false;
  }
  changeBtnNamesShift();
});
keyboardSection.addEventListener('mouseout', (event) => {
  if (event.target.parentNode.textContent !== 'Caps Lock') {
    event.target.parentNode.classList.remove('activeBtn');
  }
});

// KEYBOARD INTERFACE FUNCTIONALITY END //
