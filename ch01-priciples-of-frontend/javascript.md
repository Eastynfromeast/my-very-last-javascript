# 09. JavaScript 필수 기초 개념 - 변수와 데이터 타입

- 변수 = 상자/컨테이너?
  - 데이터 저장
  - 라벨링 : 변수 이름으로 데이터를 라벨링하고 저장

## 자바스크립트 변수 키워드

- let

  - 재할당 가능
  - 초기값 할당 선택
  - 블록 스코프 : 중괄호 '{}' 유효 범위. 작고 제한적이라 버그가 발생할 가능성을 줄여줌
    - scope? 접근 가능한 범위
    - var 의 경우 function scope라 함수 내에서 선언된 뒤에는 함수 내에서 접근 가능

- const

  - 상수 : constant. 변경 불가
  - 초기값 할당 필수
  - 블록 스코프

- Q.언제 const를 사용하고 언제 let을 사용하나요?
  - 기본적으로 const를 사용하되, 값이 변경될 필요가 있는 경우 let으로 선언
  - 왜?
    - 버그 방지
    - 코드의 이해도 쉬워짐
    - 코드의 예측 가능성도 높아짐
    - 실수로 상수 값을 변하는 일을 방지

## 데이터 타입

- 아래의 구분은 자바스크립트가 데이터를 처리하는 방식의 근간을 이룸

### 기본형 데이터 타입 Primitive

- 불변하는 값을 나타냄
- 종류
  - number : 숫자
  - string : 문자열
  - boolean : true or false
  - null : 값이 없음
  - undefined : 값이 할당되지 않은 상태
  - symbol : 유일하고 변경 불가능한 기본 값
- 스택 메모리에 직접 값을 저장

### 참조형 데이터 타입 Reference

- 종류
  - 객체 : 키와 값으로 이루어진 구조
  - 배열 : 순서가 있는 값의 목록
  - 함수 : 실행 가능한 코드 블록
- 힙 메모리에 객체를 저장 -> 그 참조를 스택 메모리에 저장

---

# 10. JavaScript 필수 기초 개념 - 조건문, 반복문

## 조건문

- 복잡한 논리적 판단과 결정을 내리는 역할

### JS 주요 조건문

- if 문 : 주어진 조건이 true 일 떄 실행
- switch 문 : 케이스 기반 구조

- Q. 언제 if문을 사용하고 언제 switch 문을 사용하나요?
  - (이론적으로는) if문은 범위 검사 및 다양한 조건 평가에 유리, switch 문은 한 변수의 구체적인 값에 대한 분기 처리
  - 실제 개발 환경에서는 명확하게 적용되지는 않음
  - 코드의 가독성을 기준으로 선택해 사용하는 것을 추천

## 반복문

- 중복 작업을 처리하며, 코드의 재사용성을 높이고, 복잡한 문제를 해결하는 역할
- 특정 조건이 만족될 때까지 동일한 반복을 계속 수행
- 대규모 데이터 처리, 복잡한 알고리즘 처리에 효과적

### JS 주요 반복문

- map : 각 요소에 주어진 함수를 실행하고 *새 배열*로 변환
- forEach : 배열의 각 요소에 대해 주어진 함수 실행. 반환값 없음
- for : 특정 횟수만큼 반복 수행. 반복 횟수가 명확하거나, 배열과 다른 데이터 타입을 순회할 때 사용
- while : 조건이 true 인 동안 계속 실행. 사용자 입력을 기다리거나 특정 조건이 충족될 때까지 반복이 필요할 때 사용

- Q. forEach와 map의 차이는?

  - A. 결과값의 반환 여부
    - forEach는 undefined 반환. 배열의 각 요소에 대한 부작용을 발생시키는 작업에 사용. 단순 반복 작업에 적합
      - console에 찍거나 외부 변수를 변경할 때
    - map은 결과를 새로운 배열로 반환. 데이터 변환 작업에 적합

- Q. map 대신 forEach를 써도 될까요?
  - A. 데이터 변환 작업에서는 map 사용을 권장
    - map은 함수형 프로그래밍의 불변성의 원칙을 위반하지 않음
      - 불변성의 원칙
        - 데이터의 상태 변화 추적 가능
        - 버그 발생 가능성 감소
        - 코드의 예측 가능성 증가

---

# 11. JavaScript 필수 기초 개념 - 함수

## 함수란?

- 특정 작업을 수행하는 코드의 블록으로, 입력(매개변수)을 받아 처리한 후 결과(반환값)을 출력

## JS 주요 함수

- 일반 함수 - 함수 선언문(호이스팅) : function 키워드, 함수 이름, 매개변수 목록, 중괄호로 둘러쌓임
  ```
  function add(x,y){
    return x+y;
  }
  const result = add(5,10);
  ```
