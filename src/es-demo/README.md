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

### 解构赋值（Destructuring）

1. 基本用法

```js
// 1.1 模式匹配：只要等号两边的模式相同，左边的变量就会被赋予对应的值

const [foo, [[bar], baz]] = [1, [[2], 3]];
console.log(foo, bar, baz); // 1,2,3

const [, , third] = ["foo", "bar", "baz"];
console.log(third); // baz

const [x, , y] = [1, 2, 3];
console.log(x, y); // 1,3

const [head, ...tail] = [1, 2, 3, 4];
console.log(head, tail); // 1, [2, 3, 4]

const [x, y, ...z] = ["a"];
console.log(x, y, z); // x -> a, y -> undefined, z -> []

// 1.2 如果解构不成功，变量值为undefined
const [foo] = [];
const [bar, baz] = [1];
console.log(foo, baz); // undefined  undefined

// 1.3 不完全解构
const [x, y] = [1, 2, 3];
console.log(x, y); // 1,2

const [a, [b], c] = [1, [2, 3], 4];
console.log(a, b, c); // 1, 2, 4

// 1.4 对于数组解构来说，等号的右边如果不是可迭代的结构，那么会报错。（在JavaScript中，Object是不可迭代的，除非实现了迭代协议。也就是说不能使用for...of来迭代对象的属性）
// 报错
const [foo] = 1;
const [foo] = false;
const [foo] = NaN;
const [foo] = undefined;
const [foo] = null;
const [foo] = {};

// 1.4.1 右边可迭代结构：数组
// 字符串
const [x, y, z] = "abc";
console.log(x, y, z); // a, b, c
// Set结构
const [x, y, z] = new Set(["a", "b", "c"]);
console.log(x, y, z); // a, b, c

// Generator 函数
// 斐波那契数列
/**
 * 0  [1, 1]
 * 1  [1, 2]
 * 1  [2, 3]
 * 2  [3, 5]
 * 3  [5, 8]
 * 5  [8, 13]
 */
function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}
const [first, second, third, fourth, fifth, sixth] = fibs();
console.log(first, second, third, fourth, fifth, sixth); // 0 1 1 2 3 5

const iterator = fibs();
console.log(iterator.next()); // 0
console.log(iterator.next()); // 1
console.log(iterator.next()); // 1
console.log(iterator.next()); // 2

// 1.4.2 但是对于数值和布尔值的解构,会先转为对象,可进行对象的解构
const { toString, toFixed } = NaN;
console.log(toFixed === Number.prototype.toFixed); // true
console.log(toString === Number.prototype.toString); // true

const { toString } = true;
console.log(toString === Boolean.prototype.toString); // true

// 解构赋值的规则是,只要等号右边的值不是对象, 就先将其转为对象.由于 undefined和null无法转成对象,所以对它们进行解构赋值,都会报错
const {} = undefined;
const {} = null;
```

2. 默认值

```js
// 2.1 解构赋值允许指定默认值
const [foo = true] = [];
console.log(foo); // true

const [x, y = "b"] = ["a"];
const [x, y = "b"] = ["a", undefined];
console.log(x, y); // a,b

// 2.2 解构赋值内部使用严格相等运算符===，判断一个位置是否有值
const [x = 1] = [undefined];
console.log(x); // 1

const [x = 1] = [null];
console.log(x); // null

// 2.3 如果默认值是一个表达式，那么这个表达式是惰性求值的，也就是只有在用到的时候，才会求值。
function f() {
  console.log("aaa");
  return "aaa";
}
const [x = f()] = [1];
console.log(x); // 1，不会输出打印aaa

// 2.4 默认值可以引用解构赋值的其他变量，但该变量必须已经声明。
const [x = y, y = 1] = []; //报错，因为x用到默认值y时，y还没有声明。
```

3. 对象的解构赋值

```js
// 3.1 对象解构，属性没有次序，变量必须与属性同名，才能取到正确的值。
const { bar, foo, baz } = { foo: "aaa", bar: "bbb" };
console.log(foo, bar, baz); // aaa,bbb,undefined

// 3.2 如果变量名与属性名不一致，必须写成下面这样
const { foo: baz } = { foo: "aaa", bar: "bbb" };
console.log(baz); // aaa
console.log(foo); // 报错，foo is not defined

// 3.2.1 这实际上说明，对象的解构赋值是下面形式的简写。
// 也就是说，对象的解构赋值的内部机制，是先找到同名属性foo，然后右边foo对应的值再赋给左边foo对应的变量。
// 真正被赋值的是后者，而不是前者
const { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };

// 3.3 采用这种写法时，变量的声明和赋值是一体的。对于let和const来说，变量不能重新声明，所以一旦赋值的变量以前声明过，就会报错。

let foo;
let { foo } = { foo: 1 };
console.log(foo); //报错，重复声明
let baz;
let { bar: baz } = { bar: 1 };
console.log(baz); //报错，重复声明

// 如果去掉let，那赋值操作必须加上圆括号。因为解析器会将起首的大括号，理解成一个代码块，而不是赋值语句。
let foo;
({ foo } = { foo: 1 });
console.log(foo); // 1
let baz;
({ bar: baz } = { bar: 1 });
console.log(baz); // 1
```

