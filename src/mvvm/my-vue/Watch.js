class Watch {
  constructor(vm, expr, cb) {
    this.vm = vm;
    this.expr = expr;
    this.cb = cb;

    Dep.target = this;

    this.oldValue = this.getVMValue(vm, expr);
    Dep.target = null;
  }
  update() {
    const oldValue = this.oldValue;
    const newValue = this.getVMValue(this.vm, this.expr);
    if (oldValue != newValue) {
      this.cb(newValue, oldValue);
    }
  }
  getVMValue(vm, expr) {
    let data = vm.$data;
    expr.split(".").forEach((key) => {
      data = data[key];
    });
    return data;
  }
}

// Dep对象用于管理所有的订阅者和通知这些订阅者
class Dep {
  constructor() {
    // 用于管理订阅者
    this.subs = [];
  }
  // 添加订阅者
  addSubs(watcher) {
    this.subs.push(watcher);
  }
  // 通知
  notify() {
    this.subs.forEach((watcher) => {
      watcher.update();
    });
  }
}
