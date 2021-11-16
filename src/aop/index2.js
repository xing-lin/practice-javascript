function factory(fn, _before, _after) {
  return function () {
    _before && "function" === typeof _before && _before.call(this);

    fn.call(this);

    _after && "function" === typeof _after && _after.call(this);
  };
}

const before = () => {
  console.log("1");
};
const after = () => {
  console.log("3");
};

factory(
  function () {
    console.log(2);
  },
  before,
  after
)();
