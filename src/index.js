import "./style.css";
import "./assets/fonts/fonts.css";
import Btn from "./scripts/btn_class.js";
import btnValues from "./assets/btn_values.json";
import pawSvg from "./assets/img/icons/paw.svg";
import wofSound from "./assets/sounds/dog-wof.mp3";
import keySound from "./assets/sounds/key-sound.mp3";

// LOCAL STORAGE FUNCTIONALITY START //

const functionalKeys = ["^Control", "⌥Option", "⌘Command", "Fn"];
const btnArr = [];
let lang;
let capsLock = false;
let leftShift = false;
let rightShift = false;
let ctrl = false;

function getLocalStorage() {
  const localValue = localStorage.getItem("language");
  if (localValue === undefined || localValue === null) {
    lang = "en";
    return;
  }
  lang = localValue;
}

window.addEventListener("load", getLocalStorage);

// LOCAL STORAGE FUNCTIONALITY END //

// CREATE A KEYBOARD START //

function createHeader() {
  const header = document.createElement("h1");
  header.style.marginBottom = "0";
  const subhead = document.createElement("h3");
  subhead.style.margin = "0";
  const headerStrikethrough = document.createElement("span");
  headerStrikethrough.style.textDecoration = "line-through";
  const explLine = document.createElement("p");
  explLine.style.margin = "0";
  if (lang === "en") {
    header.textContent = "Virtual keyboard";
    subhead.textContent = " MacOS edition";
    headerStrikethrough.textContent = "Corgi";
    explLine.textContent = "(for change language press Ctrl+Shift)";
    subhead.prepend(headerStrikethrough);
  } else if (lang === "ru") {
    header.textContent = "Виртуальная клавиатура";
    subhead.textContent = " Создана для системы MacOS";
    headerStrikethrough.textContent = "Корги";
    explLine.textContent = "(для смены языка нажмите Ctrl+Shift)";
  }
  document.body.prepend(explLine);
  document.body.prepend(subhead);
  document.body.prepend(header);
}

function addTextField() {
  const field = document.createElement("textarea");
  field.classList.add("textarea");
  field.setAttribute("rows", "12");
  field.setAttribute("autofocus", "");
  return field;
}

const keyboardSection = document.createElement("div");
keyboardSection.classList.add("keyboard");

function formButtonsArr() {
  const buttons = document.querySelectorAll(".btn");
  return buttons;
}

function changeBtnNamesCaps() {
  const buttons = formButtonsArr();
  if (capsLock === true) {
    for (let i = 0; i < buttons.length; i += 1) {
      if (
        btnValues[i].secondBtnName[lang] === "" &&
        btnValues[i].shiftValue[lang] !== ""
      ) {
        const mainValue = buttons[i].lastChild;
        mainValue.textContent = btnValues[i].shiftValue[lang];
      }
    }
    return;
  }
  for (let i = 0; i < buttons.length; i += 1) {
    if (
      btnValues[i].secondBtnName[lang] === "" &&
      btnValues[i].shiftValue[lang] !== ""
    ) {
      const mainValue = buttons[i].lastChild;
      mainValue.textContent = btnValues[i].btnName[lang];
    }
  }
}

