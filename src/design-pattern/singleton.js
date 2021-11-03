/**
 * 单例模式的定义：保证一个类仅有一个实例，并提供一个访问它的全局访问点。
 */

/**
 * 标准的单例模式：用一个变量来标志当前是否已经为某个类创建过对象，如果是，则在下一次获取该类的实例时，直接返回之前创建的对象
 *
 * 问题：增加Singleton这个类的不透明性，使用者必须知道这是一个单例类，且需要通过Singleton.getInstance来调用
 *
 *
 */
const Singleton = function (name) {
  this.name = name;
};

Singleton.prototype.getName = function () {
  return this.name;
};

Singleton.getInstance = (function () {
  var instance = null;
  return function () {
    if (!instance) {
      instance = new Singleton(this.name);
    }
    return instance;
  };
})();

// const a = Singleton.getInstance("a");
// const b = Singleton.getInstance("b");
// console.log(a === b);

/**
 * 透明的单例模式（跟其他任何普通类一样，使用new来初始化）
 * 问题：不合符单一职责原则，构造函数SingletonTransparency既要保证只有一个实例，又要执行初始化的动作
 */
const SingletonTransparencyWrapper = (function () {
  let instance;
  const SingletonTransparency = function (name) {
    if (instance) {
      return instance;
    }
    this.name = name;
    return (instance = this);
  };
  SingletonTransparency.prototype.getName = function () {
    return this.name;
  };
  return SingletonTransparency;
})();

// const a = new SingletonTransparencyWrapper("zhangsan");
// const b = new SingletonTransparencyWrapper("lisi");
// const c = SingletonTransparencyWrapper();
// console.log(a === c); // true
// console.log(a.getName());  //zhangsan
// console.log(b.getName());  //zhangsan
// console.log(c.getName());  //zhangsan

/**
 * 代理实现单例模式
 */

const SingletonPerson = function (name) {
  this.name = name;
};

SingletonPerson.prototype.getName = function () {
  return this.name;
};

const SingleProxy = (function () {
  let instance;
  return function (name) {
    if (!instance) {
      instance = new SingletonPerson(name);
    }
    return instance;
  };
})();

// const a = new SingleProxy("zhangsan");
// const b = new SingleProxy("lisi");

// console.log(a === b);

/**
 * 以上三种单例模式的实现，更多的是接近传统面向对象语言的实现，单例对象从"类"中创建而来。
 * 但JavaScript其实是一门无类（class-free）语言，也正因为如此，生搬单例模式的概念并无意义。
 * 在JavaScript中创建对象的方法非常简单，既然我们只需要一个“唯一”的对象，为什么要为它先创建一个“类”呢？这无异于穿棉衣洗澡，传统的单例模式实现在JavaScript中并不适用
 */
// 1. 使用命名空间
const namespace1 = {
  a: function () {
    console.log(123);
  },
  b: function () {
    console.log(234);
  },
};

// 2. 使用闭包封装私有变量
const user = (function () {
  const _name = "sven";
  return {
    getUserInfo: function () {
      return _name;
    },
  };
})();

// 惰性单例：在需要的时候才创建对象单例

// const createLoginLayer = (function () {
//   let div;
//   return function () {
//     if (!div) {
//       div = document.createElement("div");
//       div.innerHTML = "我是登录浮窗";
//       div.style.display = "none";
//       document.body.appendChild(div);
//     }
//     return div;
//   };
// })();

const getSingle = function (fn) {
  let result;
  return function () {
    return result || (result = fn.applay(this, arguments));
  };
};

const createLoginLayer = function () {
  let div;
  div = document.createElement("div");
  div.innerHTML = "我是登录浮窗";
  div.style.display = "none";
  document.body.appendChild(div);
  return div;
};

const createSingleLoginLayer = getSingle(createLoginLayer);
