export default function makeCarousel(itemList, visibleCount = 1, slideCount = 1) {
	const iconNext = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
<path color="white" stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
</svg>
`;
	const iconPrev = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
<path color="white" stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>
`;

	const itemWidth = Math.trunc(700 / visibleCount);
	const wrapper = createElement({
		tagName: 'div',
		properties: { id: 'wrapper' },
	});
	wrapper.style.cssText = `width:100%;
height: 100%;
position:relative;
display: flex;
overflow: hidden;
`;

	const itemContainer = createElement({
		tagName: 'div',
		parent: wrapper,
		properties: { id: 'itemContainer' },
	});
	itemContainer.style.cssText = `display:flex;
transform:translateX(0)px);`;

	addButtons();
	// itemList가 있는 경우 새로 아이템을 만들어서 추가
	if (itemList) {
		// itemList = [...itemList.splice(-1), ...itemList];
		itemList.forEach(item => {
			addImageItem(itemContainer, item);
		});
	} else {
		// 없을 떄는 기존처럼 동작
		addImageItem(itemContainer, './images/carousel_image_01.jpg');
		addImageItem(itemContainer, './images/carousel_image_02.jpg');
		addImageItem(itemContainer, './images/carousel_image_03.jpg');
		addImageItem(itemContainer, './images/carousel_image_04.jpg');
	}

	function handleSlide(next = true) {
		/* const clone = next ? itemContainer.firstChild.cloneNode(true) : undefined;
		clone && itemContainer.appendChild(clone); */
		for (let i = 0; i < slideCount; ++i) {
			const index = i & itemContainer.children.length;
			if (next) {
				itemContainer.appendChild(itemContainer.children[index].cloneNode(true));
			} else {
				itemContainer.prepend(itemContainer.children[itemContainer.children.length - index - 1].cloneNode(true));
			}
		}
		next || (itemContainer.style.transform = `translateX(${-itemWidth * slideCount}px)`); // 먼저 슬라이드 재배치

		/* 
    실행 시점 분리를 위해 setTimeout 사용 
      왜? prev 버튼을 눌렀을 때, 인라인 스타일 태그는 마지막에 바꾼 애만 적용되었기 때문에 
        이것(itemContainer.style.transform = `translateX(${-700 / visibleCount}px)`;)은 무시되고
        얘(itemContainer.style.transform = `translateX(${next ? -700 / visibleCount : 0}px)`;)만 적용됨
        => translateX(0)으로 보이기 때문에 ontransitionend의 코드도 동작하지 않음
        => 그래서 실행시점을 분리한 것!
    */
		setTimeout(() => {
			handleTransitionEnd(next);
		}, 0);
	}

	function handleTransitionEnd(next) {
		itemContainer.style.transitionDuration = '0.5s';
		itemContainer.style.transform = `translateX(${next ? -itemWidth * slideCount : 0}px)`;

		itemContainer.ontransitionend = () => {
			for (let i = 0; i < slideCount; ++i) {
				next ? itemContainer.firstChild.remove() : itemContainer.lastChild.remove();
			}
			// 제자리로 돌리기
			itemContainer.style.removeProperty('transition-duration');
			itemContainer.style.transform = `translateX(0px)`;
		};
	}

	function addButtons() {
		const [prevButton, nextButton] = createElement({
			tagName: 'button',
			parent: wrapper,
			count: 2,
		});

		prevButton.style.cssText = `position: absolute;
  z-index : 1;
  border: 0;
  top:0;
  width: 50px;
  height: 100%;
  background-color: transparent;
  background: linear-gradient(90deg, rgba(0,0,0,.3) 0%, rgba(0,0,0,.1) 30%, rgba(0,0,0,0) 100%);
  fillter: drop-shadow(3px 5px 2px rgba(0,0,0,0.7));
  `;

		nextButton.style.cssText = prevButton.style.cssText;
		nextButton.style.background = 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.1) 30%, rgba(0,0,0,0.3) 100%)';
		prevButton.style.left = '0';
		nextButton.style.right = '0';

		prevButton.innerHTML = iconPrev;
		nextButton.innerHTML = iconNext;

		nextButton.onclick = () => {
			handleSlide();
		};
		prevButton.onclick = () => {
			handleSlide(false);
		};
	}

	function addImageItem(parent, src, captionText = 'Caption Text') {
		const container = createElement({
			tagName: 'div',
			parent,
			properties: { className: 'item' },
		});
		container.style.cssText = `width: ${itemWidth}px;
height: 250px;
display: flex;
justify-content: center;
align-items: center;
overflow: hidden;
background-color: #000;`;

		const image = createElement({
			tagName: 'img',
			parent: container,
			properties: { src },
		});
		image.style.cssText = `height: 100%;`;

		const caption = createElement({
			tagName: 'span',
			properties: { innerText: captionText },
			parent: container,
		});
		caption.style.cssText = `color:white;
font-weight: bold;
position:absolute;
filter: drop-shadow(3px 3px 3px rgba(0,0,0,.5));`;
		return container;
	}
	return wrapper;
}

export function createElement({ tagName, properties, parent, children, count = 1 }) {
	const create = () => {
		const element = document.createElement(tagName);
		Object.assign(element, properties);
		parent?.appendChild(element);
		children?.map(child => {
			child.parent = element;
			createElement(child);
		});
		return element;
	};

	if (count > 1) {
		const results = [];
		for (let i = 0; i < count; i++) {
			results.push(create());
		}
		return results;
	} else {
		return create();
	}
}
