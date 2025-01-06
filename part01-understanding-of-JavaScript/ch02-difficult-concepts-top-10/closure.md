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

# 04. 클로저 - 활용과 적용 사례

## 클로저를 사용하는 주요 이유

> 함수형 프로그래밍에서 매우 중요한 역할을 하며, 특히 변수의 유효 범위와 데이터 캡슐화 등에 크게 이점이 있음.
> 코드를 보다 유연하고 효율적으로 작성할 수 있게 함

- 캡슐화 Encapsulation

  - 캡슐화? 데이터와 그 데이터를 조작하는 함수를 하나의 단위(클래스 or 모듈) 같은 구조 안에 묶는 기법
  - 클로저 == 자바스크립트에서 캡슐화를 구현하는 방법
  - 함수를 통해서만 데이터에 접근하도록 제한함으로써 캡슐화를 달성

- 데이터 은닉 Data Hiding

  - 스코프로부터 독립된 변수를 가져서 외부로부터 보호 가능
  - 보호 == 외부 코드에 의해 임의로 코드가 변경되는 것을 방지
  - 오직 정의된 함수를 통해서만 조작 가능

- _상태 유지_
  - 어떤 데이터의 값을 시간이 지나도 유지
  - 클로저는 함수가 생성될 때의 환경을 _기억_ 하며 이를 통해 해당 환경의 변수들의 상태를 유지
  - 외부 영향으로부터 독립적
  - => 커링함수의 지연실행을 가능케 함

## 커링 함수 Currying

> 클로저의 대표적인 사용 사례

- Haskell Curry(수학자) 이름에서 유래
- 여러 인자를 받는 함수 =(변환)=> 단일 인자를 받는 함수
  - 각각의 인자를 순차적으로 받는 연속된 함수의 체인으로 만듦
  - 커링된 함수는 하나의 인자를 받고, 그 인자를 기억하며 다음 인자를 받기 위한 새로운 함수를 반환
  - 모든 인자가 제공될 때까지 계속됨
- 함수의 재사용성과 모듈성을 높임
- 지연 실행 및 함수의 부분 적용 가능

### 커링 함수의 부분 적용

- 반복되는 인자를 가진 함수 호출에서 활용됨
- 함수 호출 시 필요한 매개변수의 수를 줄일 수 있음
- 각 함수가 명확한 목적을 가지고 정확하게 동작하게 함

```
function createLogger(type) {
	return function (message) {
		console.log(`[${type}] ${message}`);
	};
}
/*
  각각의 로거함수를 호출
  - 목적 : 로그 유형을 설정
  - HOW? 함수의 일부 인자를 미리 사용해 type 설정
*/
const errorLogger = createLogger('ERROR');
const infoLogger = createLogger('INFO');
const warningLogger = createLogger('WARNING');

/*
각각의 로거함수의 메시지 입력
  - 목적 : 실제 로그 메시지를 처리
  - HOW? 해당 함수가 생성될 때의 type을 기억하고 사용하여 message에 조합해 출력
  - 각각의 로거함수는 동일한 인터페이스를 유지하면서 다른 유형의 로그 처리를 가능하게 함 => 중복없이 재사용 가능
*/
errorLogger('이것은 에러 메시지입니다.'); // [ERROR] 이것은 에러 메시지입니다.
infoLogger('이것은 정보 메시지입니다.'); // [INFO] 이것은 정보 메시지입니다.
warningLogger('이것은 경고 메시지입니다.'); // [WARNING] 이것은 경고 메시지입니다.
```

### 커링 함수의 지연 실행

- 많은 라이브러리 및 미들웨어 사용되고 있는 개념
- 지연 실행? 필요할 때까지 계산을 연기
- 함수가 모든 인자를 받을 때까지 실행을 지연시키는 방식
- 함수의 인자를 보다 유연하게 관리할 수 있도록 함 : 인자 적용을 나중에 할 수 있으니까

