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
  // field.disabled = 'false';
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
  // document.addEventListener('keydown', (event) => {
  //   if (event.code === button.getCode()) {
  //     console.log(event.code);
  //     console.log(button.getCode());
  //     el.classList.add('activeBtn');
  //   }
  // });
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
  const x = field.selectionStart + 1;
  btnValues.forEach((_, i) => {
    if (event.code === btnValues[i].code && event.code === 'Backspace') {
      if (field.selectionStart === field.textLength) {
        // console.log(1);
        field.value = field.value.split('').slice(0, field.selectionStart - 1).join('') + field.value.split('').slice(field.selectionStart).join('');
        field.selectionEnd = x - 1;
      } else if (field.selectionStart !== field.textLength
        && field.selectionStart === field.selectionEnd) {
        // console.log(2);
        field.value = field.value.split('').slice(0, field.selectionStart - 1).join('') + field.value.split('').slice(field.selectionStart).join('');
        field.selectionEnd = x - 2;
      } else if (field.selectionStart !== field.textLength
        && field.selectionStart !== field.selectionEnd) {
        field.value = field.value.split('').slice(0, field.selectionStart).join('') + field.value.split('').slice(field.selectionEnd).join('');
        field.selectionEnd = x - 1;
      }
    } else if (event.code === btnValues[i].code && event.code === 'Delete') {
      if (field.selectionStart !== field.textLength
        && field.selectionStart === field.selectionEnd) {
        // console.log(3);
        field.value = field.value.split('').slice(0, field.selectionStart).join('') + field.value.split('').slice(field.selectionStart + 1).join('');
        field.selectionEnd = x - 1;
      } else if (field.selectionStart !== field.textLength
        && field.selectionStart !== field.selectionEnd) {
        // console.log(4);
        field.value = field.value.split('').slice(0, field.selectionStart).join('') + field.value.split('').slice(field.selectionEnd).join('');
        field.selectionEnd = x - 1;
      }
    } else if (event.shiftKey && event.code === btnValues[i].code) {
      if (field.selectionEnd === field.textLength) {
        // console.log(event.key);
        // console.log(5);
        field.value += btnValues[i].shiftValue[lang];
      } else if (field.selectionEnd !== field.textLength
        && field.selectionStart !== field.selectionEnd
        && event.key !== 'Shift') {
        // console.log(6);
        field.value = field.value.split('').slice(0, field.selectionStart).join('') + btnValues[i].shiftValue[lang] + field.value.split('').slice(field.selectionEnd).join('');
        field.selectionEnd = x;
        // }
      } else if (field.selectionEnd !== field.textLength
        && field.selectionStart === field.selectionEnd && event.key !== 'Shift') {
        // console.log(7);
        field.value = field.value.split('').slice(0, field.selectionStart).join('') + btnValues[i].shiftValue[lang] + field.value.split('').slice(field.selectionEnd).join('');
        field.selectionEnd = x;
      }
    } else if (event.code === btnValues[i].code && capsLock === true) {
      if (field.selectionStart === field.textLength && event.key !== 'Shift') {
        field.value += btnValues[i].value[lang].toUpperCase();
      } else if (field.selectionStart !== field.textLength) {
        console.log(event.code);
        if (event.code !== 'CapsLock') {
          // console.log(8);
          field.value = field.value.split('').slice(0, field.selectionStart).join('') + btnValues[i].value[lang].toUpperCase() + field.value.split('').slice(field.selectionEnd).join('');
          field.selectionEnd = x;
        }
      }
    } else if (event.code === btnValues[i].code) {
      if (field.selectionStart === field.textLength) {
        field.value += btnValues[i].value[lang];
      } else if (field.selectionStart !== field.textLength) {
        if (event.code !== 'CapsLock' && !event.shiftKey) {
          // console.log(5);
          field.value = field.value.split('').slice(0, field.selectionStart).join('') + btnValues[i].value[lang] + field.value.split('').slice(field.selectionEnd).join('');
          field.selectionEnd = x;
        }
      }
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
    } else if (lang === 'ru') {
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
  // console.log(event);
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
  } else if (document.activeElement !== field && event.code === 'ShiftLeft' && event.key === 'Control') {
    buttons[42].classList.add('activeBtn');
    buttons[57].classList.add('activeBtn');
  } else if (document.activeElement !== field && event.code === 'ShiftLeft') {
    buttons[42].classList.add('activeBtn');
  } else if (document.activeElement !== field && event.code === 'ShiftRight') {
    buttons[55].classList.add('activeBtn');
  } else if (document.activeElement !== field && event.key === 'Control') {
    buttons[57].classList.add('activeBtn');
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
    event.target.classList.add('activeBtn');
    if (event.target.textContent === 'DEL') {
      if (field.selectionStart === field.selectionEnd) {
        const x = field.selectionStart;
        field.value = field.value.split('').slice(0, field.selectionStart).join('') + field.value.split('').slice(field.selectionStart + 1).join('');
        field.selectionEnd = x;
      } else if (field.selectionStart !== field.selectionEnd) {
        const x = field.selectionStart;
        field.value = field.value.split('').slice(0, field.selectionStart).join('') + field.value.split('').slice(field.selectionEnd - 1).join('');
        field.selectionEnd = x;
      }
    }
  }
}

document.addEventListener('mousedown', (event) => pushButton(event));
// document.addEventListener('pointerdown', (event) => pushButton(event));
document.addEventListener('mouseup', (event) => {
  event.target.classList.remove('activeBtn');
});
// document.addEventListener('touchend', (event) => {
//   event.target.classList.remove('activeBtn');
// });

// KEYBOARD INTERFACE FUNCTIONALITY END //