### 字符串的扩展

1. 字符的 Unicode 表示法

```js
// 1. JavaScript采用四字节的UTF-16编码，用\uxxxx形式表示一个字符，单个字符的范围为 \u0000 ~ \uFFFF，超出这个范围的字符，用两个双字节的形式表达
console.log("\uD842\uDFB7"); // 𠮷

// 1.1 超过0xFFFF的数值，JavaScript会理解为 \u20BB+7
console.log("\u20BB7"); // ₻7

// ES6改进，只要将码点放入大括号，就能正常解读该字符。
console.log("\u{20BB7}"); //  𠮷
console.log("\u{20BB7}" === "\uD842\uDFB7"); // true
```

2. codePointAt()

```js
// 汉字𠮷的码点是0x20BB7，UTF-16编码为0xD842 0xDFB7（十进制为55362 57271），需要4个字节储存。
// 对于这种4个字节的字符，JavaScript不能正确处理，字符串长度会误判为2，而且charAt方法无法读取整个字符，charCodeAt方法只能分别返回前两个字节和后两个字节的值。
const s = "𠮷";
console.log(s.length); // 2
console.log(s.charAt(0)); // �
console.log(s.charAt(1)); // �
console.log(s.charCodeAt(0)); // 55362
console.log(s.charCodeAt(1)); // 57271
console.log(s.charCodeAt(0).toString(16)); // d842
console.log(s.charCodeAt(1).toString(16)); // dfb7
console.log("\ud842\udfb7"); // 𠮷

// ES6
console.log(s.codePointAt(0).toString(16)); // 20bb7
```

3. String.fromCodePoint()

```js
// String.fromCharCode不能识别大于0xFFFF的码点，所以0x20BB7就发生了溢出，最高位2被舍弃了，最后返回码点U+0BB7对应的字符
console.log(String.fromCharCode(0x20bb7)); // ஷ
// String.fromCodePoint，弥补了String.fromCharCode方法的不足。在作用上，正好与codePointAt方法相反
console.log(String.fromCodePoint(0x20bb7)); // 𠮷
```

4. 增加了字符串的遍历器接口

```js
// for...of 可以识别大于0xFFFF的码点，传统的for循环无法识别这样的码点。
const s = "𠮷";
for (const value of s) {
  console.log(value); // 𠮷
}
for (let i = 0; i < s.length; i++) {
  console.log(s[i]); // 不能识别，乱码�
}
```

5. normalize()

```js
// 许多欧洲语言有语调符号和重音符号。为了表示它们，Unicode提供了两种方法。一种是直接提供带重音符号，另一种是提供合成符号，即原字符与重音符号的合成，两个字符合成一个字符。

console.log("\u01D1"); // 重音符号 Ǒ
console.log("\u004F\u030C"); // O + ˇ  = Ǒ

// 这两种方法，在视觉和语义上都等价，但是JavaScript不能识别。
console.log("\u01D1" === "\u004F\u030C"); // false
console.log("\u01D1".length); // 1
console.log("\u004F\u030C".length); // 2

// ES6提供字符串实例的normalize()方法，用来将字符的不同表示方法统一为同样的形式，这称为Unicode正规化。normalize方法不能识别中文。
console.log("\u01D1".normalize() === "\u004F\u030C".normalize()); // true
console.log("\u01D1".normalize().length === "\u004F\u030C".normalize().length); // true length都为1
```

6. includes(), startsWith(), endsWith()

```js
// includes()：返回布尔值，表示是否找到了参数字符串
// startsWith()：返回布尔值，表示参数字符串是否在源字符串的头部
// endsWith()：返回布尔值，表示参数字符串是否在源字符串的尾部。

const s = "Hello World";

console.log(s.includes("o")); // true
console.log(s.startsWith("Hello")); // true
console.log(s.endsWith("!")); // true

// 这三个方法都支持第二个参数，表示开始搜索的位置。使用第二个参数n时，endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。

const s = "Hello World";

console.log(s.includes("World", 6)); // true
console.log(s.startsWith("world", 6)); // true
console.log(s.endsWith("Hell", 4)); // true
```