```
function add(a) {
	// 클로저 형성을 위해 내부 익명 함수를 리턴
	return function (b) {
		// 내부 익명 함수를 다시 리턴
		return function (c) {
			return a + b + c;
		};
	};
}
console.log(add(1)(2)); // 인자 부족 -> 지연실행으로 함수가 실행되지 않아 답이 없음
console.log(add(1)(2)(3)); // 6
```

### Redux의 미들웨어 구조

- 애플리케이션의 상태 관리를 유연하고 효과적으로 만듦
- 미들웨어를 통해 비동기 작업, 로깅, 에러 처리 등 다양한 부가 기능을 애플리케이션에 통합할 수 있음

```
const middleware = store => next => action => {
  // 미들웨어 로직 : 각각의 인자를 차례대로 받음
  // store 함수 : 현재 상태 조회(get method) 및 새로운 액션 dispatch 가능
  // next 함수: action은 다음 미들웨어로 전달하거나, 미들웨어 체인의 마지막이라면 reducer로 전달
  // action 함수 : 실제로 dispatch된 액션을 매개변수로 받음. 필요한 로직을 수행 하거나 할 일을 함
};

```

## Q.리액트에서 클로저가 구현된 사례는 무엇이 있을까요? - 라이브러리에서의 실제 사례

클로저를 통해서 어떻게 리액트 기능이 만들어질 수 있는지 이해
(실제로 클로저를 통해서 만들었는지 여부와는 별개)

### useState(hook)

Hook? 함수 컴포넌트에서도 상태(state)를 가지고 수정할 수 있는 기능

- 클래스 컴포넌트는 해당 인스턴스에서 필요한 부분만을 업데이트해서 context 상태를 유지
- 함수 컴포넌트는 상태가 변경될 때마다 새로운 인스턴스를 생성하기 때문에 초기화된 상태만을 가질 수 있었으나 hook의 도입으로 이러한 제약이 해결됨
- => 함수 컴포넌트도 클래스 컴포넌트와 유사한 상태 관리 및 생명 주기 기능을 수행할 수 있게 됨
- 함수 컴포넌트가 다시 실행되어도, 해당 함수의 상태(state)값이 초기화되지 않고, React에 의해 사라지지 않음

#### useState 구현해보기

- 함수 컴포넌트가 클로저를 사용해 상태를 관리하는 기본적인 아이디어 확인용
- 실제 리액트에서는 훨씬 복잡한 내부 메커니즘을 가지고 있음

```
function createUseState() {
	let state; // 상태를 저장하는 변수
	function setState(newState) {
		state = newState;
		render(); // 상태가 변경되었을 때 UI를 업데이트하는 함수
	}
	function useState(initialState) {
		state = state === undefined ? initialState : state;
		return [state, setState];
	}
	return useState; // 클로저가 생성됨
}
```

### useEffect의 클로저 트랩

- useEffect 훅은 사이드 이펙트를 처리하는데 사용
  - 사이드 이펙트? 컴포넌트의 렌더링 이후에 수행되는 작업들
  - ex. 네트워크 요청, DOM 조작, 이벤트 리스너 etc
- useEffect는 의존성 배열을 제공
  - 특정 값의 변화에 따른 useEffect의 실행 시기를 설정 가능
  - 왜 의존성 배열에 특정 상태를 명시해야 할까?
    - 클로저 트랩을 피하기 위함
    - useEffect의 fallback이 컴포넌트가 렌더링 될 시점의 상태와 props를 캡처할 수 있도록 해줌 == closure
    - 의존성 배열에 특정 상태가 명시되지 않을 경우, 상태가 변경되어도 useEffect의 fallback 함수는 변화를 인지하지 못하고 초기값만을 계속해서 참조하게 됨
    - 의존성 배열에 특정 상태가 명시되었을 경우에는, 상태의 변화에 따라 useEffect의 fallback 함수가 생성되어, fallback 함수는 항상 최신의 상태값을 기억할 수 있음

```
useEffect(() => {
	const connection = createConnection(serverUrl, roomId);
	connection.connect();
	return () => {
		connection.disconnect();
	};
}, [serverUrl, roomId]);
```
