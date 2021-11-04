/**
 * 代理模式：为一个对象提供一个代用品或占位符，以便控制对它的访问
 * 
 * 特点：
 *      代理对象可预先处理请求，再决定是否转交给本体
 *      代理和本体对外显示接口保持一致性
 *      代理对象仅对本体做一次包装
 */

class Flower {
  constructor(name) {
    this.name = name;
  }
}

// 张三送花，不使用代理直接送花
const zhangsan = {
  sendFlower(target) {
    const flower = new Flower("玫瑰花");
    target.receiveFlower(flower);
  },
};

const A = {
  receiveFlower(flower) {
    console.log("收到花：" + flower.name);
  },
  listenGoodMood: function (fn) {
    setTimeout(function () {
      fn();
    }, 10000);
  },
};

// 代理B可以帮助A过滤掉一些请求
const B = {
  receiveFlower(flower) {
    A.listenGoodMood(function () {
      A.receiveFlower(flower);
    });
  },
};

zhangsan.sendFlower(B);
