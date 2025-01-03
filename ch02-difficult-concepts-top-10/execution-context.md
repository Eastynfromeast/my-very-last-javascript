# 05. 실행 컨텍스트 - 기본

## 함수 스코프와 클로저

- Function Scope

  - 함수가 선언된 위치에 따라 결정됨 == lexical scoping
  - 실행 컨텍스트가 생성될 때,각 함수는 자신의 Lexical Environment를 가짐
    - lexical envrionment? 함수 내부에서 선언되는 변수, 함수 선언, 매개 변수 등
  - 함수의 Lexical Environment는 또한 Outer Lexical Environment를 포함하는데, 이는 함수가 선언된 외부 환경(== 상위 스코프)를 참조
    - 함수가 선언되면 새로운 실행 컨텍스트가 스택에 푸시됨
    - 이 컨택스트는 해당 함수의 스코프를 결정

- Closure
  - 내부 함수가 선언된 외부 함수의 실행 컨텍스트에 대한 참조를 유지할 때 발생
  - 외부 함수의 실행 컨텍스트가 종료되어 콜 스택에서 제거되더라도, 내부 함수는 외부 함수의 Lexical Environment에 대한 참조를 유지
    - 내부 함수는 외부 함수의 변수 및 함수에 접근 가능 (클로저의 특징)
    - 외부 함수를 참조함으로써 가비지 컬렉터에 수집되지 않음

## 실행 컨텍스트는 코드가 실행될 때 필요한 모든 정보를 포함

- 일종의 책상 : 공부할 때 필요한 모든 것을 담고 있는 공간
- 실행 컨텍스트 : 코드의 실행 환경 및 상태를 나타내는 추상적인 개념
  - 코드가 실행될 때 필요한 모든 정보와 상태를 담고 있는 가상의 작업 공간
  - 자바스크립트 엔진이 가상의 작업 공간에 달려 있는 것
  - 프로그래밍 실행 흐름을 제어하는데 필수
  - 변수, 객체, 함수 호출 등 코드에 필요한 여러 세부 사항들을 포함
  - 함수형 프로그래밍 언어와 스크립트 언어의 발전에 중요한 역할을 해옴

### 책상 비유

- 변수 및 함수 : 책상 위에 있는 작업에 필요한 여러가지 물건들
- 스코프와 생명 주기 (책상의 정리) : 한 작업이 끝나면 필요없는 물건들이 정리되는 것처럼 실행 컨텍스트가 끝나면 그 안에 있던 변수, 함수들은 사라지거나 다음 작업으로 넘어감
- this 키워드 (책상의 주인) : this? 현재 실행 컨텍스트의 주인
  - 실행 컨텍스트에 수행되는 작업을 지시
  - 실행 컨텍스트가 생성될 때 this와 바인딩됨
- 함수 호출과 실행 컨텍스트 스택 (다수의 책상) : 함수 호출이 중첩되면 책상이 여러개 생기는 것과 비슷

### 코드 예시로 알아보자

#### 실행 컨텍스트 예시

```
// 전역 실행 컨텍스트에 포함
let globalLet = 'Hello World';
function globalFunction() {
	return 'Hello Global Function';
}

// 이해를 위해 객체 형태로 설명. 실제 자바스크립트 엔진에서의 동작과는 다름
globalExecutionContext = {
	VariableEnvironment: {
		// 전역 변수와 전역 함수를 포함하는 변수 객체
		globalLet: 'Hello World',
		globalFunction: <function reference></function>,
	},
	this: window, // 함수가 어떻게 호출되는지에 따라 달라짐. this는 자동으로 생성되고 포함됨
};
```

#### 스코프 : 어떤 변수와 함수에 접근할 수 있는지 결정하는 규칙

- 스코프 체인이 어떻게 실행 컨텍스트를 통해서 참조할 수 있는지 알아보기
  - 함수에서 전역 변수를 참조

```
let globalLet = 'Hello World';
function outer() {
	let localLet = '지역 변수';
	console.log(globalLet); // 실행 컨텍스트의 스코프 체인 덕분에 접근 가능
	console.log(localLet);
}
outer();

// 실행 컨텍스트의 예시 코드
  'outer 컨텍스트':{
    VariableEnvironment: {
      localLet : '지역 변수'
    },
    'scopeChain': ['outer 변수 객체', '전역 변수 객체'], // 외부 스코프에 대한 참조도 포함
  }
```

#### 함수 호출과 실행 컨텍스트의 스택

- 실행 컨텍스트를 구성하는 방법 : 함수를 실행하는 것
- 여러 함수가 실행될 때 실행 컨텍스트는 어떻게 관리되는가?

```
let globalVar = '전역 변수';

function outerFn() {
	console.log(globalVar);
	function innerFn() {
		var innerVar = '내부 변수 함수';
		console.log(innerVar);
	}
	innerFn();
}
outerFn();

/*
  호출 스택 흐름 설명
                                innerFn() EC
            -> outerFn() EC ->  outerFn() EC -> outerFn() EC ->
  global EC    global EC        global EC       global EC       global EC

*/
```

### Q. 전역 변수는 왜 메모리 누수를 일으킬까요?

- A. global 실행 컨텍스트는 프로그래밍이 종료될 때까지 호출 스택에 계속 남아 있으니까
  - 전역 변수가 많을 수록 사용되는 메모리의 양 증가
  - 큰 객체나 배열을 전역 변수로 저장하면 메모리 사용량이 더욱 증가할 수 있어
  - 전역 변수는 가비지 컬렉터에 자동으로 수집되지 않음
