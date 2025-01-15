import makeCarousel, { createElement } from './module.js';

const app = createElement({
	tagName: 'div',
	parent: document.body,
});

app.style.cssText = `width:700px; 
height:250px; 
background-color:rgb(100,100,100);
box-sizing: border-box`;

app.appendChild(
	makeCarousel(['./images/carousel_image_04.jpg', './images/carousel_image_01.jpg', './images/carousel_image_02.jpg', './images/carousel_image_03.jpg'])
);
app.appendChild(makeCarousel(['./images/carousel_image_08.jpg', './images/carousel_image_09.jpg', './images/carousel_image_10.jpg']));
app.appendChild(makeCarousel());
app.appendChild(makeCarousel());
