"use strict";

const obj1 = { name: "张三" };
const obj2 = { name: "李四", age: 18 };

// 将obj2对象设置为obj1对象的原型
Object.setPrototypeOf(obj1, obj2);

// 自身的属性
console.log(obj1.name); //张三
// 自身的属性找不到，向原型中寻找age属性
console.log(obj1.age); // 18
console.log(obj1.__proto__.name); //李四

/**
 * 通过原型方法创建对象实例
 */

function User() {}

User.prototype.getName = function () {
  return "张三";
};

const value = User(); // undefined
const uInstance = new User();
console.log(uInstance); // {}
console.log(uInstance.getName());
// 每一个构造函数都有一个原型对象，原型对象上的constructor都指向它本身
console.log(User.prototype.constructor === User); // true

console.log(uInstance.__proto__ === User.prototype);
// 此时uInstance.constructor调用的是User.prototype上的constructor，指向User本身
console.log(uInstance.constructor === User); // true

function User() {
  this.isFirst = true;
  this.getFirst = function () {
    return this.isFirst;
  };
}

User.prototype.getFirst = function () {
  return !this.isFirst;
};

const u = new User();
// new实例后的u，自身已经有了getFirst方法，则优先执行自身的
console.log(u.getFirst()); // true
function Ninja() {
  this.swung = true;
}
const ninja1 = new Ninja();
// 在实例对象创建完成之后，在原型上添加一个方法
Ninja.prototype.swingSword = function () {
  return this.swung;
};
console.log(ninja1.swingSword()); // true
Ninja.prototype = {
  pierce: function () {
    return true;
  },
};
// 尽管使用字面量覆盖了prototype，但是实例化后的Ninja对象仍然具有swingSword方法
// 因为对象ninja1仍然保持着对旧的Ninja原型的引用，所以ninja1访问不到新的字面量上的pierce
console.log(ninja1.swingSword()); // true
console.log(ninja1.pierce); // undefined

const ninja2 = new Ninja();

console.log(ninja2.swingSword); // undefined

function Ninja() {}

const ninja = new Ninja();
const ninja2 = new ninja.constructor();
// instanceof操作符用于检测对象是否是某构造函数的实例。
console.log(ninja2 instanceof Ninja); // true

/**
 * 原型继承
 */
// 这不是真正的继承，仅仅是复制
function Person() {}
Person.prototype.dance = function () {};

function Ninja() {}
Ninja.prototype = { dance: Person.prototype.dance };

const ninja = new Ninja();
console.log(ninja instanceof Person); // false
console.log(ninja.dance);

// 真正基于原型继承
function Person() {}
Person.prototype.dance = function () {};

function Ninja() {}
Ninja.prototype = new Person();

const ninja1 = new Ninja();
console.log(ninja1.constructor === Ninja);

console.log(ninja1 instanceof Person); //true
// 直接指向Person，需要修正constructor指向
console.log(ninja1.constructor === Person); // true

Ninja.prototype.constructor = Ninja;
for (const p in Ninja.prototype) {
  console.log(p); // dance
}

/**
 * ES5写法
 */

function Warrior(weapon) {
  this.weapon = weapon;
}
Warrior.prototype.wield = function () {
  return "Wielding" + this.weapon;
};
Warrior.duel = function (warrior1, warrior2) {
  return warrior1.wield() + " " + warrior2.wield();
};

/**
 * ES6写法
 */

class Warrior {
  constructor(weapon) {
    this.weapon = weapon;
  }
  wield() {
    return "Wielding" + this.weapon;
  }
  static duel(warrior1, warrior2) {
    return warrior1.wield() + " " + warrior2.wield();
  }
}
