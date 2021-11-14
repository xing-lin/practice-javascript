class Observer {
  constructor(data) {
    this.data = data;
    this.walk(data);
  }
  walk(data) {
    if (!data || typeof data !== "object") {
      return;
    }
    Object.keys(data).forEach((key) => {
      this.definedReactive(data, key, data[key]);
      this.walk(data[key]);
    });
  }
  definedReactive(data, key, value) {
    const self = this;
    const dep = new Dep();
    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: true,
      get() {
        Dep.target && dep.addSubs(Dep.target);
        return value;
      },
      set(newValue) {
        if (value === newValue) {
          return;
        }
        value = newValue;
        self.walk(newValue);
        dep.notify();
      },
    });
  }
}
