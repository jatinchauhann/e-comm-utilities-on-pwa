
import * as idb from 'idb';

const CART_STORE = 'cart';
const RW = 'readwrite';

export default class IDBStorage {

  constructor(id = 'mfs-cart-items') {
    this._id = id;
    this._open();
  }

  /* Takes an array of items and writes JSON to local storage */
  save(items) {
    return this._dbPromise.then(db => {
      const tx = db.transaction(CART_STORE, RW);
      const store = tx.objectStore(CART_STORE);
      return store.clear().then(() => {
        const addAll = items.map((item) => {
          return store.add({sku: (item.sku), qty: (item.qty)});
        });
        return Promise.all(addAll);
      }).then(() => {
        return tx.complete;
      });
    });
  }

  load() {
    return this._dbPromise.then(db => {
      return db.transaction(CART_STORE, RW)
        .objectStore(CART_STORE)
        .getAll();
    });
  }

  delete() {
//    localStorage.removeItem(this._id);
  }

  // Returns a promise with the total number of records saved
  count() {
    return this._dbPromise.then(db => {
      const tx = db.transaction(CART_STORE);
      return tx.objectStore(CART_STORE).count();
    });
  }

  // Testing use only, will close the dabase but renders the adaptor unusable
  _close() {
    return this._dbPromise.then(db => {
      let closePromise = db.close();
      this._dbPromise = null;
      return closePromise;
    });
  }

  _open() {
    return this._dbPromise = idb.open(this._id, 1, upgradeDB => {
      upgradeDB.createObjectStore(CART_STORE, {autoIncrement: true});
    });
  }

  // testing hooks so we can test w/o wrecking the stored data
  set key(value) {
    if (value === this._id) return;
    this._close().then(() => {
      this._id = value;
      this._open();
    });
  }

  get key() {
    return this._id;
  }

  get storage() {
    return this._dbPromise;
  }
}