7. repeat()：返回一个新的 字符串，表示将原字符串重复 n 次

```js
console.log("abc".repeat(2)); // abcabc
console.log("abc".repeat(0) === ""); // true
// 如果参数是小数，只保留整数部分
console.log("abc".repeat(0.9) === ""); // true
// 如果参数是负数或者Infinity，会报错，
console.log("abc".repeat(-1)); //报错
console.log("abc".repeat(Infinity)); //报错
// 但是如果参数是0到-1之间的负数，取整以后等于-0，repeat视同为0
console.log("abc".repeat(-0.9) === ""); // true
// 参数NaN等同于0
console.log("abc".repeat(NaN) === ""); // true
// 如果参数类型不是number类型，会先将参数转换成number
console.log("abc".repeat("aaaa") === ""); // true
console.log("abc".repeat("3")); // abcabcabc
```

8. padStart(), padEnd()：ES7 推出了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或者尾部去补全。

```js
console.log("x".padStart(5, "a")); // aaaax
console.log("x".padEnd(5, "a")); // xaaaa

// 如果原字符串的长度，等于或大于指定的最小长度，则返回原字符串
console.log("xxxxx".padStart(5, "a")); // xxxxx
console.log("xxxxx".padEnd(5, "a")); // xxxxx

// 如果用来补全的字符串与原字符串，两者的长度之和超过了指定的最小长度，则会截去超出位数的补全字符串
console.log("x".padStart(3, "abcdefg")); // abx
console.log("x".padEnd(3, "abcdefg")); // xab

// 如果省略第二个参数，则会用空格补全长度
console.log("x".padStart(3) === "  x"); // true
console.log("x".padEnd(3) === "x  "); // true

// 用途，格式化日期补0，就不用判断是否小于10
```

9. 模板字符串

### Proxy

```js
// Proxy.revocable 方法返回一个对象，该对象的 proxy 属性是 Proxy 实
// 例， revoke 属性是一个函数，可以取消 Proxy 实例。上面代码中，当执
// 行 revoke 函数之后，再访问 Proxy 实例，就会抛出一个错误。
// Proxy.revocable 的一个使用场景是，目标对象不允许直接访问，必须通过代理
// 访问，一旦访问结束，就收回代理权，不允许再次访问。
const handler = {
  get() {
    return "12";
  },
};

const { proxy, revoke } = Proxy.revocable({ age: 11 }, handler);
console.log(proxy.age); // 12

revoke();

console.log(proxy.age); // 报错
```

1. get(target, propKey, receiver)

```js
// get(target, propKey, receiver)：拦截对象属性的读取，比如 proxy.foo 和 proxy['foo']。

const person = {
  name: "张三",
};

const proxy = new Proxy(person, {
  get(target, property) {
    if (property in target) {
      return target[property];
    } else {
      throw new ReferenceError("属性" + property + "不存在");
    }
  },
});

console.log(proxy.name);
console.log(proxy.age);
```

2. set(target, propKey, value, receiver)

```js
// set(target, propKey, value, receiver)：拦截对象属性的设置。比如 proxy.foo = v 或 proxy['foo'] = v，返回一个布尔值。

const person = new Proxy(
  {},
  {
    set(target, property, value) {
      if (property === "age") {
        if (!Number.isInteger(value)) {
          throw new TypeError("The age is not an integer");
        }
        if (value > 200) {
          throw new RangeError("The age seems invalid");
        }
      }
      return (target[property] = value);
    },
  }
);

person.age = 100;

console.log(person);
```

3. has(target, propKey)

```js
// has(target, propKey)：拦截 propKey in proxy 的操作，返回一个布尔值。
// has 方法用来拦截 hasProperty 操作，即判断对象是否有某个属性时，这个方法会生效。
// 值得注意的是，has 方法不拦截 HasOwnProperty 操作，不拦截 for...in 操作
// 隐藏私有属性
const proxy = new Proxy(
  { _prop: "foo", prop: "foo", 1: 2 },
  {
    has(target, property) {
      if (property[0] === "_") {
        return false;
      }
      return property in target;
    },
  }
);

console.log("_prop" in proxy); // false
console.log(proxy.hasOwnProperty("_prop")); // true

for (const key in proxy) {
  console.log(key); // 1,_prop,prop
}
```

4. deleteProperty(target, propKey)

