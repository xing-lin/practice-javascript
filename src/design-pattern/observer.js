/**
 * 观察者模式(发布-订阅模式)：它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时,所有依赖于它的对象都将得到通知。
 * 在JavaScript开发中，我们一般用事件模型来替代传统的发布-订阅模式。
 */

// DOM事件

// document.body.addEventListener("click", function () {
//   console.log("body click");
// });

// document.body.click();

const salesOffices = {
  clientList: {},
  listen: function (key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = [];
    }
    this.clientList[key].push(fn);
  },
  trigger() {
    const key = Array.prototype.shift.call(arguments),
      fns = this.clientList[key];
    if (!fns || fns.length === 0) {
      return false;
    }
    for (let i = 0, fn; (fn = fns[i++]); ) {
      fn.apply(this, arguments);
    }
  },
};

salesOffices.listen("squareMeter88", function (price) {
  console.log("价格->" + price);
});

// salesOffices.listen(function (price, squareMeter) {
//   console.log("价格= " + price);
//   console.log("squareMeter= " + squareMeter);
// });

salesOffices.trigger("squareMeter88", 200000);
salesOffices.trigger("squareMeter100", 200000);
