/**
 * 函子：函子是一个普通对象（在其他语言中，可能是一个类），它实现了 map 函数，在遍历每个对象值的时候生成一个新对象。
 */

const Container = function (val) {
  this.value = val;
};

Container.of = function (value) {
  return new Container(value);
};

// const a = new Container(1);

// const b = Container.of(3);
Container.prototype.map = function (fn) {
  return Container.of(fn(this.value));
};

const double = (x) => x + x;

// const c = Container.of(3).map(double).map(double).map(double);

// console.log(c);

const MayBe = function (val) {
  this.value = val;
};

MayBe.of = function (val) {
  return new MayBe(val);
};

MayBe.prototype.isNothing = function () {
  return this.value == null;
};

MayBe.prototype.map = function (fn) {
  return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this.value));
};

// console.log(MayBe.of("string").map((x) => x.toUpperCase()));

// Either

const Nothing = function (val) {
  this.value = val;
};

Nothing.of = function (val) {
  return new Nothing(val);
};

Nothing.prototype.map = function (f) {
  return this;
};

const Some = function (val) {
  this.value = val;
};

Some.of = function (val) {
  return new Some(val);
};

Some.prototype.map = function (fn) {
  return Some.of(fn(this.value));
};

const Either = {
  Some,
  Nothing,
};
