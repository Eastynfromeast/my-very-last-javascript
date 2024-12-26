/*
  일반적인 함수로 구현해보는 클로저
*/
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

/*
  콜백 함수로 구현해보는 클로저
	- 클로저는 내부 함수가 외부 함수의 변수에 접근할 수 있기 헤주는 기능
	- 내부 함수를 리턴하면 클로저 생성
	- 이전 함수와는 달리 callback 이라는 매개변수를 가짐 
		- callback? count 값이 변경될 때마다 호출이 될 함수 
*/
function createCounterWithCallback(callback) {
	let count = 0; // 외부 함수의 지역 변수

	return function () {
		count += 1;
		callback(count); // 콜백 함수에 현재 카운트 값을 전달
	};
}

/*
	사용 예시
	createCounterWithCallback 함수를 호출하면서 인자에 콜백함수를 선언
	* 핵심! *	
		- 클로저와 콜백함수를 통해 상태를 유지하고 
		- 상태 변경 시 마다 사용자 정의 동작을 실행하는 유연한 방식을 제공
			=> 클로저의 기본 코드를 변경하지 않으면서 기능 추가를 가능케 하면서 유연하게 확장
*/
const myCounterWithCallback = createCounterWithCallback(function (currentCount) {
	console.log('현재 카운트 : ', currentCount);
});

myCounterWithCallback(); // 현재 카운트 : 1
myCounterWithCallback(); // 현재 카운트 : 2
myCounterWithCallback(); // 현재 카운트 : 3

/*
  객체 메서드로 구현해보는 클로저
	- 함수가 아닌 객체 returner를 선언
	- * 핵심 *
		- 클로저를 사용해서 갹각의 createCounterWithMethod의 함수의 counter 값이 독립적으로 유지됨
*/
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
counterWithMethod.increment();
console.log(counterWithMethod.getCurrentCount()); // 2

const counterWithMethod2 = createCounterWithMethod();
console.log('counterWithMethod2 is ', counterWithMethod2.getCurrentCount()); // 0
