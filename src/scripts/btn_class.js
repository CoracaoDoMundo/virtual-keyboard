export default class Btn {
  constructor(code, btnName, value, secondBtnName) {
    this.code = code;
    this.btnName = btnName;
    this.value = value;
    this.secondBtnName = secondBtnName;
  }

  getCode() {
    return this.code;
  }

  //   getKey() {
  //     return this.key;
  //   }

  setValue(value) {
    this.value = value;
  }

  getName() {
    return this.btnName;
  }

  getValue() {
    return this.value;
  }

  setSecondBtnName(secondBtnName) {
    this.secondBtnName = secondBtnName;
  }

  getSecondName() {
    return this.secondBtnName;
  }
}
