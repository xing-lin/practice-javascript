/**
 * 柯里化：把一个多参数函数转换为一个嵌套的一元函数的过程
 */

const curry = (binaryFn) => (firstArg) => (secondArg) =>
  binaryFn(firstArg, secondArg);

{
  const tableOf2 = (y) => 2 * y;
  const tableOf3 = (y) => 3 * y;
  const tableOf4 = (y) => 4 * y;

  //   console.log(tableOf2(2));
  //   console.log(tableOf3(2));
  //   console.log(tableOf4(2));
}

{
  const genericTable = (x, y) => x * y;
  genericTable(2, 3);

  const tableOf2 = curry(genericTable)(2);
  const tableOf3 = curry(genericTable)(3);
  const tableOf4 = curry(genericTable)(4);

  //   console.log(tableOf2(2));
  //   console.log(tableOf3(2));
  //   console.log(tableOf4(2));
}

const currying = (fn) => {
  if (typeof fn !== "function") {
    throw Error("No function provided");
  }
  return function curriedFn(...args) {
    if (args.length < fn.length) {
      return function () {
        return curriedFn.apply(null, args.concat([].slice.call(arguments)));
      };
    }
    return fn.apply(null, args);
  };
};

{
  const multiplication = (x, y, z, t) => x * y * z * t;
  //   console.log(currying(multiplication)(2)(3)(4)(5));
}

/**
 * 在数组内容中查找数字
 */
const array = ["js", "number1"];

// 常规方法
// const result = array.filter((item) => item.match(/[0-9]+/));

// console.log("result-->", result);

const curry = (binaryFn) => (firstArg) => (secondArg) =>
  binaryFn(firstArg, secondArg);

const match = curry(function (expr, str) {
  return str.match(expr);
});

const hasNumber = match(/[0-9]+/);

const filter = curry(function (f, ary) {
  return ary.filter(f);
});

const findNumbersInArray = filter(hasNumber);

console.log(findNumbersInArray(array));

console.log(filter(match(/[0-9]+/))(array));

// const fn = () => {
//   return function () {
//     return function (secondArg) {
//       return (function (expr, str) {
//         return str.match(expr);
//       })(/[0-9]+/, secondArg);
//     };
//   };
// };
