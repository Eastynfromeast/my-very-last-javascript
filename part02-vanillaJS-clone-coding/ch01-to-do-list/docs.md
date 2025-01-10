# 지겹기만 팔다리 묶고 TO-DO 리스트 만들기

> 지겹기만 팔다리 묶고 TO-DO 리스트 만들기 에서 접한 익숙하지 않은 자바스크립트 문법이나 궁금한 점을 정리

## 함수 내부에서 본인 호출이 가능한 이유

```
function createElement({ tagName, properties, parent, children, count = 1 }) {
				const create = () => {
					const element = document.createElement(tagName);
					Object.assign(element, properties);
					parent?.appendChild(element);
					children?.map(child => {
						child.parent = element;
						createElement(child); // 여기!
					});
					return element;
				};
// ...
}
```

A. => **호이스팅(hoistin)** 특성 덕분에, 함수의 정의가 실행 컨텍스트가 만들어질 때 메모리에 미리 올라가게 됨  
=> **재귀 호출(recursive call)** : 함수 내부에서 자기 자신을 호출

1. 함수의 선언언이 호이스팅됨 : 자바스크립트는 스크립트를 실행하기 전에 함수 선언을 먼저 메모리에 등록함. 그래서 `createElement` 함수는 정의되기 전에 스코프 안에서 사용 가능
2. 함수 이름은 스코프 안에서 사용 가능 : 함수 선언에서 사용된 함수 이름은 해당 스코프 안에서 접근 가능한 식별자가 됨. 따라서 함수 본문 안에서 자신을 참조하여 호출 가능

> 함수가 자기 자신을 호출할 수 있는 이유는 함수 이름이 해당 스코프 안에서 유효하기 때문. 이런 방식의 재귀 호출은 트리 구조나 반복적인 작업을 처리할 때 매우 유용함.

## Array.from() / filter()

`const completeCount = Array.from(itemList.children).filter(child => child.firstChild.checked).length;`

### Array.from()

> Array.from() 정적 메서드는 순회 가능 또는 유사 배열 객체에서 얕게 복사된 새로운 Array 인스턴스를 생성합니다.
> 참조 - [mdn Array.from()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

#### 구문

```
Array.from(arrayLike)
Array.from(arrayLike, mapFn)
Array.from(arrayLike, mapFn, thisArg)
```

##### 매개변수

- arrayLike : 배열로 변환할 순회 가능 또는 유사 배열 객체
- mapFn : 배열의 모든 요소에 대해 호춣할 함수로, 이 함수를 제공하면 배열에 추가할 모든 값이 이 함수를 통해 먼저 전달, mapFn의 반환 값이 대신 배열에 추가됨
  - element : 배열에서 처리 중인 현재 요소
  - index: 배열에서 처리 중인 현재 요소의 인덱스
- thisArg : mapFn 실행 시에 this로 사용될 값

##### 반환 값

새로운 Array 인스턴스

### Array.prototype.filter()

> Array 인스턴스의 filter() 메서드는 주어진 배열의 일부에 대한 얕은 복사본을 생성하고, 주어진 배열에서 제공된 함수에 의해 구현된 테스트를 통과한 요소로만 필터링 합니다
> 참조 - [mdn Array.prototype.filter()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

#### 구문

```
filter(callbackFn)
filter(callbackFn, thisArg)
```

##### 매개변수

- callbackFn : 배열의 각 요소에 대해 실행할 함수. 결과 배열에 요소를 유지하려면 true 값을 반호나하고, 그렇지 않으면 false 값을 반환해야.
  - element : 배열에서 처리 중인 현재 요소
  - index: 배열에서 처리 중인 현재 요소의 인덱스
  - array : filter()가 호춣된 배열
- thisArg : callbackFn을 실행할 때 this 값으로 사용될 값

##### 반환 값

주어진 배열에서 테스트를 통과한 요소만 포함하는 해당 배열의 얕은 복사본 배열입니다. 테스트를 통과한 요소가 없으면 빈 배열이 반환됩니다.

#### 예시 해석

`	const completeCount = Array.from(itemList.children).filter(child => child.firstChild.checked).length;`

- itemList.children을 순회 가능한 Array로 만든 후
- filter 메서드로 처리할 요소인 child 중 child의 첫번째 자식인 체크박스 타입 input이 체크되어 있을 경우 배열에 담고
- 그 배열의 길이(length) 값을 `completeCount`로 처리
