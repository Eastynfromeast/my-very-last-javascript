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

/*
  스코프 : 어떤 변수와 함수에 접근할 수 있는지 결정하는 규칙
*/
function outer() {
	let localLet = '지역 변수';
	console.log(globalLet); // 실행 컨텍스트의 스코프 체인 덕분에 접근 가능
	console.log(localLet);
}
outer();

/*
  실행 컨텍스트의 예시 코드
    'outer 컨텍스트':{
      VariableEnvironment: {
        localLet : '지역 변수'
      },
      'scopeChain': ['outer 변수 객체', '전역 변수 객체'], // 외부 스코프에 대한 참조도 포함
    }
*/

/*
  함수 호출과 실행 컨텍스트의 스택
    - 실행 컨텍스트를 구성하는 방법 : 함수를 실행하는 것 
    - 여러 함수가 실행될 때 실행 컨텍스트는 어떻게 관리되는가?
*/
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

/*
  LexicalEnvironment는 일종의 객체
  'outer 함수의 LexicalEnvrionment' : {
    EnvironmentRecord : {
      a : 1, // outer 함수 내부의 지역 변수
      inner : // inner 함수의 참조
    },
    OuterLexicalEnvrionment : // 전역 환경의 LexicalEnvironment 참조
  }
*/

/*
  함수 스코프의 원리 구현
*/
const a = 1;
const outerFn1 = () => {
	console.log('a: ', a);
};
outerFn1(); // a: 1 <- outerFn1가 전역 변수 a에 접근 가능함을 의미
/*
  a: 1 <- outerFn1가 전역 변수 a에 접근 가능함을 의미
  어떻게 가능하냐? LexicalEnvrionment와 Outer LexicalEnvironment 때문
  - Outer Lexical Environment는 outerFn1의 외부 환경, 즉 전역 환경에 관한 것들을 참조
  - outerFn1 에서 변수 a에 대해 참조하려고 할 때
    - outerFn1에서 변수 a에 대해 먼저 찾고
    - 만약 함수 내부에 없다면 Outer Lexical Environment를 통해 상위 스코프인 전역 환경에서 변수 a를 찾게 됨
*/

/*
  클로저가 어떻게 생성되는지 inner함수의 LexicalEnvrionment 알아보기
  'inner 실행 컨텍스트' : {
    LexicalEnvrionment : {
      EnvrionmentRecord : {
        // inner 함수 내부의 지역 변수들이 여기에 포함될 것 (이 경우는 비어 있음 - 별도의 함수나 변수가 없었기 때문)
      },
      OuterLexcialEnvrionment : 'outer 함수의 LexcialEnvrionment' // 이 참조 덕분에 inner 함수가 outer 함수의 변수 a에 접근 가능
    }
  }
*/
