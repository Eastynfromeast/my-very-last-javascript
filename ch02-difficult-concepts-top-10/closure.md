# 02. 클로저 - 람다에서 왔어요

## 클로저의 정의

- A closure is _the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment)._

  - [mdn closure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
  - 자바스크립트에서 lexical envrionment는 모든 외부 스코프에 대한 참조와 함께 현재 스코프 내에서 정의된 변수와 함수를 저장하는 데이터 구조이다. "The lexical scope"라고도 알려져 있다. [ref.Lexical environment in JavaScript](https://medium.com/@mohdtalib.dev/lexical-environment-in-javascript-a2112b78a3cb)

- 함수가 선언될 당시의 Lexical Environment 의 상호관계에 따른 현상

  - 함수가 선언될 당시의 어휘적 환경가 lexical environment

- 비공개 변수를 가질 수 있는 환경에 있는 함수가 클로저

  - 비공개 변수? 다른 곳에서 접근 불가능한 프라이빗한 변수
  - 클로저를 통해서 함수 내부에서도 지역 변수에 접근할 수 있다
  - 비공개 변수를 통해 데이터를 은닉하고 상태를 유지할 수 있다

- 외부 변수를 기억하고 이 외부 변수에 접근할 수 있는 함수

## 클로저의 뜻

- 열린 변수를 닫힌 변수로 만드는 것

### 람다 대수 (Lambda calculus)

- 수학의 한 분야 : 계산의 기본 원리와 함수의 추상화, 함수 적용 등의 논리 연산을 다루는 형식 체계
- 함수형 프로그래밍의 중요한 기초 : 함수의 정의, 익명 함수, 고차 함수 등 다양한 개념의 이론적 기반을 제공
- 람다 함수 : 람다 표현식으로 익명 함수를 정의하기 위한 방법
- 사용처 : Python, JavaScript, Ruby, Haskell, C#, etc...

### 람다식 Lamda Expression

람다식은 자유 변수를 포함 여부에 따라 닫혔는지 열렸는지 구분됨

- 자유 변수(free variables) : 람다 표현식 내부에 정의되지 않고 외부에서 참조되는 변수
- 자유 변수는 람다 표현식 외부에서 정의되고, 람다 표현식 내에서는 단지 참조만 됨

- 닫힌 람다식 Closed Lambda Expression

  - 내부에 자유 변수가 없는 람다 표현식

- 열린 람다식 Open Lambda Expression
  - 하나 이상의 자유 변수를 포함하는 람다 표현식

### 묶인 변수 Bound Variables

- 클로저에 의해 "묶여진" 자유 변수
- 종속 변수(Dependent), 제한 변수(Restricted)
  - 종속적 : 람다 표현식 내부에서 정의되고 사용되기 때문
  - 제한적 : 특정 스코프나 조건에 제한되어 있기 때문
- 함수나 람다 표현식 등의 특정 스코프 내에서 정의된 변수
- _클로저가 활성 상태인 동안에는 가비지 콜렉터의 대상에서 제외_
  - 클로저가 해당 변수에 대한 참조를 유지 -> 가비지 콜렉터가 사용 중으로 간주, 메모리 해제를 하지 않음

---

# 03. 클로저 - 구현

## 일반적인 함수로 구현해보는 클로저

```
function createCounter() {
  let count = 0; // 최초에는 열린 변수
  return function () {
    // 익명 함수 <- 클로저의 핵심
    // 이 내부 함수는 클로저. 'count' 변수를 *닫힌 변수*로 만듦
    count += 1;
    return count;
  };
}

const counter = createCounter();

console.log(counter()); // 1 : counter 클로저가 count 변수를 기억/캡처함 == 함수의 호출이 끝났지만 count 값을 참조로 유지 -> 가비지 컬렉터가 수집하지 않고 그대로 상태를 유지할 수 있게 됨
console.log(counter()); // 2 : 같은 count 변수를 사용하고 업데이트
console.log(counter()); // 3 : count는 계속해서 업데이트 됨
```

## 콜백 함수로 구현해보는 클로저

- 클로저는 내부 함수가 외부 함수의 변수에 접근할 수 있기 헤주는 기능

  - 내부 함수를 리턴하면 클로저 생성
  - 이전 함수와는 달리 callback 이라는 매개변수를 가짐
    - callback? count 값이 변경될 때마다 호출이 될 함수

- createCounterWithCallback 함수를 호출하면서 인자에 콜백함수를 선언
- _핵심_
  - 클로저와 콜백함수를 통해 상태를 유지하고 - 상태 변경 시 마다 사용자 정의 동작을 실행하는 유연한 방식을 제공
  - => 클로저의 기본 코드를 변경하지 않으면서 기능 추가를 가능케 하면서 유연하게 확장

```
function createCounterWithCallback(callback) {
  let count = 0; // 외부 함수의 지역 변수

  return function () {
    count += 1;
    callback(count); // 콜백 함수에 현재 카운트 값을 전달
  };
}

// 사용 예시
const myCounterWithCallback = createCounterWithCallback(function (currentCount) {
  console.log('현재 카운트 : ', currentCount);
});

myCounterWithCallback(); // 현재 카운트 : 1
myCounterWithCallback(); // 현재 카운트 : 2
myCounterWithCallback(); // 현재 카운트 : 3
```

## 객체 메서드로 구현해보는 클로저

- 함수가 아닌 객체 returner를 선언
- _핵심_
  - 클로저를 사용해서 갹각의 createCounterWithMethod의 함수의 counter 값이 독립적으로 유지됨
  - == 각 객체의 인스턴스가 자신만의 상태와 메서드를 독립적으로 유지 가능

```
function createCounterWithMethod() {
  let count = 0;

  return {
    increment: function () {
      count += 1;
      return count;
    },
    getCurrentCount: function () {
      return count;
    },
  };
}

const counterWithMethod = createCounterWithMethod(); //  독립적인 카운트 값을 유지.
counterWithMethod.increment(); // createCounterWithMethod의 실행 컨텍스트가 종료된 후에도 지역 변수의 count에 접근 가능
// 내부 함수가 객체와 같은 형태로 외부에 노출되고, 외부 함수의 변수에 접근 하면클로저가 형성됨
console.log(counterWithMethod.getCurrentCount()); // 2
```

## 클로저 사용 시 유의사항

- 메모리 관리 & 성능 고려 : _메모리 누수_

  - 외부 함수가 종료된 후에도 메모리에 남게 되어 메모리 누수를 일으킬 가능성 -> 추가적인 메모리 리소스 사용할 가능성 증가

- 코드의 복잡성 : _유지보수 저하_

  - 코드의 복잡성 증가
  - 클로저는 이해하기 어렵고, 디버깅이 어려울 수 있음 > 가독성과 유지보수성을 염두에 둘 필요가 있음
    - 리액트 같은 라이브러리를 사용할 경우에는 클로저를 따로 구현할 필요 없음
    - 리액트 내부에서 클로저에 대한 메모리 관리를 이미 효율적으로 처리하고 있음

- Q. 클로저를 쓰지 않고도 count를 증가할 수 있지 있나요?

  ```
  let count = 0;
  function createCounterWithoutClosure(){
    return function(){
      count += 1;
      return count;
    }
  }

  const counter1 = createCounterWithoutClosure();
  console.log(counter1();) // 1
  console.log(counter1();) // 2
  console.log(counter1();) // 3
  ```
