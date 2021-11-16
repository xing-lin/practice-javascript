function test() {
  console.log(2);
}

Function.prototype.before = function (fn) {
  const _this = this;
  return function () {
    if (fn() === false) {
      return false;
    }
    return _this.apply(_this, arguments);
  };
};

Function.prototype.after = function (fn) {
  const _this = this;
  return function () {
    const result = _this.apply(_this, arguments);
    if (result === false) {
      return false;
    }
    fn();
    return result;
  };
};

test
  .after(function () {
    console.log(3);
  })
  .before(function () {
    console.log(1);
    return false;
  })();
