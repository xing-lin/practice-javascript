const apressBooks = [
  {
    id: 111,
    title: "C# 6.0",
    author: "ANDREN TROELSEN",
    rating: [4.7],
    reviews: [{ good: 4, excellent: 12 }],
  },
  {
    id: 222,
    title: "Efficient Learning Machines",
    author: "Rahul Khanna",
    rating: [4.5],
    reviews: [],
  },
  {
    id: 333,
    title: "Pro AngularJS",
    author: "Adam Freeman",
    rating: [4.0],
    reviews: [],
  },
  {
    id: 444,
    title: "Pro ASP.NET",
    author: "Adam Freeman",
    rating: [4.2],
    reviews: [{ good: 14, excellent: 12 }],
  },
];

// 过滤出评分高于4.5（普通实现法）

// const result = apressBooks
//   .filter((item) => item.rating[0] > 4.5)
//   .map((book) => ({ title: book.title, author: book.author }));

// console.log("result->", result);
function map(arr, fn) {
  const result = [];
  for (let key in arr) {
    result.push(fn(arr[key]));
  }
  return result;
}

function filter(arr, fn) {
  const result = [];
  for (let key in arr) {
    if (fn(arr[key])) {
      result.push(arr[key]);
    }
  }
  return result;
}

const mapTitleAndAuthor = (book) => ({
  title: book.title,
  author: book.author,
});

const filterGoodBooks = (book) => book.rating[0] > 4.1;

const compose = (a, b) => (c) => a(b(c));

// 偏函数实现方式
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

// console.log(
//   compose(
//     partial(map, undefined, mapTitleAndAuthor),
//     partial(filter, undefined, filterGoodBooks)
//   )(apressBooks)
// );

const mapA = (array) => {
  return array.map(mapTitleAndAuthor);
};

const filterA = (array) => {
  return array.filter(filterGoodBooks);
};

// console.log(
//   compose(partial(mapA, undefined), partial(filterA, undefined))(apressBooks)
// );

// curry
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

// const mapB = curry(mapA)

console.log(compose(curry(mapA), curry(filterA))(apressBooks));
