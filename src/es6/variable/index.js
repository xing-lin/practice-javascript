/**
 * let的特点：
 *      1. 不属于顶层对象window
 *      2. 不允许重复声明
 *      3. 不存在变量提升
 *      4. 暂时性死区
 *      5. 块级作用域
 */
// var -> variable  使用var会污染全局变量
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