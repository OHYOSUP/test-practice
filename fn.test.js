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

let num = 0;
// num에 계속 새로운 값이 할당되기 때문에 첫번째 테스트를 제외한 모든 test가 fail된다

// beforeEach = 함수가 실행되기 전 값을 설정
beforeEach(() => {
  num = 0;
});
// <=>
// aftereEach(()=>{
//   num = 0
// })

test("0더하기 1 은 1이다", () => {
  num = fn.add(num, 1);
  expect(num).toBe(1);
});
test("0더하기 2 은 2이다", () => {
  num = fn.add(num, 2);
  expect(num).toBe(2);
});
test("0더하기 3 은 3이다", () => {
  num = fn.add(num, 3);
  expect(num).toBe(3);
});

let user;

// beforeAll, afterAll은 각 테스트마다가 아니라 그 아래의 test 전체를 실행하기 전, 후에만 적용된다
beforeAll(async () => {
  user = await fn.connectUserDb();
});

afterAll(async () => {
  return (user = await fn.disConnectUserDb());
});

test("이름은 Mike", () => {
  expect(user.name).toBe("Mike");
});

// describe는 관련 작업을 하나로 묶는 것
// 고로 describe안에 있는 befreAll, afterAll은 descrobe안에서만 유효하다
describe("Car 관련 작업", () => {
  let car;

  beforeAll(async () => {
    car = await fn.connectCarDb();
  });
  afterAll(() => {
    return fn.disConnectCarDb();
  });

  test("이름은 cls", () => {
    expect(car.name).toBe("cls");
  });
  test("브랜드는 benz", () => {
    expect(car.brand).toBe("benz");
  });
  test("색깔은 black", () => {
    expect(car.color).toBe("black");
  });
});

const mockFn = jest.fn();

// mockFn();
// mockFn(1)

// test('이 함수는 2번 호출됩니다', ()=>{
//   expect(mockFn.mock.calls.length).toBe(2)
// })

// test('mock함수에 들어갈 첫번째 인자는 1이다.', ()=>{
//   expect(mockFn.mock.calls[1][0]).toBe(1)
// })

function forEachAdd1(arr) {
  arr.forEach((num) => {
    mockFn(num + 1);
  });
}

forEachAdd1([10, 20, 30]);

test("함수는 3번 호출됩니다", () => {
  expect(mockFn.mock.calls.length).toBe(3);
});

test("함수를 돌린 값은 11, 21, 31입니다", () => {
  expect(mockFn.mock.calls[0][0]).toBe(11);
  expect(mockFn.mock.calls[1][0]).toBe(21);
  expect(mockFn.mock.calls[2][0]).toBe(31);
});
// ===

const mockFnSecond = jest.fn((num) => num + 1);

mockFnSecond(10);
mockFnSecond(20);
mockFnSecond(30);

test("함수에 10을 넣은 값은 11이다", () => {
  expect(mockFnSecond.mock.results[0].value).toBe(11);
});
test("함수에 20을 넣은 값은 21이다", () => {
  expect(mockFnSecond.mock.results[1].value).toBe(21);
});
test("함수에 30을 넣은 값은 31이다", () => {
  expect(mockFnSecond.mock.results[2].value).toBe(31);
});

const getOddNumberMockFn = jest.fn();

getOddNumberMockFn
  .mockReturnValueOnce(true)
  .mockReturnValueOnce(false)
  .mockReturnValueOnce(true)
  .mockReturnValueOnce(false)
  .mockReturnValueOnce(true);

const result = [1, 2, 3, 4, 5].filter((num) => getOddNumberMockFn(num));

test('홀수는 1,2,3', ()=>{
  expect(result).toStrictEqual([1,3,5])
})

// mockResolvedValue = 비동기 함수 test


const mockFnTest = jest.fn()

mockFnTest(10, 20)
mockFnTest()
mockFnTest(30, 40)


test('한번 이상 호출', ()=>{
  expect(mockFnTest).toBeCalled()
})
test('정확히 세 번 호출?', ()=>{
  expect(mockFnTest).toBeCalledTimes(3)
})
test('10이랑 20을 전달받은 함수가 있는가', ()=>{
  expect(mockFnTest).toBeCalledWith(10, 20)
})
test('마지막 함수는 30이랑 40을 받았는가?', ()=>{
  expect(mockFnTest).lastCalledWith(30, 40)
})