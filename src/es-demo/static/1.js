// var -> variable
// 使用var会污染全局变量
// var a = 5;
// console.log(window.a);
// delete a;
// console.log(a);

// b = 6;
// console.log(window.b);
// delete b;
// console.log(b);

// 1. 有var跟没var声明有什么区别,
// var 声明的是变量，
// 没有var相当于在全局变量上声明一个属性
// 使用delete，delete用于对象的属性

// 2. window对象在浏览器中两重身份，一个是ECMAScript中的Global对象，另一个就是浏览器窗口的JavaScript接口

// console.log(window === globalThis);

// 3. 不属于全局变量
// let a = 5;
// console.log(window.a);

// 4. 不允许重复声明
// var a = 5;
// var a = 6;
// let a = 5;
// let a = 6;
// console.log(a);

// 5. 不存在变量提升

// console.log(a);
// var a = 5;

// var a;
// console.log(a);
// a = 5;

// console.log(a);
// let a = 5;

// 暂时性死区

// var a = 5;
// if (true) {
//   a = 6;
//   let a;
// }

// console.log(a);
// 大括号会形成一个封闭的作用域，在声明之前使用
// 隐蔽的暂时性死区
// function foo(a = 2, b = a) {
//   console.log(a, b);
// }

// var当中没有块级作用域

// {
//   let a = 1;
//   var b = 2;
// }
// console.log(a);
// console.log(b);

// for (var i = 0; i < 3; i++) {
//   console.log(i);
// }
// for (let i = 0; i < 3; i++) {
//   console.log(i);
// }
// console.log(i);

// if (false) {
//   var a = 5;
// }
// console.log(a);

// if (false) {
//   let a = 5;
// }
// console.log(a);

// if (true) var a = 5;
// console.log(a);
// if (true) let a = 5;

// 面试题
// 闭包，有一个外部函数，里面有个内部函数，内部函数调用外部函数的变量，保证外部函数的变量不被释放
// for (var i = 0; i < 5; i++) {
//   (function (j) {
//     setTimeout(function () {
//       console.log(j);
//     });
//   })(i);
// }

// for (let i = 0; i < 3; i++) {
//   setTimeout(function () {
//     console.log(i);
//   });
// }

// const
// var obj = {};

// Object.defineProperty(obj, "a", {
//   value: {
//     PI: 3.14,
//   },
//   writable: false,
// });

// console.log(obj);

// Object.defineProperty(window, "PI", {
//   value: 3.14,
//   writable: false,
// });
// PI = 3.15
// console.log(PI);

// const a = 5;

// const obj = {
//   name: "张三",
//   age: 18,
//   code: {
//     fontend: "JavaScript",
//     backend: "Java",
//   },
// };
// obj.code.backend = "Python";
// Object.freeze(obj);
// obj.age = 19;

// console.log(obj);
// 基本数据类型的值是直接存储在栈内存里
// 引用数据类型的值是存在堆内存里，栈内存存储的是引用地址
// 变量所指向的内存地址不改动

// 解构赋值
// const arr = [1, 2, 3];

// const a = arr[0];
// const b = arr[1];
// const c = arr[2];

// 数组
// const [a, b, c] = [1, 2, [3, 4]];

// console.log(a, b, c);

// 对象
// const user = {
//   name: "张三",
//   age: 18,
//   team: {
//     teamName: "团队",
//     role: "manager",
//   },
// };
// const {
//  // 重命名
//   name: uName,
//   age,
//  // 二次解构
//   team: { teamName, role },
// } = user;

// console.log(uName, age, teamName, role);
// console.log(team);
// 字符串解构
// const [a, b, c] = "zhangsan";
// console.log(a, b, c);

// 数组的遍历方式
// ES5
/**
 * for循环
 * forEach():没有返回值，只是针对每个元素调用func
 * map(): 返回新的Array，每个元素为调用func的结果
 * filter():返回符合func条件的元素数组
 * some(): 返回boolean，判断是否有元素是否符合func条件
 * every(): 返回boolean，判断每个元素是否符合func条件
 * reduce(): 接收一个函数作为累加器
 * for in
 */

// const arr = [1, 2, 3, 4, 5];

// for (let index = 0; index < arr.length; index++) {
//   const element = arr[index];
// }

// forEach不支持 break 和 continue，for支持
// arr.forEach((element) => {});

