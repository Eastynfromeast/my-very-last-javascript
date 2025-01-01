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
