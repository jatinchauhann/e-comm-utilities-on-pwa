
export default class LocalStorage {
  constructor(id = 'mfs-cart-items') {
    this._id = id;
  }

  /* Takes an array of items and writes JSON to local storage */
  save(items) {
    return new Promise(resolve => {
      let json = JSON.stringify(items);
      localStorage[this._id] = json;
      resolve(items);
    });
  }

  load() {
    return new Promise(resolve => {
      let json = localStorage[this._id];
      if (!json) {
        return [];
      }
      resolve(JSON.parse(json));
    });
  }

  delete() {
    localStorage.removeItem(this._id);
  }

  // testing hooks so we can test w/o wrecking the stored data
  set key(value) {
    this._id = value;
  }

  get key() {
    return this._id;
  }
}