// 数组中最大值
// const max = arr.reduce((pre, cur) => {
//   console.log(pre, cur);
//   return Math.max(pre, cur);
// });

// 数组扁平
// const arr = [
//   [0, 1],
//   [2, 3, 4],
//   [5, 6],
// ];

// const res = arr.reduce((pre, cur) => {
//   return pre.concat(cur);
// }, []);

// console.log(res);

// 数组去重
// const arr = [1, 2, 3, 2, 3, 4, 5, 1];

// const res = arr.reduce((pre, cur) => {
//   !pre.includes(cur) && pre.push(cur);
//   return pre;
// }, []);

// console.log(res);

// for in  会遍历原型链prototype上的属性
// const arr = [1, 2, 3];
// Array.prototype.foo = () => {
//   console.log("foo");
// };

// for (let i in arr) {
//   console.log(i, arr[i]);
// }

/**
 * ES6 遍历数组
 * find(): 返回第一个通过测试的元素
 * findIndex(): 返回的值为该通过第一个元素的索引
 * for of
 * values()
 * keys()
 * entries()
 */

// const arr = [1, 2, 3, 2];
// Array.prototype.foo = () => {
//   console.log("foo");
// };

// for (const value of arr) {
//   console.log(value);
// }

// for (const value of arr.values()) {
//   console.log(value);
// }
// for (const value of arr.keys()) {
//   console.log(value);
// }
// for (const [index, value] of arr.entries()) {
//   console.log(index, value);
// }

// 伪数组/类数组
// const divs = document.getElementsByName("div");

// console.log(divs instanceof Array);

// function foo() {
//   console.log(arguments instanceof Array);
//   for (let i = 0; i < arguments.length; i++) {
//     console.log(arguments[i]);
//   }
// }

// foo(1, true, "zhangsan");]

// const arrLike = {
//   0: "es5",
//   1: "es6",
//   2: "es7",
//   3: "es8",
//   length: 4,
// };

// for (let i = 0; i < arrLike.length; i++) {
//   console.log(arrLike[i]);
// }
// // const arrReal = Array.prototype.slice.call(arrLike);

// 将set类型转换成array类型，set去重
// const arrReal = Array.from(arrLike);

// console.log(arrLike, arrReal);

// const arr = new Array(1, 2);
// const arr1 = new Array(3);

// console.log(arr, arr1);

// const arr = Array.of(3);

// console.log(arr);

// copyWithin

// const arr = [1, 2, 3, 4, 5];

// const res = arr.copyWithin(1, 3);

// const arr = new Array(5).fill(7)

// fill静默忽略超出数组边界、零长度及方向相反的索引范围
// const arr = [1, 2, 3, 4, 5];
// arr.fill("zhangsan", -1, 3);

// console.log(arr);

// const arr = [1, 2, 3, 4, 5, NaN];
// isNaN
// console.log(arr.includes(NaN));
// console.log(arr.indexOf(NaN)); //不能检测到NaN

/**
 * 函数的参数
 */

// es5
// function foo(x, x, y) {
//   y = y || " world";
//   console.log(x + y);
// }

// foo("Hello", 0);

// es6
// 函数默认值好处：1.代码精简，2.利于代码阅读 3.函数参数不能重名
// function foo(x, y = "world") {
//   let x = 1;
//   console.log(x + " " + y);
// }
// function foo(x, x, y = "world") {
//   console.log(x + " " + y);
// }

// foo("Hello", 0);

// foo.length -> 返回没有指定默认值的参数的个数

// 函数参数的作用域

// const x = 1;
// function foo(x, y = x) {
//   console.log(x, y);
// }
// foo(2);

// const x = 1;
// function foo(y = x) {
//   const x = 3;
//   console.log(x, y);
// }
// foo();

// function foo(y = x) {
//   const x = 3;
//   console.log(x, y);
// }
// foo();

// 函数的name属性

// function foo() {}

// console.log(foo.name);

// console.log(new Function().name);

// const a = function () {}.name;
// console.log(a === "");

// var a = function () {};
// console.log(a.name);

// function foo() {}
// console.log(foo.bind().name);

// console.log(new Function().bind().name);

/**
 * 扩展运算符，rest
 * 得再查查
 */

// 两数组合并
// const arr1 = [1, 2, 3];
// const arr2 = [4, 5, 6];