- 권장 사항
  - 가능한 한 함수 내부에서 지역 변수를 사용하고 전역 변수의 사용을 최소화 하는 것이 좋음
  - 모듈 패턴이나 자바스크립트의 최신 모듈 시스템을 사용해 전역 네임 스페이스의 오염 방지 가능
  - 관련된 여러 전역 변수들을 객체 속성으로 그룹화해 관리 가능
  - 전역 변수는 최대한 신중하고 조심히 사용하는 것이 좋음
  - 코드의 구조화와 적절한 스코프 관리로 보다 효율적이고 안정적인 애플리케이션이 가능해짐

# 06. 실행 컨텍스트 - 심화

## 스택(Stack)과 큐(Queue)

- 스택

  - 후입 선출 (LIFO) _Last In First Out_
  - 마지막에 들어온 데이터가 가장 먼저 나가는 구조
  - 푸시(push) : 데이터 추가
  - 팝(pop) : 데이터 제거
  - 실행 컨텍스트(호출 스택)에 사용

- 큐
  - 선입 선출 (FIFO) _First In First Out_
  - 인큐(enqueue) : 데이터 추가
  - 디큐(dequeue) : 데이터 제거
  - 이벤트 루프, 네트워크 요청 처리 등에 사용

## 활성 객체 Activation Object

실행 컨텍스트의 일부로서 특정 스코프의 변수와 함수 선언들을 저장하는 객체

- Lexical Envrionment
- 실행 컨텍스트와 관련된 스코프와 식별자에 대한 정보를 포함
- _Environment Record_
- _외부 렉시컬 환경 참조 (Outer lexical envrionment reference)_

  - 외부 렉시컬 환경 참조 때문에 가능하다?

### 예시

```
/*
  실행 컨텍스트 관점에서 클로저가 실행되는 예시
  - 내부 구현 원리는? 활성 객체 Activation Object
*/
const outer = function () {
  let a = 1;
  const inner = function () {
    return ++a;
  };
  return inner;
};

const count = outer();
console.log(count()); // 2
console.log(count()); // 3
```

#### outer 함수의 LexicalEnvrionment

```
  // LexicalEnvironment는 일종의 객체
  'outer 함수의 LexicalEnvrionment' : {
  EnvironmentRecord : {
  a : 1, // outer 함수 내부의 지역 변수
  inner : // inner 함수의 참조
  },
  OuterLexicalEnvrionment : // 전역 환경의 LexicalEnvironment 참조
  }
```

#### 클로저가 어떻게 생성되는지 inner함수의 LexicalEnvrionment 알아보기

```
  'inner 실행 컨텍스트' : {
    LexicalEnvrionment : {
      EnvrionmentRecord : {
        // inner 함수 내부의 지역 변수들이 여기에 포함될 것 (이 경우는 비어 있음 - 별도의 함수나 변수가 없었기 때문)
      },
      OuterLexcialEnvrionment : 'outer 함수의 LexcialEnvrionment' // 이 참조 덕분에 inner 함수가 outer 함수의 변수 a에 접근 가능
    }
  }
```

### 함수 스코프의 원리 구현

```
const a = 1;
const outerFn1 = () => {
	console.log('a: ', a);
};
outerFn1(); // a: 1 <- outerFn1가 전역 변수 a에 접근 가능함을 의미
```

- a: 1 <- outerFn1가 전역 변수 a에 접근 가능함을 의미
- 어떻게 가능하냐? LexicalEnvrionment와 Outer LexicalEnvironment 때문
  - Outer Lexical Environment는 outerFn1의 외부 환경, 즉 전역 환경에 관한 것들을 참조
  - outerFn1 에서 변수 a에 대해 참조하려고 할 때
    - outerFn1에서 변수 a에 대해 먼저 찾고
    - 만약 함수 내부에 없다면 Outer Lexical Environment를 통해 상위 스코프인 전역 환경에서 변수 a를 찾게 됨

## 실행 컨텍스트 간단 정리

실행 컨텍스트? 코드가 실행되는 환경이나 상태

- 주요 구성 요소 : 변수 환경, this, 스코프 체인

  - 변수 환경 : 함수, 전역 코드 내에서 선언된 변수와 함수를 포함
    - 코드가 실행되는 동안 지속적으로 갱신됨
  - 실행 컨텍스트는 this 키워드의 값을 결정
    - 이 값은 함수가 어떻게 호출되었는지에 따라서 다르게 결정됨
  - 실행 컨텍스트는 하위 스코프 체인을 형성
    - 현재 컨텍스트의 변수 환경과 상위 컨텍스트의 변수 환경을 연결

- 실행 컨텍스트는 함수가 호출이 될 때마다 생성됨 => 콜 스택을 형성하는 기반
- 전역 실행 컨텍스트는 계속 실행됨 -> 전역 변수가 많으면 메모리 누수 가능성 증가
- 실행 컨텍스트의 스코프 체인은 클로저의 구현과 밀접한 관련이 있음
- 실행 컨텍스트의 핵심 구성 요소 중 하나인 LexicalEnvironment
  - EnvironmentRecord : 현재 컨텍스트 내의 식별자와 그에 연결된 변수, 함수 선언 저장
  - OuterLexcialEnvironment : 상위 컨텍스트의 LexicalEnvironment를 참조
    - 이 참조 덕분에 함수는 상위 스코프의 변수에 접근 가능
    - => 함수 스코프와 클로저의 구현에 필수적인 요소
- 호이스팅도 실행 컨텍스트와 밀접한 관련 있어
  - 변수와 함수의 선언은 호이스팅이 되고, 호이스팅은 코드가 실제로 실행되기 전에 처리됨
- 실행 컨텍스트는 자바스크립트 내부 메커니즘
