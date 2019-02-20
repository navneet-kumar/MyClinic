export default class Settings {
  key: string;
  value: string;

  constructor(key, value) {
    this.key = key;
    this.value = JSON.stringify(value);
  }

  getKey() {
    return this.key ? this.key : null;
  }

  getValue() {
    return this.value ? JSON.parse(this.value) : null;
  }
}
