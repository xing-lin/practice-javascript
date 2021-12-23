const a = [1, 2, 3];
// const b = a.reduce((r1, r2) => r1 + r2, 0);

// console.log(b);

// function reduce(arr, fn) {
//   let accumlator = 0;
//   for (const value of arr) {
//     accumlator = fn(accumlator, value);
//   }
//   return [accumlator];
// }
// const c = reduce(a, (r1, r2) => r1 + r2);
// console.log(c);

function reduce(array, fn, initialValue) {
  let accumlator;
  if (initialValue != undefined) {
    accumlator = initialValue;
  } else {
    accumlator = array[0];
  }
  if (initialValue === undefined) {
    for (let i = 1; i < array.length; i++) {
      accumlator = fn(accumlator, array[i]);
    }
  } else {
    for (const value of array) {
      accumlator = fn(accumlator, value);
    }
  }
  return accumlator;
}

const c = reduce([1, 2, 3], (r1, r2) => r1 * r2, 2);
const d = [1, 2, 3].reduce((r1, r2) => r1 * r2, 2);
console.log(
  [{ name: "张三" }, { name: "李四" }].reduce((r1, r2) => r1.name + r2.name, [])
);
console.log(
  reduce([{ name: "张三" }, { name: "李四" }], (r1, r2) => r1.name + r2.name)
);
console.log("c-->", c === d);
