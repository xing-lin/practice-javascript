// 记忆函数
const memoized = (fn) => {
  const cache = {};
  return (arg) => cache[arg] || (cache[arg] = fn(arg));
};
const factorial = (n) => {
  if (n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
};

// var total = factorial(5);
// var total1 = factorial(4);
// var total2 = factorial(3);

// console.log(total);
// console.log(total1);
// console.log(total2);

// const memoized = (fn) => {
//   const cache = {};
//   return (arg) => {
//     // cache--> {}
//     // cache--> { '5': 120 }
//     // cache--> { '4': 24, '5': 120 }
//     console.log("cache-->", cache);
//     if (!cache[arg]) {
//       cache[arg] = fn(arg);
//     }
//     return cache[arg];
//   };
// };

const m = memoized(factorial);
const result = m(5);
const result1 = m(4);
const result2 = m(3);

console.log("result-->", result, result1, result2);
