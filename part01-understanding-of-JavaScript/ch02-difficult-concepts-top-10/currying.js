/*
  커링 함수의 부분 적용
  - 반복되는 인자를 가진 함수 호출에서 활용됨
  - 함수 호출 시 필요한 매개변수의 수를 줄일 수 있음
  - 각 함수가 명확한 목적을 가지고 정확하게 동작하게 함
*/

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

/*
  커링 함수의 지연 실행
  - 많은 라이브러리 및 미들웨어 사용되고 있는 개념
  - 지연 실행? 필요할 때까지 계산을 연기
  - 함수가 모든 인자를 받을 때까지 실행을 지연시키는 방식
  - 함수의 인자를 보다 유연하게 관리할 수 있도록 함 : 인자 적용을 나중에 할 수 있으니까
*/

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

/*
  Redux의 미들웨어 구조
  - 애플리케이션의 상태 관리를 유연하고 효과적으로 만듦
  - 미들웨어를 통해 비동기 작업, 로깅, 에러 처리 등 다양한 부가 기능을 애플리케이션에 통합할 수 있음
*/
const middleware = store => next => action => {
	// 미들웨어 로직 : 각각의 인자를 차례대로 받음
	// store 함수 : 현재 상태 조회(get method) 및 새로운 액션 dispatch 가능
	// next 함수: action은 다음 미들웨어로 전달하거나, 미들웨어 체인의 마지막이라면 reducer로 전달
	// action 함수 : 실제로 dispatch된 액션을 매개변수로 받음. 필요한 로직을 수행 하거나 할 일을 함
};