```js
// deleteProperty(target, propKey)：拦截 delete proxy[propKey] 的操作，返回一个布尔值。

const obj = {
  name: "张三",
  age: 11,
  _gender: "boy",
};

const proxy = new Proxy(obj, {
  deleteProperty(target, property) {
    if (property.startsWith("_")) {
      throw new Error("此属性不能删除");
    }
    Reflect.deleteProperty(target, property);
    return true;
  },
});

console.log(proxy); // {name: '张三', age: 11, _gender: 'boy'}
delete proxy.name;
console.log(proxy); // {age: 11, _gender: 'boy'}
delete proxy._gender; //报错
```

5. ownKeys(target)

```js
// ownKeys(target)：拦截 Object.getOwnPropertyNames(proxy) 、 Object.getOwnPropertySymbols(proxy) 、 Object.keys(proxy) ，返回一个数组。
// 该方法返回目标对象所有自身的属性的属性名，而 Object.keys() 的返回结果仅包括目标对象自身的可遍历属性。

const target = {
  a: 1,
  b: 2,
  c: 3,
  [Symbol.for("secret")]: "4",
};
Object.defineProperty(target, "key", {
  enumerable: false,
  configurable: true,
  writable: true,
  value: "static",
});
const handler = {
  ownKeys(target) {
    return ["a", "d", Symbol.for("secret"), "key"];
  },
};
const proxy = new Proxy(target, handler);

console.log(Object.keys(proxy)); // ['a']
```

6. getOwnPropertyDescriptor(target, propKey)

```js
// getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
const handler = {
  getOwnPropertyDescriptor(target, key) {
    if (key[0] === "_") {
      return;
    }
    return Reflect.getOwnPropertyDescriptor(target, key);
  },
};
var target = { _foo: "bar", baz: "tar" };
var proxy = new Proxy(target, handler);
Reflect.getOwnPropertyDescriptor(proxy, "wat"); // undefined
Reflect.getOwnPropertyDescriptor(proxy, "_foo"); // undefined
console.log(Reflect.getOwnPropertyDescriptor(proxy, "baz")); // {value: 'tar', writable: true, enumerable: true, configurable: true}
```

7. defineProperty(target, propKey, propDesc)

```js
// defineProperty(target, propKey, propDesc)：拦截 Object.defineProperty(proxy, propKey, propDesc)、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
const obj = {
  name: "张三",
  age: 11,
};

const proxy = new Proxy(obj, {
  defineProperty(target, property, descriptor) {
    console.log(target, property, descriptor);
    return Reflect.defineProperty(target, property, descriptor);
  },
});

Object.defineProperty(proxy, "gender", {
  writable: false,
  enumerable: false,
  value: "boy",
});

console.log(proxy);
```

8. preventExtensions(target)

```js
// preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。
const p = new Proxy(
  {},
  {
    preventExtensions: function (target) {
      return true;
    },
  }
);
Object.preventExtensions(p); // 报错
```

9. getPrototypeOf(target)

```js
// getPrototypeOf(target)：拦截获取对象原型 Object.getProtoypeOf(proxy)，返回一个对象。
// 具体来说拦截以下操作
// Object.prototype.__proto__
// Object.prototype.isPrototypeOf()
// Object.getPrototypeOf()
// Reflect.getPrototypeOf()
// instanceof

const proto = {};
const p = new Proxy(
  {},
  {
    getPrototypeOf(target) {
      return proto;
    },
  }
);

console.log(Object.getPrototypeOf(p) === proto); // true
```

10. isExtensible(target)

```js
// isExtensible(target)：拦截 Object.isExtensible(proxy)，返回一个布尔值。
var p = new Proxy(
  {},
  {
    isExtensible: function (target) {
      console.log("called");
      return true;
    },
  }
);
Object.isExtensible(p);
```

11. setProtoypeOf(target, proto)

```js
// setProtoypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。

var handler = {
  setPrototypeOf(target, proto) {
    throw new Error("Changing the prototype is forbidden");
  },
};
var proto = {};
var target = function () {};
var proxy = new Proxy(target, handler);
Object.setPrototypeOf(proxy, proto);
// Error: Changing the prototype is forbidden
```

12. 目标是函数，额外的操作：apply(target, object, args)

```js
// apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如 proxy(...args) 、 proxy.call(object,...args) 、 proxy.apply(...) 。
const p = new Proxy(
  function sum(x, y) {
    return x + y;
  },
  {
    apply() {
      return Reflect.apply(...arguments) * 2;
    },
  }
);

console.log(p(1, 2)); // 6
```

13. construct(target, args)

```js
// construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如 new proxy(...args)。
const p = new Proxy(function () {}, {
  construct: function (target, args) {
    return { value: args[0] * 10 };
  },
});

console.log(new p(1));
// construct 方法返回的必须是一个对象，否则会报错。
```

### Reflect
