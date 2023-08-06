const fn = {
  add: (num1, num2) => num1 + num2,
  makeUser: (name, age) => ({ name, age }),
  falsy: (num1, num2) => false,
  truthy: (num1, num2) => true,
  throwErr: () => {
    throw new Error("xx");
  },
};

module.exports = fn;
