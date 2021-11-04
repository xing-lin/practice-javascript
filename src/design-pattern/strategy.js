/**
 * 策略模式的定义：定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。（相互替换：表现为它们具有相同的目标和意图）
 *
 */

// 计算奖金

/**
 * 代码问题：
 * 1. calculateBonus 函数比较庞大，包含了很多if-else语句。
 * 2. calculateBonus 函数缺乏弹性，如果新增一种新的绩效等级C，或者想把绩效S的奖金系数改为5，那我们必须深入calculateBonus函数的内部实现，违反开放-封闭原则的。
 * 3. 算法的复用性差，如果在程序的其他地方需要重用这些计算奖金的算法呢？我们的选择只有复制和粘贴。
 *
 * @param {*} performanceLevel 绩效等级
 * @param {*} salary 工资
 * @returns
 */
const calculateBonus = function (performanceLevel, salary) {
  if (performanceLevel === "S") {
    return salary * 4;
  }
  if (performanceLevel === "A") {
    return salary * 3;
  }
  if (performanceLevel === "B") {
    return salary * 2;
  }
};

// console.log(calculateBonus("B", 2000));

/**
 * 组合方式：改善非常有限，依然没有解决最重要的问题：calculateBonus函数有可能越来越庞大，而且在系统变化的时候缺乏弹性
 */

const performanceS = function (salary) {
  return salary * 4;
};

const performanceA = function (salary) {
  return salary * 3;
};

const performanceB = function (salary) {
  return salary * 2;
};

const calculateBonus2 = function (performanceLevel, salary) {
  if (performanceLevel === "S") {
    return performanceS(salary);
  }
  if (performanceLevel === "A") {
    return performanceA(salary);
  }
  if (performanceLevel === "B") {
    return performanceB(salary);
  }
};

// console.log(calculateBonus("A", 3000));

/**
 * 策略模式——模仿传统面向对象语言
 */
const PerformanceS = function () {};
PerformanceS.prototype.calculate = function (salary) {
  return salary * 4;
};
const PerformanceA = function () {};
PerformanceA.prototype.calculate = function (salary) {
  return salary * 3;
};
const PerformanceB = function () {};
PerformanceB.prototype.calculate = function (salary) {
  return salary * 2;
};

const Bonus = function () {
  this.salary = null;
  this.strategy = null;
};

Bonus.prototype.setSalary = function (salary) {
  this.salary = salary;
};

Bonus.prototype.setStrategy = function (strategy) {
  this.strategy = strategy;
};

Bonus.prototype.getBonus = function () {
  return this.strategy.calculate(this.salary);
};

const bonus = new Bonus();
bonus.setSalary(1000);
bonus.setStrategy(new PerformanceA());

console.log(bonus.getBonus());

const strategies = {
  S: function (salary) {
    return salary * 4;
  },
  A: function (salary) {
    return salary * 3;
  },
  B: function (salary) {
    return salary * 2;
  },
};

const calculateBonus3 = function (level, salary) {
  if (level in strategies) {
    return strategies[level](salary);
  }
};

console.log(calculateBonus3("B", 1000));
