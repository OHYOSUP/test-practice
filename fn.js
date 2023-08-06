const fn = {
  add: (num1, num2) => num1 + num2,
  makeUser: (name, age) => ({ name, age }),
  falsy: (num1, num2) => false,
  truthy: (num1, num2) => true,
  throwErr: () => {
    throw new Error("xx");
  },
  getName: (callback) => {
    const name = "Mike";
    setTimeout(() => {
      callback(name);
    }, 1000);
  },
  getAge: () => {
    const age = 30;
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(age);
      }, 1000);
    });
  },
  getAgeFailed: () => {
    const age = 30;
    return new Promise((res, rej) => {
      setTimeout(() => {
        rej("error");
      }, 1000);
    });
  },

  connectUserDb: () => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res({
          name: "Mike",
          age: 30,
          gender: " male",
        });
      }, 500);
    });
  },
  disConnectUserDb: () => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res();
      }, 500);
    });
  },

  connectCarDb: () => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res({
          name: "cls",
          brand: 'benz',
          color: "black",
        });
      }, 500);
    });
  },
  disConnectCarDb: () => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res();
      }, 500);
    });
  },
};

module.exports = fn;
