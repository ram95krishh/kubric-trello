class LocalStorageMock {
  constructor() {
    this.store = {
      authUser: JSON.stringify({
        uid: '1234567890',
        email: 'abc@xyz.com',
        displayName: 'Tester',
      }),
    };
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

window.localStorage = new LocalStorageMock();

global.window.localStorage = new LocalStorageMock();

global.externalLibrary = {
};
