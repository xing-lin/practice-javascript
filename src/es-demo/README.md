### 为什么将代码放在 static 目录

- 因为 static 目录下的代码不会被 webpack 打包编译，保证代码的原汁原味。webpack 模块化编译打包后会规避一些问题，比如

```js
// src/*.js

var a = 5;
console.log(a); // 5
console.log(window.a); // undefined

// static/*.js

var a = 5;
console.log(a); // 5
console.log(window.a); //5
```

### JavaScript 与 ECMAScript

ECMAScript 是 ECMA-262 所定义的语言。它是一个规范标准，JavaScript 实现了 ECMAScript，当然实现 ECMAScript 的还有 Adobe ActionScript。

JavaScript = ECMAScript + DOM 文档对象模型 + BOM 浏览器对象模型
ES6 ES2015 2015.6 发布的
ES7 ES2016 2016.6 发布的
...

### var / let / const

1. 不属于顶层对象 window
2. 不允许重复声明
3. 不存在变量提升
4. 暂时性死区
5. 块级作用域

```js
// 块级作用域：用let所声明的变量，只在let命令所在的代码块内有效
{
  let a = 1;
  var b = 2;
}
console.log(a); // Uncaught ReferenceError: a is not defined
console.log(b);

// for循环的计数器
for (var i = 0; i < 3; i++) {}
console.log(i);
for (let j = 0; j < 3; j++) {}
console.log(j);
```
