const forEach = (array, fn) => {
  for (let i = 0; i < array.length; i++) {
    fn(array[i]);
  }
};

// forEach([1, 2, 3], (item) => {
//   console.log(item);
// });

const forEachObject = (obj, fn) => {
  for (const property in obj) {
    if (obj.hasOwnProperty(property)) {
      fn(property, obj[property]);
    }
  }
};

// const obj = {
//   name: "张三",
//   age: 18,
// };

// forEachObject(obj, (key, value) => {
//   console.log(key, value);
// });

// unless：除...之外
const unless = (predicate, fn) => {
  if (!predicate) {
    fn();
  }
};

// forEach([1, 2, 3, 4, 5, 6, 7, 8], (number) => {
//   unless(number % 2, () => {
//     console.log("even", number);
//   });
// });

const times = (times, fn) => {
  for (let i = 0; i < times; i++) {
    fn(i);
  }
};

// times(100, (time) => {
//   unless(time % 2, () => {
//     console.log(time);
//   });
// });

const every = (arr, fn) => {
  let result = true;
  for (const value of arr) {
    if ((result = !fn(value))) {
      break;
    }
  }
  return result;
};

const some = (arr, fn) => {
  let result = false;
  for (const value of arr) {
    if ((result = fn(value))) {
      break;
    }
  }
  return result;
};

// console.log(some([1, 2, 3, 4], (number) => number < 1));

// const people = [
//   {
//     firstname: "aafirstName",
//     lastname: "cclastName",
//   },
//   {
//     firstname: "bbfirstName",
//     lastname: "bblastName",
//   },
//   {
//     firstname: "ccfirstName",
//     lastname: "aalastName",
//   },
// ];

// const sortBy = (property) => (a, b) => compareFunction(a, b, property);

// console.log(people.sort(sortBy("firstname")));

// console.log(people.sort(sortBy("lastname")));

// function compareFunction(a, b, property) {
//   return a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
// }

const map = (arr, fn) => {
  const result = [];
  //   forEach(arr, (item, index) => {
  //     result.push(fn(item, index));
  //   });
  for (const value of arr) {
    result.push(fn(value));
  }
  return result;
};

const filter = (arr, fn) => {
  const result = [];

  for (const value of arr) {
    fn(value) && result.push(value);
  }
  return result;
};

// const filterArr = filter([1, 2, 3], (item) => item > 1);

// console.log(filterArr);

const concatAll = (array) => {
  let result = [];
  for (const value of array) {
    [].push.apply(result, value);
  }
  return result;
};

console.log(concatAll([[1, 2, 3, 5]]));

module.exports = {
  forEach,
};
