/*
  useState 구현해보기
  - 함수 컴포넌트가 클로저를 사용해 상태를 관리하는 기본적인 아이디어 확인용
  - 실제 리액트에서는 훨씬 복잡한 내부 메커니즘을 가지고 있음
*/

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

/*
  useEffect의 클로저 트랩
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
*/
useEffect(() => {
	const connection = createConnection(serverUrl, roomId);
	connection.connect();
	return () => {
		connection.disconnect();
	};
}, [serverUrl, roomId]);