// const arr = [...arr1,...arr2];
// const arr = arr1.concat(arr2);
// Array.prototype.push.apply(arr1, arr2);
// arr1.push(...arr2);

// console.log(arr1);t

// function foo(a, b, ...rest) {}

/**
 * 箭头函数
 * this指向定义时所在的对象，而不是调用时所在的对象
 * 不可以当作构造函数
 * 不可以使用arguments对象
 */

// const btn = document.querySelector("#btn");
// btn.addEventListener("click", function () {
//   setTimeout(function () {
//     console.log(this);
//   }, 1000);
// });

/**
 * 对象的扩展
 */

// 1. 属性简洁表示法
// const userName = "张三";
// const a = {
//   userName,
// };

// console.log(a);

// 2. 属性名表达式
// const variable = "userName";
// const a = {
//   [variable]: "李四",
//   say() {
//     console.log(this[variable] + " say hi");
//   },
// };

// console.log(a);
// a.say();

// 3. Object.is() 判断两个值是否为同一个值
// 与==不同，==会强制转换两边的值，Object.is不会
// 与===不同，===将+0和-0视为相等，将NaN和NaN视为不相等
// console.log(Object.is(0, ""));
// console.log(Object.is("1", 1));
// console.log(Object.is(+0, -0)); //false
// console.log(Object.is(NaN, NaN)); //true
// console.log(Object.is({ userName: "张三" }, { userName: "张三" }));

// 4. 扩展运算符与Object.assign()

// 5. in
// const a = {
//   userName: "张三",
// };

// console.log("name" in a);

// 数组是下标
// const arr = [1, 2, 3];

// console.log(3 in arr);

// 6. 对象的遍历方式
// const obj = {
//   name: "zhangsan",
//   age: 18,
//   gender: "man",
// };
// for (const key in obj) {
//   console.log(key, obj[key]);
// }

// Object.keys(obj).forEach((key) => {
//   console.log(key, obj[key]);
// });

// Object.getOwnPropertyNames(obj).forEach((key) => {
//   console.log(key, obj[key]);
// });

// Reflect.ownKeys(obj).forEach((key) => {
//   console.log(key, obj[key]);
// });

/**
 * 深拷贝和浅拷贝
 * 
Object.assign 浅拷贝
JSON.stringify  深拷贝
自己实现一个深拷贝
 */

/**
 * class
 */

// function Player(name, age) {
//   this.name = name;
//   this.age = age;
// }

// const p1 = new Player("张三", 18);

// console.log(p1.constructor);

// 工厂模式
// 缺点：不知道对象的类型
// function Person(name, age) {
//   const person = new Object();
//   person.name = name;
//   person.age = age;
//   return person;
// }
// const p1 = Person("zhangsan", 18);

// 构造函数
// 缺点：构造函数的方法每被new一次都要开辟一块内存空间，为什么我知道每被new一次，方法内都要开辟一块新的内存空间
// p1.code === p2.code
// function Person(name, age) {
//   this.name = name;
//   this.age = age;
//   this.code = function () {
//     console.log(this.name + " is coding");
//   };
// }
// // new做了什么？
// const p1 = new Person("zhangsan", 18);
// const p2 = new Person("lisi", 18);
// p1.code();
// console.log(p1.code === p2.code);
// console.log(p1, p1.constructor);

// 原型

// function Person(name, age) {
//   this.name = name;
//   this.age = age;
// }
// Person.prototype.code = function () {
//   console.log(this.name + " is coding");
// };

// const p1 = new Person("zhangsan", 18);
// const p2 = new Person("lisi", 18);

// console.log(p1.code === p2.code,p1,p2);

// function Person(name, age) {
//   // 实例属性
//   this.name = name;
//   this.age = age;
// }
// // 静态属性
// Person.count = 0;

// // 实例方法
// Person.prototype.showName = function () {
//   console.log(this.name);
// };

// 在es5中实现类
// function Person(name, age) {
//   this.name = name;
//   this.age = age;
//   Person.count++;
//   // 构造函数的方法每被new一次都要开辟一块内存空间
//   // this.showName = function(){
//   // }
// }

// Person.count = 0;
// Person.getCount = function () {
//   console.log(Person.count);
// };

// Person.prototype.showName = function () {
//   console.log(this.name);
// };

// const p1 = new Person("zhangsan", 18);
// const p2 = new Person("lisi", 19);

// console.log(Person.count);
// Person.getCount();

