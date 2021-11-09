


// 块级作用域
for (var i = 0; i < 3; i++) {}
console.log(i); // 3
for (let j = 0; j < 3; j++) {}
console.log(j); // j is not defined