- 함수 표현식 (익명함수 등) : 함수를 변수에 할당하는 방식.
  - 호이스팅이 되지 않음
  ```
  const add = function(x,y){
    return x+y;
  }
  ```
- 화살표 함수 : 짧은 문법을 가진 함수로 ,=> 기호 사용.
  - 자신만의 this를 가지지 않고 상속 받음
  ```
  const add = (x,y) => x+y;
  ```
- 즉시 실행 함수 : 선언과 동시에 실행되는 함수

  - 애플리케이션 혹은 특정 기능의 초기화 코드 실행 시 사용됨
  - 다시 실행하는 것을 방지 가능

  ```
  (function(){
    console.log("즉시 실행");
  })();
  ```

- Q. 함수를 잘 만들려면?
  - A. 작게 또 작게 (단일 책임 원칙 SRP)
    - 장점
      - 가독성과 이해도 향상
      - 재사용성 증가
      - 디버깅과 오류 수정 용이성
      - 유지 보수의 간소화
      - 효율적인 협업 : 이해가 쉽기 때문
      - 테스트와 검증 용이성
    - 단점
      - 코드가 많아진다

---

# 12. JavaScript 필수 기초 개념 - 객체

## 객체란?

- 데이터와 그 데이터에 관련된 동작을 함께 묶는 것
  - 속성 : 객체가 가진 데이터
  - 메서드 : 함수

## 자바스크립트의 객체

### 프로토타입과 상속

- 자바스크립트는 프로토타입 기반의 객체지향 언어 <-> 클래스 지향 언어 ex. Java
- 자바스크립트에서 모든 객체는 Prototype 객체를 상속 -> 객체는 다른 객체의 프로퍼티와 메서드를 상속받아 확장 가능
- 프로토타입 체인을 통해 특정 속성이나 메서드에 접근

### 생성자 함수

- 자바스크립트 속 객체지향 프로그래밍의 도구 중 하나
- 특정 타입의 객체를 반복적으로 생성하기 위해 사용되는 함수
  - 인스턴스 (생성된 객체) 생성
- `function Person(name){this.name = name;}`

### 클래스

- ES6 이후 클래스 기반 객체 생성을 지원
- 생성자 함수로 동작하며, 보다 명확하고 이해하기 쉬운 방식으로 객체를 생성
- `class Person{ constructor(name) { this.name = name;}}`

- Q. 자바스크립트는 함수도 객체다?
  - A. JS에서 함수는 객체이므로, 함수에 프로퍼티와 메서드를 추가할 수 있음
    - 함수에 언제든지 속성 추가가 가능 why? 프로토타입 기반의 상속 매커니즘은 동적으로 속성 등을 추가할 수 있도록 함

---

# 13. JavaScript 필수 개념 - 표준 내장 객체와 DOM API

- 표준 내장 객체 : JS 엔진에 있는 객체들
  - 필요할 때 마다 어떤 환경에서도 사용할 수 있게 구현되어 있음
  - 엔진 : V8, SpiderMonkey
  - ECMA Script의 표준을 따름
- DOM API : 브라우저에 내장되어 있는 API

## 표준 내장 객체

### 표준 내장 객체의 종류

필요할 때 마다 mdn에서 찾아 보는 것이 효과적

1. Object : 모든 객체의 기본
2. Function : 모든 자바스크립트 함수의 기본이 되는 객체
3. Boolean : 불리언 타입을 다루는 객체
4. Symbol : 고유하고 변경 불가능한 데이터 타입
5. Error : 에러 처리에 사용되는 객체
6. Number : 숫자를 다루는 객체
7. Math : 수학적 연산을 위한 속성과 메서드를 가진 객체
8. String : 문자열을 다루는 객체
9. Date : 날짜와 시간을 다루는 객체
10. RegExp : 정규 표현식을 다루는 객체

## DOM API

브라우저 환경에 특화된 기능을 제공하는 내장 도구
HTML 문서의 콘텐츠와 구조를 동적으로 조작할 수 있는 인터페이스 제공

### Document Object Model

- 문서 접근 (Document Access) : document 전체 HTML 문서에 접근. getElementById, querySelector
- 요소 조작 (Element Manipulation) : createElement, appendChild
- 이벤트 처리 (Event Handling) : addEventListener, removeEventListener
- 동적 조작 (Dynamic Manipulation) : AJAX 와 같은 기술로 비동기 통신

- 궁금하면 읽어보기 [만들어가며 알아보는 React](https://techblog.woowahan.com/8311/)
  - DOM과 DOM API의 복잡성
  - React가 DOM API를 다루는 방식
  - React가 DOM을 효율적으로 관리하고 업데이트하는 방식
  - 가상 DOM API를 이용해 리얼 DOM으로 렌더링하기