// es5继承

// 组合式继承
// function Animal(name) {
//   this.name = name;
// }
// Animal.prototype.showName = function () {
//   console.log(this.name);
// };

// function Dog(name, color) {
//   Animal.call(this, name);
//   this.color = color;
// }
// Dog.prototype = new Animal();
// Dog.prototype.construct = Dog;

// const d1 = new Dog("zhangsan", "white and black");
// d1.showName();
// console.log(d1);

// es6 类和继承
// class Person {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   showName() {
//     console.log(this.name);
//   }
// }

// const p1 = new Person("zhangsan", 18);

// console.log(p1);

// class Coder extends Person {
//   constructor(name, age, company) {
//     super(name, age);
//     this.company = company;
//   }
//   _gender;
//   get gender() {
//     return this._gender;
//   }
//   set gender(value) {
//     this._gender = value;
//   }
//   showCompany() {
//     console.log(this.company);
//   }
//   static count = 1;
// }

// const c1 = new Coder("zhangsan", 18, "zixun");
// c1.gender = "female";
// console.log(c1.gender);

// console.log(Coder.count);

/**
 * Symbol
 */
// const s = Symbol({ name: "zhangsan" });
// const s = Symbol({
//   name: "zhangsan",
//   toString() {
//     return "foo";
//   },
// });
// const s = Symbol('foo')
// const s1 = Symbol('foo')
// console.log(s === s1);

// console.log(s.description);

// let s;
// (function () {
//   s = Symbol.for("foo");
// })();

// const s2 = Symbol.for("foo");
// const s1 = Symbol.for("foo");
// const s2 = Symbol.for("foo");

// console.log(s1 === s2);
// console.log(Symbol.keyFor(s1));

// 一个对象需要存在同值的 key
// const stu1 = Symbol("张三");
// const stu2 = Symbol("张三");

// const grade = {
//   [stu1]: {
//     address: "1111",
//     tel: "xxx",
//   },
//   [stu2]: {
//     address: "2222",
//     tel: "xxx",
//   },
// };

// console.log(grade[stu1]);

// 消除魔术字符串
// const shapeType = {
//   triangle: Symbol(),
//   circle: Symbol(),
// };
// function getArea(shape) {
//   let area;
//   switch (shape) {
//     case shapeType.triangle:
//       area = 1;
//       break;
//     case shapeType.circle:
//       area = 2;
//       break;
//     default:
//       area = 0;
//   }
//   return area;
// }

// console.log(getArea(shapeType.triangle));
// console.log(getArea(shapeType.circle));

/**
 * Set：一种新的数据结构
 */

// const s = new Set();

// const s = new Set([1, 2, 1, 2, 3, 3]);
// s.forEach((item) => console.log(item));
// s.add("zhangsan").add("lisi").delete(2);
// // s.clear();
// // console.log(s.has("zhangsan1"));

// console.log(s.size);

// const arr1 = [1, 2, 3, 4, 5];
// const arr2 = [3, 4, 5, 6];

// 去重
// const res = new Set([...arr1, ...arr2]);

// console.log(res);

// 交集
// const s2 = new Set(arr2);

// const res = new Set(arr1.filter((item) => s2.has(item)));

// console.log(res);

// 差集
// const s1 = new Set(arr1);
// const s2 = new Set(arr2);

// const res = arr1
//   .filter((item) => !s2.has(item))
//   .concat(arr2.filter((item) => !s1.has(item)));

// console.log(res);

/**
 * WeakSet：弱引用
 * 跟Set区别
 * 1. 只能存储对象
 * 2. 不能被遍历
 * 3. 弱引用（垃圾回收机制，GC，计数法）
 */

/**
 * Map
 * WeakMap
 */
// const m = new Map();
// const obj = {
//   name: "zhangsan",
// };

// m.set(obj, "es");

/**
 * 字符串的扩展
 * 1. 字符串的 Unicode 表示法
 * 2. 字符串的遍历器接口
 * 3. 模板字符串
 * 4. String.fromCodePoint() String.fromCharCode() -> ES5
 * 5. String.prototype.includes()
 * 6. String.prototype.startsWith()
 * 7. String.prototype.endsWith()
 * 8. String.prototype.repeat()
 */

// 码点 \u0000 ~ \uffff

// for(const value of 'zixun'){
//   console.log(value);
// }

