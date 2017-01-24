var Settings = {
	strokeWidth : 1,
	fillObjects : true,
	init : {
		intractions : true
	},
}

var Colors = {
	primaryColor: 0x023c8e,
	secondaryColor: 0xddd,
	backgroundColor: 0x208fe5,
	strokeColor: 0xffffff,

};


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
newLink.href = 'data:image/png;base64,'+favIcon;
docHead.appendChild(newLink);

