/**
 * 宏任务：包括创建主文档对象、解析HTML、执行主线（或全局）JavaScript代码，更改当前URL以及各种事件，如页面加载、输入、网络事件和定时器事件。
 *
 * 从浏览器的角度来看，宏任务代表一个离散的、独立的工作单元。运行完任务后，浏览器可以继续其他调度，如重新渲染页面的UI或执行垃圾回收。
 */

/**
 * 微任务：相对于宏任务，微任务是更小的任务，需要尽可能快地执行。微任务更新应用程序的状态，但必须在浏览器任务继续执行其他任务之前执行，浏览器任务包括重新渲染页面的UI。
 *
 * 微任务的案例包括promise回调函数、DOM发生变化等。微任务需要尽可能快地、通过异步方式执行，同时不能产生全新的微任务。
 * 微任务使得我们能够在重新渲染UI之前执行指定的行为，避免不必要的UI重绘，UI重绘会使应用程序的状态不连续。
 */

/**
 * 事件循环的实现至少应该含有一个用于宏任务的队列和至少一个用于微任务的队列。两种队列在同一时刻都只执行一个任务。
 *
 * 因为JavaScript基于单线程执行模型，所以这两类任务都是逐个执行的。当一个任务开始执行后，在完成前，中间不会被任何其他任务中断。除非浏览器决定中止执行该任务，例如，某个任务执行时间过长或内存占用过大
 *
 * 1. 如果微任务队列中含有微任务，不论队列中等待的其他任务，微任务都将获得优先执行权。
 * 2. 在两个宏任务之间，可以重新渲染页面，而在微任务执行之前不允许重新渲染页面
 *
 *
 *
 * 全局来看，事件循环将首先检查宏任务队列，如果宏任务等待，则立即开始执行宏任务。直到该任务运行完成（或者队列为空），则事件循环将依次开始执行，完成一个后执行余下的微任务，直到队列中所有微任务执行完毕
 *
 * 注意 处理宏任务和微任务队列之间的区别：单次循环迭代中，最多处理一个宏任务（其余的在队列中等待），而队列中的所有微任务都会被处理。
 *
 * 当微任务队列处理完成并清空时，事件循环会检查是否需要更新UI渲染，如果是，则会重新渲染UI视图、至此，当前事件循环结束，之后将回到最初第一个环节，再次检查宏任务队列，并开启新一轮的事件循环。
 *
 *
 *
 *
 */

/**
 * e.g.
 *  假设：第5ms单击firstButton。
 *       第12ms单击secondButton。
 *       firstButton的单击事件处理函数firstHandler需要执行8ms。
 *       secondButton的单击事件处理函数secondHandler需要执行5ms
 *
 * 在本例中，我们创建立即兑现的promise。说实话，JavaScript引擎本应立即调用回调函数，因为我们已知promise成功兑现。
 * 但是，为了连续性，JavaScript引擎不会这么做，仍然会在firstHandler代码执行（需要运行8ms）完成之后再异步调用回调函数。
 * 通过创建微任务，将回调放入微任务队列。
 *
 * 此时，事件循环必须选择接下来执行的任务。在程序执行的第12ms时，添加了一个宏任务处理secondButton单击事件；在程序执行的第15ms时，添加了一个微任务处理promise成功兑现。
 *
 * 如果按先后顺序，那么应该先执行secondButton单击事件才算公平，但是我们已经提到过，微任务是很小的任务，需要尽可能快地执行。
 * 微任务具有优先执行权，每当执行一个任务时，事件循环总是首先检查微任务队列，目的是在处理其他任务之前把所有的微任务执行完毕。
 *
 */

const firstButton = document.getElementById("firstButton");
const secondButton = document.getElementById("secondButton");
// click 宏任务
firstButton.addEventListener("click", function firstHandler() {
  // promise 微任务
  Promise.resolve().then(() => {
    /*Some promise handling code that runs for 4 ms*/
  }); /*Some click handle code that runs for 8 ms*/
});
secondButton.addEventListener("click", function secondHandler() {
  /*Click handle code that runs for 5ms*/
});

/**
 * setTimeout、setInterval
 * 计时器提供一种异步延迟执行代码片段的能力，至少要延迟指定的毫秒数。因为JavaScript单线程的本质，我们只能控制计时器何时被加入队列中，而无法控制何时执行。
 *
 *
 * 假设某毫无耐心的用户在程序执行6ms时快速单击按钮
 *
 * 1．在0ms时，延迟计时器延迟10ms执行，间隔计时器也是间隔10ms。计时器的引用保存在浏览器中。
 * 2．在6ms时，单击鼠标。
 * 3．在10ms时，延迟计时器到期，间隔计时器的第一个时间间隔触发。
 *
 */

setTimeout(function timeoutHandler() {
  /*Some timeout handle code that runs for 6ms*/
}, 10);
setInterval(function intervalHandler() {
  /*Some interval handle code that runs for 8ms*/
}, 10);
const myButton = document.getElementById("myButton");
myButton.addEventListener("click", function clickHandler() {
  /*Some click handle code that runs for 10ms*/
});

/*Code that runs for 18ms*/




/**
 * 两段代码看起来功能是等价的，但实际未必。很明显，setTimeout内的代码在前一个回调函数执行完成之后，至少延迟10ms执行（取决于事件队列的状态，等待时间只会大于10ms）；
 * 而setInterval会尝试每10ms执行回调函数，不关心前一个回调函数是否执行。从上一节的例子中可以看到，间隔执行函数可以一个接一个地依次执行。
 */


setTimeout(function repeatMe() {
  /* Some long block of code... */ setTimeout(repeatMe, 10);
}, 10);
setInterval(() => {
  /* Some long block of code... */
}, 10);