// console.log(String.fromCharCode(0x20bb7));
// console.log(String.fromCodePoint(0x20bb7));

//
// const str = "zhangsan";

// // es5循环
// const newStr = str.repeat(10);
// console.log(newStr);

/**
 * 正则表达式修饰符
 * es5
 * i
 * m
 * g
 *
 * es6
 * y
 * u
 */

/**
 * proxy 、reflect、generator、iterator、
 */

/**
 * promise
 */

// function promise() {
//   return new Promise((resolve, reject) => {
//     const random = parseInt(Math.random() * 10);
//     setTimeout(() => {
//       if (random >= 5) {
//         resolve(random);
//       } else {
//         reject(random);
//       }
//     });
//   });
// }

// const onResolve = (value) => console.log("已完成：输出的数字是" + value);
// const onReject = (value) => console.log("已拒绝：输出的数字是" + value);
// promise().then(onResolve, onReject);

/**
 * https://promisesaplus.com/
 *
 * 术语
 *     Promise: promise 是一个拥有then方法的对象或函数，其行为符合本规范
 *     具有then方法：是一个定义了then方法的对象或函数
 *     value：指任何JavaScript的合法值，包括 undefined,thenable和promise
 *     exception：是使用 throw 语句抛出的一个值
 *     reason：表示一个 promise 的拒绝原因
 * 要求
 *   promise的状态：一个Promise的当前状态必须为以下三种状态中的一种：等待中（Pending）、已完成（Fulfilled）、已拒绝（Rejected）
 *          处于pending时，promise需要满足以下条件：可以变成 Fulfilled 或 Rejected
 *          处于 Fulfilled 时，promise 需满足以下条件：1.不能迁移至其他任何状态 2. 必须拥有一个不可变的值
 *          处于 Rejected 时，promise 需满足以下条件： 1. 不能迁移至其他任何状态 2. 必须拥有一个不可变的原因
 *   必须要有一个then方法
 *      一个 promise 必须提供一个 thne 方法以访问其当前值和原因
 *
 *      promise 的 then 方法接受两个参数：promise.then(onFulfilled, onRejected) ,他们都是可选参数，同时他们都是函数，如果不是函数，则需要忽略他们
 *
 *          如果 onFulfilled 是一个函数
 *                  当 promise 执行结束后其必须被调用，其第一个参数为 promise 的结果
 *                  当 promise 执行结束前其不可被调用
 *                  其调用次数不可超过一次
 *          如果 onRejected 是一个函数
 *                  当 promise 被拒绝执行后其必须被调用，其第一个参数为 promise 的原因
 *                  当 promise 被拒绝执行前其不可被调用
 *                  其调用次数不可超过一次
 *          在执行上下文堆栈仅包含平台代码之前，不得调用 onFulfilled 或 onRejected
 *          onFulfilled 和 onRejectd 必须被作为普通函数调用（即非实例化调用，这样函数内部 this 非严格模式下指向 window ）
 *          then 方法可以被同一个 promise 调用多次
 *              当 promise 成功执行时，所有 onFulfilled 需按照其注册顺序依次回调
 *              当 promise 被拒绝执行时，所有的 onRejected 需按照其注册顺序依次回调
 *          then 方法必须返回一个pormise对象，promise2 = promise1.then(onFulfilled, onRejected)
 *              只要 onFulfilled 或者 onRejected 返回一个值 x，promise2 都会进入 onFulfilled 状态
 *              如果 onFulfilled 或者 onRejected 抛出一个异常 e，则 promise2 必须拒绝执行，并返回拒绝原因 e
 *              如果 onFulfilled 不是函数且 promise1 状态变为已完成，promise2 必须成功执行并返回相同的值
 *              如果 onRejected 不是函数且 promise1 状态变为已拒绝，promise2 必须执行拒绝回调并返回相同拒绝原因
 *
 * promise 的解决过程
 *
 * promise 解决过程是一个抽象的操作，其需输入一个 promise 和一个值，我们表示为 [[Resolve]](promise,x) (这句话的意思就是把 promise resolve了，同时传入 x 作为值)
 * promise.then(funciton(x){console.log('会执行这个函数，同时传入x变量的值',x)})
 * 如果 x 有 then 方法且看上去像一个 Promise，解决程序即尝试使 promise 接受 x 的状态；否则其用 x 的值来执行 promise
 *      如果 promise 和 x 指向同一个对象，以 TypeError 为拒因拒绝执行 promise
 *      如果 x 为 promise：
 *              如果 x 处于 Pending, promise 需保持为 Pending 直至 x 被执行或拒绝
 *              如果 x 处于 Fulfilled, 用相同的值执行 promise
 *              如果 x 处于 Rejected，用相同的拒因拒绝 promise
 *
 *  02:02
 */