function createBtn(num, code, btnName, secondBtnName, value, shiftValue) {
  const button = new Btn(code, btnName, secondBtnName, value, shiftValue);
  btnArr.push(button);
  const el = document.createElement("div");
  const elValue = document.createElement("span");
  elValue.classList.add("btnValue");
  const elSecondValue = document.createElement("span");
  el.classList.add("btn");
  elValue.textContent = button.getName(lang);
  el.setAttribute("id", button.getCode());
  elSecondValue.textContent = button.getSecondName(lang);
  elSecondValue.classList.add("btnSecondValue");
  const btnCover = document.createElement("div");
  btnCover.classList.add("cover");
  el.prepend(btnCover);
  el.prepend(elSecondValue);
  el.append(elValue);
  if (button.getName() === "Caps Lock" && capsLock === true) {
    el.classList.add("activeBtn");
    changeBtnNamesCaps();
  }
  if (el.textContent === "Backspace") {
    el.classList.add("backspace");
  }
  if (el.textContent === "Tab") {
    el.classList.add("tab");
  }
  if (el.textContent === "DEL") {
    el.classList.add("del");
  }
  if (el.textContent === "Caps Lock") {
    el.classList.add("caps");
  }
  if (el.textContent === "Shift" && num === 42) {
    el.classList.add("shift");
    if (leftShift === true && el.id === "ShiftLeft") {
      el.classList.add("activeBtn");
    }
  }
  if (rightShift === true && el.id === "ShiftRight") {
    el.classList.add("activeBtn");
  }
  if (el.textContent === "ENTER") {
    el.classList.add("enter");
  }
  if (el.textContent === "Command" || num === 59 || num === 61) {
    el.classList.add("cmnd");
  }
  if (el.textContent === " ") {
    el.classList.add("space");
  }
  if (el.textContent === functionalKeys[0] && ctrl === true) {
    el.classList.add("activeBtn");
  }
  return el;
}

function fillKeyboard() {
  btnValues.forEach((el, i) => {
    keyboardSection.append(
      createBtn(
        i,
        el.code,
        el.btnName,
        el.secondBtnName,
        el.value,
        el.shiftValue
      )
    );
  });
}

window.addEventListener("load", fillKeyboard);
window.addEventListener("load", createHeader);

document.body.append(addTextField());
document.body.append(keyboardSection);

const paw = document.createElement("img");
paw.classList.add("paw");
paw.src = pawSvg;
paw.setAttribute("alt", " ");
document.body.append(paw);
const pawSound = new Audio(wofSound);
paw.addEventListener("click", () => pawSound.play());

// CREATE A KEYBOARD END //

// KEYBOARD FUNCTIONALITY BY REAL KEYBOARD USING START //

const field = document.querySelector("textarea");
const clickSound = new Audio(keySound);

field.addEventListener("keydown", (event) => event.preventDefault());
field.addEventListener("keyup", (event) => event.preventDefault());

function backspaceBtnFunc(x) {
  clickSound.play();
  if (field.selectionStart === field.selectionEnd) {
    field.value =
      field.value
        .split("")
        .slice(0, field.selectionStart - 1)
        .join("") + field.value.split("").slice(field.selectionStart).join("");
    field.selectionEnd = x - 2;
  } else if (field.selectionStart !== field.selectionEnd) {
    field.value =
      field.value.split("").slice(0, field.selectionStart).join("") +
      field.value.split("").slice(field.selectionEnd).join("");
    field.selectionEnd = x - 1;
  }
}

function deleteBtnFunc(x) {
  clickSound.play();
  if (field.selectionStart === field.selectionEnd) {
    field.value =
      field.value.split("").slice(0, field.selectionStart).join("") +
      field.value
        .split("")
        .slice(field.selectionStart + 1)
        .join("");
    field.selectionEnd = x - 1;
  } else if (field.selectionStart !== field.selectionEnd) {
    field.value =
      field.value.split("").slice(0, field.selectionStart).join("") +
      field.value.split("").slice(field.selectionEnd).join("");
    field.selectionEnd = x - 1;
  }
}

function shiftBtnFunc(x, i, event) {
  clickSound.play();
  if (field.selectionStart !== field.selectionEnd && event.key !== "Shift") {
    field.value =
      field.value.split("").slice(0, field.selectionStart).join("") +
      btnValues[i].shiftValue[lang] +
      field.value.split("").slice(field.selectionEnd).join("");
    field.selectionEnd = x;
  } else if (
    field.selectionStart === field.selectionEnd &&
    event.key !== "Shift"
  ) {
    field.value =
      field.value.split("").slice(0, field.selectionStart).join("") +
      btnValues[i].shiftValue[lang] +
      field.value.split("").slice(field.selectionEnd).join("");
    field.selectionEnd = x;
  }
}

