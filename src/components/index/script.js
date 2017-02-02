var scene, camera, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH, renderer, container, shadowLight;
var objectsInScene = [];
var objectsWireFrameInScene = [];

var Settings = {
	strokeWidth: 1,
	fillObjects: true,
	init: {
		interactions: true
	},
}

var Colors = {
	primaryColor: 0xffffff,
	secondaryColor: 0xdddddd,
	backgroundColor: 0xa9a9a9,
	strokeColor: 0x333333,
	lineColor: 0x333333,
	accentColor: 0x499333,
	lightColor: 0xeeeeee,
};

function render() {
	shadowLight.position.copy(camera.position);
	renderer.render(scene, camera);
}

var favIcon = "\
iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABrUlEQVR42mNkwAOepOgxMTD9mwhk\
5gDxQSB2l5l15SeyGkYGAuBJMtAQ5n+rgcwgIF4ENCCeJAOghvADXbIHqNoEyK0BGtKK14DXU9lA\
ThZiYPw/XTTr92uId3SVgKoPA8WkgNxIoCErsBrwdhoL57//TGeATC0gfgVUMRlo+2zRjD8vn6Rr\
mzH8ZT4E5IOU+gAN2YNhwMOJ/Ey8bJ+VgGYnAQ3K/f+fkQco/AYYDjP+feHs/fNQyub/N44NQJe0\
ysy5VI83DF5M5pRkY/mVyfCfIRtomNB/pv9v//9infbnucgZ5l/MW8T7HvxDMWB9hT3nXwbmrH//\
mO4Bubc4Wb/f9W09+uNmjwQPP/vHNHaWXwX/Gf7LsjD9k+FLZ3iKEQYbKmy1/jKwXIXx//1nfPvv\
P/MVJsZ/RzlYfpwX4nj/T5zrNbtK8evlWGNhcYU3Px/DR+f/DExGQK4pEKsCseJ/oDKgF0AGMvxj\
ZLIP79xzCMWA3Jyc/yB68pQpGGEyuyJEhJXhtwYLELMx/NL9wcDRcfqLwjOYegwDYGxcAFkNbQxg\
IALgNIBUQBUDAFi2whGNUZ3eAAAAAElFTkSuQmCC";

var docHead = document.getElementsByTagName('head')[0];
var newLink = document.createElement('link');
newLink.rel = 'shortcut icon';
newLink.type = 'image/x-icon';
newLink.href = 'data:image/png;base64,' + favIcon;
docHead.appendChild(newLink);

window.addEventListener('load', init, false);
window.addEventListener('hashchange', loadContent, false);

function init() {
	loadContent();
}

function loadContent() {
	var contentId = window.location.hash.replace("#", "");
	
	if (data[contentId]){
		showData(data[contentId]);
	}else{
		showData(data[Object.keys(data)[0]]);
	}

	if(contentId.trim() == "menu"){
		showMenu();
	}
		
	window.event.stopImmediatePropagation();
}

var transEndEventName = ('WebkitTransition' in document.documentElement.style) ? 'webkitTransitionEnd' : 'transitionend';
function showData(content){
	var navigationTitleElement = document.querySelector("#navigation");
	navigationTitleElement.classList.add("animating-out");
	navigationTitleElement.addEventListener(transEndEventName, function(){
		this.classList.remove("animating-out");
		var title_size = (content.title_size) ? content.title_size : 1 ;
		this.querySelector(".navigation__title").innerHTML = "<h"+title_size+">"+content.title+"</h"+title_size+">";
		this.querySelector(".navigation__content").innerHTML = "<p>"+content.description+"</p>";
	})
	
}


function showMenu(){
	var description="";

	for(var obj in data){
		var item = "<li><a href='#"+obj+"'>"+data[obj].title+"</a></li>";
		description +=item;
	}


	showData({
		title : "menu",
		title_size : 2,
		description: "<ul>"+description+"</ul>"
	});	


}
