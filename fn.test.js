const fn = require("./fn");

test("1은 1이다", () => {
  expect(1).toBe(1);
});

test("2 더하기 3은 5야", () => {
  expect(fn.add(2, 3)).toBe(5);
});

test("3 더하기 3은 5야", () => {
  expect(fn.add(3, 3)).not.toBe(5);
});

test("유저 만들기", () => {
  expect(fn.makeUser("Mike", 20)).toEqual({ name: "Mike", age: 20 });
});

test("무엇이든 false", () => {
  expect(fn.falsy(1, -1)).toBeFalsy();
});

test("무엇이든 true", () => {
  expect(fn.truthy(1, 2)).toBeTruthy();
});

// toBeGreatherThan : 크다
// toBeGreaterThanOrEqual : 크거나 같다
// toBeLessThan : 작다
// toBeLessThanOrEqual : 작거나 같다
test("아이디는 10자 이하여야 합니다", () => {
  const id = "The_black";
  expect(id.length).toBeLessThanOrEqual(10);
});

test("비밀번호 4자리", () => {
  const pw = "1234";
  expect(pw.length).toBe(4);
});

// 컴퓨터는 2진수를 사용하기 때문에 소수점을 2진수로 바꾸면 무한소수가 되는 경우가 있음. 그래서 소수점 연산은 toBeCloseTo()를 사용한다.
test("0.1 더하기 0.2는 0.3일까?", () => {
  expect(fn.add(0.1, 0.2)).toBe(0.3);
});

test("0.1 더하기 0.2는 0.3일까?", () => {
  expect(fn.add(0.1, 0.2)).toBeCloseTo(0.3);
});

test("Hello world에서 a라는 글자가 있나?", () => {
  expect("Hello world").toMatch(/a/);
});

test("유저 리스트에 Mike가 있나?", () => {
  const user = "Mike";
  const userList = ["Tom", "Jane", "Mike"];
  expect(userList).toContain(user);
});

test("에러가 나오는가?", () => {
  expect(() => fn.throwErr()).toThrow("xx");
});

// 비동기 함수를 테스트할 때에는 done을 인자로 받아서 사용.
// done이라는 함수가 실행되기 전까지 jest 는 test를 끝내지 않고 기다린다
test("3초 후에 받아온 이름은 Miike", (done) => {
  function callback(name) {
    expect(name).toBe("Mike");
    done();
  }
  fn.getName(callback);
});

// Promise를 받는 jest는 done이 필요없다, 단 return을 꼭 써줘야 한다
test("Promise를 받은 jest는 어떨까?", () => {
  return fn.getAge().then((age) => {
    expect(age).toBe(31);
  });
});

// 더 간단한 버전
test("Promise를 받은 jest 어떨까?2", () => {
  return expect(fn.getAge()).resolves.toBe(30);
});

// reject상황 테스트
test("Promise를 받은 jest의 reject상황 테스트", () => {
  return expect(fn.getAgeFailed()).rejects.toMatch("error");
});

// async await
test("async await test", async () => {
  const age = await fn.getAge();
  expect(age).toBe(30);
});
