"use strict";

// 不能把对象当作map：原型继承属性 、key仅支持字符串
const dictionary = {
  ja: {
    "Ninjas for hire": "日本",
  },
  zh: {
    "Ninjas for hire": "中国",
  },
  ko: {
    "Ninjas for hire": "韩国",
  },
};

console.log(typeof dictionary.ja["constructor"]); // 输出的是 function 而不是 undefined
