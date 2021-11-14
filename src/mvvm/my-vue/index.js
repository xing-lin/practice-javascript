class Vue {
  constructor(options = {}) {
    this.$el = options.el;
    this.$data = options.data;
    this.$methods = options.methods;

    // 数据劫持
    new Observer(this.$data);

    this.proxy(this.$data);
    this.proxy(this.$methods);

    if (this.$el) {
      new Compile(this.$el, this);
    }
    // console.log(this)
  }
  proxy(data) {
    Object.keys(data).forEach((key) => {
      Object.defineProperty(this, key, {
        configurable: true,
        enumerable: true,
        get() {
          return data[key];
        },
        set(newValue) {
          if (data[key] === newValue) {
            return;
          }
          data[key] = newValue;
        },
      });
    });
  }
}
