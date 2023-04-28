export default class Btn {
  constructor(code, /* key, */ value, secondValue) {
    this.code = code;
    // this.key = key;
    this.value = value;
    this.secondValue = secondValue;
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

  getValue() {
    return this.value;
  }

  setSecondValue(secondValue) {
    this.secondValue = secondValue;
  }

  getSecondValue() {
    return this.secondValue;
  }
}
