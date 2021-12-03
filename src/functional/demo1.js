// 计税函数
var percentValue = 5;
var calculateTax = (value) => (value / 100) * (100 + percentValue);

// 函数逻辑不应该依赖外部环境。


// 函数式编程是一种范式,我们能够以此创建仅依赖输入就可以完成自身逻辑的函数。
// 这保证了当函数被多次调用时仍然返回相同的结果。函数不会改变任何外部环境的变量，这将产生可缓存的、可测试的代码库。
var calculateTax2 = (value, percentValue) =>
  (value / 100) * (100 + percentValue);
