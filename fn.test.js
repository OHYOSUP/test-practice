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

test('에러가 나오는가?', ()=>{
  expect(()=> fn.throwErr()).toThrow('xx')
})

