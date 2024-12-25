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
