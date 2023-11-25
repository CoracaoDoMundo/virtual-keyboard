export default class Btn {
  constructor(code, btnName, secondBtnName, value, shiftValue) {
    this.code = code;
    this.btnName = btnName;
    this.secondBtnName = secondBtnName;
    this.value = value;
    this.shiftValue = shiftValue;
  }

  getCode() {
    return this.code;
  }

  getName(lang) {
    if (lang === "en") {
      return this.btnName.en;
    }
    return this.btnName.ru;
  }

  getValue(caps, lang) {
    if (caps === true && lang === "ru") {
      return this.shiftValue.ru;
    }
    if (caps === false && lang === "ru") {
      return this.value.ru;
    }
    if (caps === true && lang === "en") {
      return this.shiftValue.en;
    }
    return this.value.en;
  }

  getSecondName(lang) {
    if (lang === "en") {
      return this.secondBtnName.en;
    }
    return this.secondBtnName.ru;
  }
}
