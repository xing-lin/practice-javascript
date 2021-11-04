/**
 * 迭代器模式：指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示
 * 
 * 
 */

// 统一遍历接口实现
const each = function (arr, callBack) {
  for (let i = 0, len = arr.length; i < len; i++) {
    // 将值，索引返回给回调函数callBack处理
    if (callBack(i, arr[i]) === false) {
      break; // 中止迭代器，跳出循环
    }
  }
};

// 外部调用
each([1, 2, 3, 4, 5], function (index, value) {
  if (value > 3) {
    return false; // 返回false中止each
  }
  console.log([index, value]);
});

