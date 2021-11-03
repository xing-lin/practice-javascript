"use strict";

// 函数式编程的目标是使用函数来抽象作用在数据之上的控制流与操作，从而在系统中消除副作用并减少对状态的改变

{
  document.querySelector("#msg").innerHTML = "<h1>Hello World</h1>";
}

{
  function printMessage(elementId, format, message) {
    document.querySelector(
      `#${elementId}`
    ).innerHTML = `<${format}>${message}</${format}>`;
  }

  printMessage("msg", "h1", "Hello World");
}

{
  var printMessage = run(addToDom("msg", h1, echo));
  printMessage("Hello World");
}

/**
 * 函数式编程:
 *            声明式编程范式：这种范式会描述一系列的操作，但并不会暴露它们是如何实现的或是数据流如何穿过它们。
 *                          （命令式编程将计算机程序视为一系列自上而下的断言，通过修改系统的各个状态来计算最终的结果）
 *            纯函数：1. 仅取决于提供的输入，而不依赖于任何在函数求值期间或调用间隔时可能变化的隐藏状态和外部状态。
 *                   2. 不会造成其作用域的变化，例如修改全局对象或引用传递的参数
 *                  （可能引起副作用的操作：改变一个全局的变量、属性或数据结构；改变一个函数参数的原始值；处理用户输入；抛出一个异常，除非它又被当前函数捕获了；屏幕打印或记录日志；查询HTML文档、浏览器的cookie或访问数据库）
 *            引用透明：对于相同的输入始终产生相同的结果
 *            不可变性：指那些被创建后不能更改的数据
 */

{
  function printPeople(people) {
    return (country) => {
      people
        .filter((item) => item.address.country === country)
        .forEach((item) => {
          console.log(item);
        });
    };
  }
}