function changeBtnNamesShift() {
  const buttons = formButtonsArr();
  if (leftShift === true || rightShift === true) {
    for (let i = 0; i < buttons.length; i += 1) {
      if (btnValues[i].shiftValue[lang] !== "") {
        const secondValue = buttons[i].firstChild;
        const mainValue = buttons[i].lastChild;
        secondValue.textContent =
          secondValue.textContent === "" ? "" : btnValues[i].btnName[lang];
        mainValue.textContent = btnValues[i].shiftValue[lang];
      }
    }
    return;
  }
  for (let i = 0; i < buttons.length; i += 1) {
    if (btnValues[i].shiftValue[lang] !== "") {
      const secondValue = buttons[i].firstChild;
      const mainValue = buttons[i].lastChild;
      secondValue.textContent =
        secondValue.textContent === "" ? "" : btnValues[i].secondBtnName[lang];
      mainValue.textContent = btnValues[i].btnName[lang];
    }
  }
}

function capsLockBtnFunc(x, i) {
  clickSound.play();
  field.value =
    field.value.split("").slice(0, field.selectionStart).join("") +
    btnValues[i].value[lang].toUpperCase() +
    field.value.split("").slice(field.selectionEnd).join("");
  field.selectionEnd = x;
}

function regularBtnFunc(x, i) {
  clickSound.play();
  field.value =
    field.value.split("").slice(0, field.selectionStart).join("") +
    btnArr[i].getValue(capsLock, lang) +
    field.value.split("").slice(field.selectionEnd).join("");
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

function countPositions() {
  const textInLines = field.value.split("\n");
  const lengthsArr = textInLines.map((el) => el.length);
  const position = field.selectionStart;
  const textBeforeCursor = field.value.substring(0, position);
  const activeLine = textBeforeCursor.split("\n").length - 1;

  const positionsFirstInLine = lengthsArr.reduce((acc, current) => {
    const sum = (acc.length > 0 ? acc[acc.length - 1] : 0) + current + 1;
    return [...acc, sum];
  }, []);

  let positionSymbolInLine =
    position -
    lengthsArr.reduce((acc, val, i) => {
      return i <= activeLine - 1 ? acc + val + 1 : acc;
    }, 0);

  if (positionsFirstInLine.filter((el) => el === position).length) {
    positionSymbolInLine = 0;
  }

  return {
    position,
    lengthsArr,
    activeLine,
    positionSymbolInLine,
  };
}

function btnToUp() {
  clickSound.play();
  const { position, lengthsArr, activeLine, positionSymbolInLine } =
    countPositions();
  let newPosition;

  if (activeLine === 0) {
    newPosition = 0;
  } else if (positionSymbolInLine >= lengthsArr[activeLine - 1]) {
    newPosition =
      lengthsArr.reduce((acc, val, i) => {
        return i <= activeLine - 1 ? acc + val + 1 : acc;
      }, 0) - 1;
  } else if (positionSymbolInLine === 0) {
    newPosition = position - lengthsArr[activeLine - 1] - 1;
  } else {
    newPosition =
      lengthsArr.reduce((acc, val, i) => {
        return i <= activeLine - 2 ? acc + val + 1 : acc;
      }, 0) + positionSymbolInLine;
  }

  field.selectionStart = newPosition;
  field.selectionEnd = field.selectionStart;
}

function btnToDown() {
  clickSound.play();
  const { position, lengthsArr, activeLine, positionSymbolInLine } =
    countPositions();
  let newPosition;

  if (activeLine === lengthsArr.length - 1) {
    newPosition = field.value.length;
  } else if (positionSymbolInLine >= lengthsArr[activeLine + 1]) {
    newPosition =
      lengthsArr.reduce((acc, val, i) => {
        return i <= activeLine + 1 ? acc + val + 1 : acc;
      }, 0) - 1;
  } else if (positionSymbolInLine === 0) {
    newPosition = position + lengthsArr[activeLine] + 1;
  } else {
    newPosition =
      lengthsArr.reduce((acc, val, i) => {
        return i <= activeLine ? acc + val + 1 : acc;
      }, 0) + positionSymbolInLine;
  }

  field.selectionStart = newPosition;
  field.selectionEnd = field.selectionStart;
}

function typeOnKeyboard(event) {
  const x = field.selectionStart + 1;
  for (let i = 0; i < btnValues.length; i += 1) {
    if (event.code === btnValues[i].code && event.code === "Backspace") {
      backspaceBtnFunc(x);
    } else if (event.code === btnValues[i].code && event.code === "Delete") {
      deleteBtnFunc(x);
    } else if (
      event.code === btnValues[i].code &&
      event.code === "ArrowRight"
    ) {
      btnToRight();
    } else if (event.code === btnValues[i].code && event.code === "ArrowLeft") {
      btnToLeft();
    } else if (event.code === btnValues[i].code && event.code === "ArrowUp") {
      btnToUp();
    } else if (event.code === btnValues[i].code && event.code === "ArrowDown") {
      btnToDown();
    } else if (event.shiftKey && event.code === btnValues[i].code) {
      changeBtnNamesShift();
      shiftBtnFunc(x, i, event);
    } else if (
      event.code === btnValues[i].code &&
      capsLock === true &&
      event.code !== "CapsLock"
    ) {
      capsLockBtnFunc(x, i);
    } else if (
      event.code === btnValues[i].code &&
      event.code !== "CapsLock" &&
      !event.shiftKey
    ) {
      if (
        event.key !== "Meta" &&
        event.key !== "Alt" &&
        event.key !== "Control"
      ) {
        regularBtnFunc(x, i);
      }
    }
  }
}

function changeLanguage(event) {
  if (event.ctrlKey && event.shiftKey) {
    if (lang === "en") {
      lang = "ru";
    } else if (lang === "ru") {
      lang = "en";
    }
    document.querySelector("h1").remove();
    document.querySelector("h3").remove();
    document.querySelector("p").remove();
    createHeader();
    const buttons = formButtonsArr();
    for (let i = 0; i < buttons.length; i += 1) {
      changeBtnNamesCaps();
      const mainValue = buttons[i].lastChild;
      mainValue.textContent = btnValues[i].btnName[lang];
      mainValue.classList.add("animated");
      const secondValue = buttons[i].firstChild;
      secondValue.textContent = btnValues[i].secondBtnName[lang];
      secondValue.classList.add("animated");
      mainValue.addEventListener("animationend", () =>
        mainValue.classList.remove("animated")
      );
      secondValue.addEventListener("animationend", () =>
        secondValue.classList.remove("animated")
      );
    }
    localStorage.setItem("language", lang);
  }
}

document.addEventListener("keydown", (event) => {
  const buttons = formButtonsArr();
  if (document.activeElement !== field) {
    field.focus();
  } else if (document.activeElement === field) {
    for (let i = 0; i < buttons.length; i += 1) {
      if (event.code === buttons[i].id && event.code !== "CapsLock") {
        buttons[i].classList.add("activeBtn");
      } else if (event.code === buttons[i].id && event.code === "CapsLock") {
        clickSound.play();
        buttons[i].classList.toggle("activeBtn");
        if (capsLock === false) {
          capsLock = true;
          changeBtnNamesCaps();
        } else {
          capsLock = false;
          changeBtnNamesCaps();
        }
      }
      if (event.code === "ControlLeft") {
        ctrl = true;
      }
      if (event.code === "ShiftLeft") {
        leftShift = true;
      } else if (event.code === "ShiftRight") {
        rightShift = true;
      }
    }
    typeOnKeyboard(event);
  }
  changeLanguage(event);
});

function unpushBtn(event) {
  const buttons = formButtonsArr();
  for (let i = 0; i < buttons.length; i += 1) {
    if (event.code !== "CapsLock") {
      if (capsLock === false) {
        buttons[i].classList.remove("activeBtn");
      } else {
        buttons[i].classList.remove("activeBtn");
        buttons[29].classList.toggle("activeBtn");
      }
    }
    if (event.code === "ShiftLeft" && leftShift === true) {
      leftShift = false;
      changeBtnNamesShift();
    }
    if (event.code === "ShiftRight" && rightShift === true) {
      rightShift = false;
      changeBtnNamesShift();
    }
    if (event.code === "ControlLeft" && ctrl === true) {
      ctrl = false;
    }
  }
}

document.addEventListener("keyup", (event) => {
  unpushBtn(event);
});

// KEYBOARD FUNCTIONALITY BY REAL KEYBOARD USING END //

// KEYBOARD INTERFACE FUNCTIONALITY START //

document.body.onmousedown = (e) => {
  if (document.activeElement === field && e.target.className !== "textarea") {
    e.preventDefault();
  }
};

function pushButtonOnVirtualKeyboard(event) {
  const parentNodeId = event.target.parentNode.id;
  const parentNodeText = event.target.parentNode.textContent;

  if (
    event.target.parentNode.classList.contains("btn") &&
    document.activeElement === field &&
    parentNodeText !== functionalKeys[0] &&
    parentNodeText !== functionalKeys[1] &&
    parentNodeText !== functionalKeys[2] &&
    parentNodeText !== functionalKeys[3]
  ) {
    const x = field.selectionStart + 1;
    const i = btnValues.findIndex((el) => parentNodeId === el.code);
    event.target.parentNode.classList.add("activeBtn");
    if (parentNodeText === "DEL") {
      deleteBtnFunc(x);
    } else if (parentNodeText === "Backspace") {
      backspaceBtnFunc(x);
    } else if (parentNodeId === "ArrowRight") {
      btnToRight();
    } else if (parentNodeId === "ArrowDown") {
      btnToDown();
    } else if (parentNodeId === "ArrowLeft") {
      btnToLeft();
    } else if (parentNodeId === "ArrowUp") {
      btnToUp();
    } else if (parentNodeText === "Caps Lock") {
      clickSound.play();
      if (capsLock === false) {
        capsLock = true;
        event.target.parentNode.classList.add("activeBtn");
      } else {
        capsLock = false;
        event.target.parentNode.classList.remove("activeBtn");
      }
      changeBtnNamesCaps();
    } else if (capsLock === true && parentNodeText !== "Caps Lock") {
      capsLockBtnFunc(x, i);
    } else if (event.shiftKey && parentNodeText !== "Caps Lock") {
      shiftBtnFunc(x, i, event);
    } else if (capsLock !== true && parentNodeText !== "Caps Lock") {
      if (parentNodeId === "ShiftLeft") {
        leftShift = true;
      } else if (parentNodeId === "ShiftRight") {
        rightShift = true;
      }
      changeBtnNamesShift();
      regularBtnFunc(x, i);
    }
  } else if (
    event.target.parentNode.classList.contains("btn") &&
    document.activeElement === field
  ) {
    event.target.parentNode.classList.add("activeBtn");
  }
}

keyboardSection.addEventListener("mousedown", pushButtonOnVirtualKeyboard);
keyboardSection.addEventListener("mouseup", (event) => {
  if (event.target.parentNode.textContent !== "Caps Lock") {
    event.target.parentNode.classList.remove("activeBtn");
  }
  if (event.target.parentNode.id === "ShiftLeft" && leftShift === true) {
    leftShift = false;
  } else if (
    event.target.parentNode.id === "ShiftRight" &&
    rightShift === true
  ) {
    rightShift = false;
  }
  changeBtnNamesShift();
});
keyboardSection.addEventListener("mouseout", (event) => {
  if (event.target.parentNode.textContent !== "Caps Lock") {
    event.target.parentNode.classList.remove("activeBtn");
  }
});

// KEYBOARD INTERFACE FUNCTIONALITY END //
