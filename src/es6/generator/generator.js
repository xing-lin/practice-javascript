"use strict";

/**
 * 生成器的遍历
 *
 */
function* NameGenerator() {
  yield "张三";
  yield* AnthorGenerator();
  yield "王五";
}

function* AnthorGenerator() {
  yield "李四";
}

// 1. 使用for...of遍历
for (const value of NameGenerator()) {
  console.log("value->", value);
}

// 2. 建立一个迭代器，使用while来迭代生成器生成的值序列
const iterator = NameGenerator();
// 声明item保存生成器产生的值（挂起的位置）
let item;
while (!(item = iterator.next()).done) {
  console.log("value->", item.value);
}

/**
 * 运用生成器的例子
 */

// 1. 生成id序列
function* IdGenerator() {
  let id = 0;
  while (true) {
    yield ++id;
  }
}

const idIterator = IdGenerator();
console.log(idIterator.next().value); // 1
console.log(idIterator.next().value); // 2
console.log(idIterator.next().value); // 3

const idIterator2 = IdGenerator();
console.log(idIterator2.next().value); // 1
console.log(idIterator2.next().value); // 2
console.log(idIterator2.next().value); // 3

// 2. 替代递归

/**
 * <div id="subTree">
　<form>
　　<input type="text"/>
　</form>
　<p>Paragraph</p>
　<span>Span</span>
</div>
<script>
　function traverseDOM(element, callback) {
　　callback(element);
　　element = element.firstElementChild;
　　while (element) {
　　　traverseDOM(element, callback);
　　　element = element.nextElementSibling;
　　}
　}
　const subTree = document.getElementById("subTree");
　traverseDOM(subTree, function(element) {
    console.log(element.nodeName);
　});
</script>
 */
function* DomTraversal(element) {
  yield element;
  element = element.firstElementChild;
  while (element) {
    yield* DomTraversal(element);
    element = element.nextElementSibling;
  }
}
const subTree = document.getElementById("subTree");
for (const element of DomTraversal(subTree)) {
  console.log(element.nodeName);
}

/**
 * 用生成器和promise模拟async await
 */
function async(generator) {
  const iterator = generator();
  function handle({ value, done }) {
    if (done) {
      return;
    }

    if (value instanceof Promise) {
      value.then(
        (res) => {
          handle(iterator.next(res));
        },
        (err) => {
          iterator.throw(err);
        }
      );
    } else {
      // yield后面跟的不是promise异步操作时，不阻塞下面的程序执行
      handle(iterator.next(value));
    }
  }
  try {
    handle(iterator.next());
  } catch (error) {
    iterator.throw(error);
  }
}

// async(function* () {
//   const value1 = yield "aaa";
//   console.log("data1-->", value1);
//   const value2 = yield axios.get(url_data2);
//   console.log("data2-->", value2);
//   yield axios.get(url_data3);
// });
