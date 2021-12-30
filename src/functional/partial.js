const curry = (fn) => {
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

// const setTimeoutWrapper = (time, fn) => {
//   setTimeout(fn, time);
// };

// // curry实现偏函数
// const delayTenMs = curry(setTimeoutWrapper)(10);

// delayTenMs(() => {
//   console.log("do x task");
// });
// delayTenMs(() => {
//   console.log("do y task");
// });

const partial = function (fn, ...partialArgs) {
  const result = [...partialArgs];
  return function (...fullArguments) {
    let arg = 0;
    for (let i = 0; i < partialArgs.length && arg < fullArguments.length; i++) {
      if (partialArgs[i] === undefined) {
        result[i] = fullArguments[arg++];
      }
    }
    return fn.apply(null, result);
  };
};

const delayTenMs = partial(setTimeout, undefined, 10);

// delayTenMs(() => {
//   console.log("Do X task");
// });
// delayTenMs(() => {
//   console.log("Do Y task");
// });

let obj = {
  foo: "bar",
  bar: "foo",
};

// JSON.stringify(obj, null, 2);

const prettyPrintJson = partial(JSON.stringify, null, 2, undefined);

const obj1 = {
  foo: "bar1",
  bar: "foo1",
};

console.log(prettyPrintJson(obj));
console.log(prettyPrintJson(obj1));
