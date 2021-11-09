"use strict";

// const foo = Object.freeze({
//   a: {
//     b: 1,
//   },
// });

// foo.c = 123;

// console.log(foo);

// const foo = {
//   a: {
//     b: 1,
//   },
// };

const constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object") {
      constantize(obj[key]);
    }
  });
  return obj;
};

const f = constantize({
  a: {
    b: 1,
  },
});
f.a.b = 123;
console.log(f);