// const promise1 = new Promise((resolve, reject) => {
//   reject();
// });

// promise1
//   .then(null, function () {
//     // return 123;
//     throw Error(234);
//   })
//   .catch(() => {
//     // return 555;
//     console.log("catch");
//   })
//   .then("zhangsan", "lisi")
//   .then(null, null)
//   .then(
//     (value) => {
//       console.log("resolve", value);
//     },
//     () => {
//       console.log("reject");
//     }
//   );

// const promise1 = new Promise((resolve, reject) => {
//     console.log('111');
//    resolve(promise1);
// });

// class Promise {
//   constructor(fn) {
//     this.status = "pending";
//     this.value = undefined;
//     this.fulfilledList = [];
//     this.rejectedList = [];
//     fn(this.triggerResolve.bind(this), this.triggerReject.bind(this));
//   }
//   triggerResolve(val) {
//     setTimeout(() => {
//       if (this.status !== "pending") {
//         return;
//       }
//       if (val instanceof Promise) {
//         val.then(
//           (value) => {},
//           (reason) => {}
//         );
//       } else {
//         // resolve传入的是普通值
//         this.status = "fulfilled";
//         this.value = val;
//         this.triggerFulfilled(val);
//       }
//     }, 0);
//   }
//   triggerReject() {}
//   triggerFulfilled(val) {
//     this.fulfilledList.forEach((item) => item(val));
//     this.fulfilledList = [];
//   }
//   // 实例方法
//   then(onFulfilled, onRejected) {
//     const { value, status } = this;
//     return new Promise((onNextFulfilled, onNextRejected) => {
//       function onFinalFulfilled(val) {
//         if (typeof onFulfilled !== "function") {
//           onNextFulfilled(val);
//         } else {
//           const res = onFulfilled(val);
//           if (res instanceof Promise) {
//             res.then(onNextFulfilled, onNextRejected);
//           } else {
//             onNextFulfilled(res);
//           }
//         }
//       }

//       switch (status) {
//         case "pending":
//           this.fulfilledList.push(onFinalFulfilled);
//           this.rejectedList.push(onRejected);
//           break;
//       }
//     });
//   }
//   catch() {}
//   // 静态方法
//   static resolve(value) {
//     if (value instanceof Promise) {
//       return value;
//     }
//     return new Promise((resolve) => resolve(value));
//   }
//   static reject() {}
//   static all() {}
//   static race() {}
// }

/**
 * Module
 *  CommonJS: Node.js
 *  AMD: require.js
 *  CMD: sea.js
 *  ES6
 *
 */

/**
 * ES7
 *
 *  1. includes -> 返回boolean
 *  2. **幂运算符
 */

// const arr = [1, 2, 3];

// // 第二个参数接收一个number类型，表示从该索引开始找
// console.log(arr.includes(2, 2));

// const arr = [1, 2, NaN, 5, 6];

// console.log(arr.includes(NaN));
// console.log(arr.indexOf(NaN));

// **
// console.log(Math.pow(2, 10));

// function pow(x, y) {
//   let res = 1;
//   for (let i = 0; i < y; i++) {
//     res *= x;
//   }
//   return res;
// }

// console.log(pow(2, 11));

// console.log(2 ** 10);

/**
 * ES8
 * async / await (generator 语法糖)
 * Object.values, Object.entries()
 * Object.getOwnPropertyDescriptors(obj) / Object.getOwnPropertyDescriptor(obj,key)
 * String.prototype.padStart()
 * String.prototype.padEnd()
 * 允许函数参数尾逗号
 */

// const obj = {
//   name: "zhangsan",
//   age: 18,
//   gender: "male",
// };

// padStart 应用场景，日期、时间，两位数

// 允许函数参数尾逗号

// function foo(a, b, c,) {
//   console.log(a, b, c);
// }

// foo(1, 2, 3);

/**
 * 异步迭代
 * for-await-of
 * Symbol.asyncIterator
 *
 * 正则表达式扩展
 */
