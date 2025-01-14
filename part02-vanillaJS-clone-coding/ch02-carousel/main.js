import makeCarousel, { createElement } from './module.js';

const app = createElement({
	tagName: 'div',
	parent: document.body,
});

app.style.cssText = `width:700px; 
height:250px; 
background-color:rgb(100,100,100);
box-sizing: border-box`;

app.appendChild(makeCarousel());
