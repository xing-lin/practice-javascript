// const { forEach } = require("./es6-functional");
// 闭包

// let global = "global";

// function outer() {
//   function inner() {
//     let a = 5;
//     console.log(global);
//   }
//   inner();
// }

// outer();

// const fn = (arg) => {
//   let outer = "visible";
//   let innerFn = () => {
//     console.log(outer);
//     console.log(arg);
//   };
//   return innerFn;
// };

// // fn被参数5调用。返回了innerFn
// const closureFn = fn(5);

// // 当innerFn被返回时，JavaScript执行引擎视 innerFn 为一个闭包，并相应地设置了它的作用域。
// // 闭包有3个作用域层级。这3个作用域层级（arg、outer值将被设置到inner的作用域层级中）在innerFn返回时都被设置了。返回函数的引用存储在closure中。
// // 如此，当closureFn 通过作用域链被调用时就记住了arg、outer值
// closureFn();

const tap = (value) => (fn) => typeof fn === "function" && fn(value);

// console.log(tap(2)((value) => value + 2));
// forEach([1, 2, 3], (number) => {
//   console.log(number);
// });

// forEach([1, 2, 3], (number) => {
//   tap(number)(() => {
//     console.log(number);
//   });
// });

const unary = (fn) => (fn.length === 1 ? fn : (arg) => fn(arg));

// console.log(["1", "2", "3"].map(unary(parseInt))); // [1,2,3]
// console.log(["1", "2", "3"].map(parseInt)); // [1,NaN,NaN]

const once = (fn) => {
  let done = false;
  return function () {
    return done ? undefined : ((done = true), fn.apply(this, arguments));
  };
};

// const hello = () => {
//   console.log("123");
// };
// 只输出一次
// const a = once(hello);
// a();
// a();
// a();

