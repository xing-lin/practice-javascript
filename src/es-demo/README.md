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

### var 与 let / const

1. 不属于顶层对象 window
2. 不允许重复声明
3. 不存在变量提升
4. 暂时性死区
5. 块级作用域

```js
// 1. 不属于顶层对象 window
var a = 5;
console.log(window.a); // 5
let b = 6;
console.log(window.b); // undefined

// 2. 不允许重复声明：不允许在相同作用域内，重复声明同一个变量
function func() {
  let a = 10; // Uncaught SyntaxError: Identifier 'a' has already been declared
  var a = 1;
}

function func() {
  let a = 10; // Uncaught SyntaxError: Identifier 'a' has already been declared
  let a = 1;
}

function func(arg) {
  let arg; // Uncaught SyntaxError: Identifier 'arg' has already been declared
}

function func(arg) {
  {
    let arg; // 不报错
  }
}

// 3. 不存在变量提升：变量一定要在声明后使用，否则报错
console.log(foo); // undefined
console.log(bar); // Uncaught ReferenceError: Cannot access 'bar' before initialization

var foo = 2;
let bar = 2;

// 4. 暂时性死区(temporal dead zone)：如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。
var tmp = 123;
if (true) {
  // TDZ开始
  tmp = "abc"; // Uncaught ReferenceError: Cannot access 'tmp' before initialization

  let tmp; // TDZ结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); //123
}

// 4.1 “暂时性死区”就意味着typeof不再是一个百分之百安全的操作
typeof undeclared_variable; // undeinfed

typeof x; // Uncaught ReferenceError: Cannot access 'x' before initialization
let x;

// 4.2 隐蔽的暂时性死区：大括号会形成一个封闭的作用域（也就是暂时性死区），声明之前就使用这些变量，就会报错
function bar(x = y, y = 2) {
  return [x, y];
}
// 改为 function bar(x = 2, y = x) { return [x, y] }  -> [2,2]
bar(); // Uncaught ReferenceError: Cannot access 'y' before initialization

// 5. 块级作用域：用let所声明的变量，只在let命令所在的代码块内有效
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
console.log(j); // Uncaught ReferenceError: j is not defined
```

### const

```js

// 1. const 声明一个只读的常量。一旦声明，常量的值就不能改变。这就意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值。

const foo; // Uncaught SyntaxError: Missing initializer in const declaration

// 2. const 对于引用类型的变量，变量名不指向数据，而是指向数据所在的地址。

// 2.1 不可变的只是这个地址，即不能把foo指向另外一个地址，但对象本身是可变的，所以依然可以为其添加新属性
const foo = {};
foo.prop = 123;

console.log(foo.prop); //123

foo = {}; // Uncaught TypeError: Assignment to constant variable.

// 2.2 es5中声明常量
Object.defineProperty(window, "PI", {
  value: 3.14,
  writable: false,
});
PI = 3.15;
console.log(PI);

// 2.3 Object.freeze 冻结的是对象本身，对象的属性依旧可以修改
const foo = Object.freeze({
  a: {
    b: 1,
  },
});

foo.a.b = 123;

console.log(foo); // 123

// 递归freeze
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
console.log(f); //报错


```

### 解构
