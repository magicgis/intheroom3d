/**
 * CONFIG
 */

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
	accentColor: 0x0078d7, //0x499333,
	selectedColor : 0x89b7dc ,
	lightColor: 0xeeeeee,
};



var matLines = new THREE.LineBasicMaterial({
	color: Colors.lineColor,
	linewidth: Settings.strokeWidth,
});

var material = new THREE.MeshBasicMaterial({
	color: Colors.primaryColor,
	polygonOffset: true,
	polygonOffsetUnits: 1,
	polygonOffsetFactor: 1,
});

var matDark = new THREE.MeshBasicMaterial({
	color: Colors.lineColor,
	polygonOffset: true,
	polygonOffsetUnits: 1,
	polygonOffsetFactor: 1,
});

var matLinesInvisible = new THREE.LineBasicMaterial({
	color: Colors.lineColor,
	linewidth: Settings.strokeWidth,
	transparent:true, 
	opacity:1,
});


var matInvisible = new THREE.MeshBasicMaterial({
	color: Colors.primaryColor,
	transparent:true, 
	opacity:0,
	polygonOffset: true,
	polygonOffsetUnits: -1,
	polygonOffsetFactor: -1,
});

/**
 * BASE & MENU
 */


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


window.addEventListener('hashchange', loadContent, false);

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

	var content = data[Object.keys(data)[0]]

	showData({
		title : content.menu_title,
		title_size : 2,
		description: "<ul>"+description+"</ul>"
	});	


}



/**
 * SCENE
 */

function createScene() {
	// Get the width and the height of the screen,
	// use them to set up the aspect ratio of the camera 
	// and the size of the renderer.
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;

	// Create the scene
	scene = new THREE.Scene();

	// Add a fog effect to the scene; same color as the
	// background color used in the style sheet
	//scene.fog = new THREE.Fog(Colors.backgroundColor, 500, 2000);

	// Create the camera
	aspectRatio = WIDTH / HEIGHT;
	fieldOfView = 45;
	nearPlane = 1;
	farPlane = 10000;
	camera = new THREE.PerspectiveCamera(
		fieldOfView,
		aspectRatio,
		nearPlane,
		farPlane
	);

	// Set the position of the camera
	camera.position.x = 500;
	camera.position.z = 500;
	camera.position.y = 500;
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	//HELPER
	//scene.add(new THREE.CameraHelper( camera ));
	scene.add(new THREE.AxisHelper( 85 ) );
	
	// Create the renderer
	renderer = new THREE.WebGLRenderer({
		alpha: true,
		antialias: true
	});

	// Define the size of the renderer; in this case,
	// it will fill the entire screen
	renderer.setSize(WIDTH, HEIGHT);

	// Enable shadow rendering
	renderer.shadowMap.enabled = true;

	// Add the DOM element of the renderer to the 
	// container we created in the HTML
	container = document.getElementById('room');
	container.appendChild(renderer.domElement);

	// Listen to the screen: if the user resizes it
	// we have to update the camera and the renderer size
	window.addEventListener('resize', handleWindowResize, false);


}

function handleWindowResize() {
	// update height and width of the renderer and the camera
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
	renderer.setSize(WIDTH, HEIGHT);
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
	render();
}

function render() {
	shadowLight.position.copy(camera.position);
	renderer.render(scene, camera);
}



function createLights() {
	// A hemisphere light is a gradient colored light; 
	// the first parameter is the sky color, the second parameter is the ground color, 
	// the third parameter is the intensity of the light
	var hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9)

	// A directional light shines from a specific direction. 
	// It acts like the sun, that means that all the rays produced are parallel. 
	shadowLight = new THREE.DirectionalLight(0xffffff, .9);

	// Set the direction of the light  
	shadowLight.position.set(150, 350, 350);
	shadowLight.position.copy(camera.position);
	// Allow shadow casting 
	shadowLight.castShadow = true;

	// define the visible area of the projected shadow
	shadowLight.shadow.camera.left = -400;
	shadowLight.shadow.camera.right = 400;
	shadowLight.shadow.camera.top = 400;
	shadowLight.shadow.camera.bottom = -400;
	shadowLight.shadow.camera.near = 1;
	shadowLight.shadow.camera.far = 1000;

	// define the resolution of the shadow; the higher the better, 
	// but also the more expensive and less performant
	shadowLight.shadow.mapSize.width = 2048;
	shadowLight.shadow.mapSize.height = 2048;

	// to activate the lights, just add them to the scene
	scene.add(hemisphereLight);
	scene.add(shadowLight);



	//var helper = new THREE.HemisphereLightHelper( hemisphereLight, 5 );
	//scene.add( helper );
}

/**
 * CHURCH
 * 
 */

var Pilar = function (args) {
	args = merge({
		height: 150,
		positionZ: 0,
		positionX: 0,
		color: Colors.primaryColor,
		click: null,
		hover: null,
	}, args || {});
	//this.args = args;

	this.mesh = new THREE.Object3D();


	var pilarGeom = new THREE.CylinderGeometry(5, 5, args.height, 32);

	var pilarBaseHeight = 10;
	var pilarBase = new THREE.CylinderGeometry(7.5, 10, pilarBaseHeight, 32);
	pilarBase.applyMatrix(new THREE.Matrix4().makeTranslation(0, -((args.height / 2) - (pilarBaseHeight / 2)), 0));

	pilarGeom.merge(pilarBase)
	pilarGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, (args.height / 2), 0));

	var material = new THREE.MeshPhongMaterial({ color: args.color, shading: THREE.FlatShading });
	var pilar = new THREE.Mesh(pilarGeom, material);

	pilar.castShadow = true;
	pilar.receiveShadow = true;

	//this.mesh.add(addStrokeToObject({object: pilarGeom}));

	this.mesh.add(pilar);

}

var addTable = function (args) {
	args = merge({
		x: 0,
		z: 0,
		rotation: 0,
		click: null,
		over: null,
		out: null,
	}, args || {});


	var desk = new Desk(args);
	desk.mesh.position.z += args.z;
	desk.mesh.position.x += args.x;
	desk.mesh.rotation.y = args.rotation;

	scene.add(desk.mesh);

}


var GroundFloor = function (args) {
	args = merge({
	}, args || {});

	this.mesh = new THREE.Object3D();

	var petrus = new Petrus();
	this.mesh.add(petrus.mesh);

	var kitchen = new Kitchen();
	kitchen.mesh.position.x -= 50 + (75/2);
	this.mesh.add(kitchen.mesh);

	var altar = new Altar();
	altar.mesh.position.z += 50 + (100/2);
	this.mesh.add(altar.mesh);

	
	/*
		hallway = new Room({ width: 50, depth: 100 });
		hallway.mesh.position.x += 75;
		this.mesh.add(ha llway.mesh);
	
	
		petrus = new Room({ height: 20 });
		this.mesh.add(petrus.mesh);
	
		kitchen = new Room({ width: 50, depth: 100 });
		kitchen.mesh.position.x -= 75;
		this.mesh.add(kitchen.mesh);
	
		altaar = new Room({ width: 200, height: 2, depth: 50 });
		altaar.mesh.position.z += 75
		this.mesh.add(altaar.mesh);
	
		projects = new Room({ width: 200, height: 0, depth: 250 });
		projects.mesh.position.z += 225
		this.mesh.add(projects.mesh);
	
		fillipus = new Room({ width: 100, height: 0, depth: 75 });
		fillipus.mesh.position.z += 387.5;
		fillipus.mesh.position.x -= 50
		this.mesh.add(fillipus.mesh);
	
		jakobus = new Room({ width: 100, height: 0, depth: 75 });
		jakobus.mesh.position.z += 387.5;
		jakobus.mesh.position.x += 50
		this.mesh.add(jakobus.mesh);
	*/
}


var Petrus = function (args) {
	args = merge({
		id: "petrus",
		width: 100,
		height: 75,
		depth: 100,
	}, args || {});

	this.mesh = new THREE.Object3D();


	/*
	*	PLATEAU
	*/
	var plateau = new THREE.Object3D();
	var geomplateau = new THREE.BoxGeometry(args.width, args.height / 4, args.depth);
	geomplateau.applyMatrix(new THREE.Matrix4().makeTranslation(0, (args.height / 8), 0))
	var plateauPlane = new THREE.Mesh(geomplateau, material.clone());
	var geomplateauLined = new THREE.EdgesGeometry(geomplateau);
	var plateauLined = new THREE.LineSegments(geomplateauLined, matLines.clone());
	plateau.add(plateauPlane)
	plateau.add(plateauLined)
	this.mesh.add(plateau)

	/*
	*	STAIRS
	*/
	var geomStairs1 = new THREE.BoxGeometry(args.width / 1.5, (args.height / 6), args.depth / 10);
	var geomStairs2 = new THREE.BoxGeometry(args.width / 2, (args.height / 9), args.depth / 10);
	geomStairs1.applyMatrix(new THREE.Matrix4().makeTranslation(0, (args.height / 6) / 2, 0));
	geomStairs2.applyMatrix(new THREE.Matrix4().makeTranslation(0, (args.height / 9) / 2, args.depth / 10))
	geomStairs1.merge(geomStairs2);

	var geomStairsLined = new THREE.EdgesGeometry(geomStairs1);
	var stairsLined = new THREE.LineSegments(geomStairsLined, matLines.clone());

	var stairsMesh = new THREE.Mesh(geomStairs1, material.clone());
	var stairs = new THREE.Object3D()
	stairs.add(stairsMesh);
	stairs.add(stairsLined);
	stairs.position.z += args.depth / 2 + (args.depth / 10) / 2;
	this.mesh.add(stairs)

	/*
	*	ROOM
	*/

	var room = new THREE.Object3D();
	room.selected = false;
	
	var geomRoom = new THREE.BoxGeometry(args.width, args.height, args.depth);
	var roomPlane = new THREE.Mesh(geomRoom, matInvisible.clone());
	var geomRoomLined = new THREE.EdgesGeometry(geomRoom);
	var roomLined = new THREE.LineSegments(geomRoomLined, matLinesInvisible.clone());
	roomPlane.selected = false;
	roomPlane.args = args;
	roomPlane.click = function () {
		this.selected = !this.selected;
		var color = (this.selected === true) ? Colors.selectedColor : Colors.accentColor;
		this.parent.parent.traverse(function (child) {
			if (child.type === 'LineSegments') {
				child.material.color.set(Colors.accentColor);
			}
		});
		render();

		showDetails(this.args.id,this.selected);
	}

	roomPlane.over = function () {
		var color = (this.selected === true) ? Colors.selectedColor : Colors.accentColor;
		this.parent.parent.traverse(function (child) {
			if (child.type === 'LineSegments') {
				child.material.color.set(color);
			}
		});
		render();
	}
	roomPlane.out = function () {
		this.parent.parent.traverse(function (child) {
			if (child.type === 'LineSegments') {
				child.material.color.set(Colors.lineColor);
			}
		});
		render();
	}


	room.add(roomPlane)
	//room.add(roomLined)
	//room.position.y += (args.height)
	objectsInScene.push(roomPlane);


	room.position.y += args.height / 2
	this.mesh.add(room)

	/*
	*	DECORATIONS
	*/

	var desk = new Desk({ width: 40, depth: 40, height: 10, });
	desk.mesh.position.y += args.height / 4;
	this.mesh.add(desk.mesh);

	var chair = new Chair();
	chair.mesh.position.y += args.height/4;
	chair.mesh.position.x -= args.width / 4;
	chair.mesh.rotation.y += 0.1
	
	this.mesh.add(chair.mesh)
	
	var chair = new Chair();
	chair.mesh.position.y += args.height/4;
	chair.mesh.position.z -= args.width / 4;
	chair.mesh.rotation.y += -1
	this.mesh.add(chair.mesh)



	var geomTv = new THREE.BoxGeometry(2, 20, 30);
	geomTv.applyMatrix(new THREE.Matrix4().makeTranslation(args.width / 2 - 1, args.height / 4 + 35, 0))

	var tv = new THREE.Mesh(geomTv, new THREE.MeshBasicMaterial({ color: Colors.lineColor }));
	this.mesh.add(tv);

	var lamp = new SpiderLamp();
	lamp.mesh.position.y += args.height/1.5;
	this.mesh.add(lamp.mesh);

	

}

var Kitchen = function (args) {
	args = merge({
		id: "kitchen",
		width: 75,
		height: 0,
		depth: 100,
	}, args || {});

	this.mesh = new THREE.Object3D();


	/*
	*	PLATEAU
	*/
	var plateau = new THREE.Object3D();
	var geomplateau = new THREE.BoxGeometry(args.width, args.height / 4, args.depth);
	geomplateau.applyMatrix(new THREE.Matrix4().makeTranslation(0, (args.height / 8), 0))
	var plateauPlane = new THREE.Mesh(geomplateau, material.clone());
	var geomplateauLined = new THREE.EdgesGeometry(geomplateau);
	var plateauLined = new THREE.LineSegments(geomplateauLined, matLines.clone());
	plateau.add(plateauPlane)
	plateau.add(plateauLined)
	this.mesh.add(plateau)

	
	/*
	*	ROOM
	*/

	var room = new THREE.Object3D();
	room.selected = false;
	
	var geomRoom = new THREE.BoxGeometry(args.width, args.height, args.depth);
	var roomPlane = new THREE.Mesh(geomRoom, matInvisible.clone());
	var geomRoomLined = new THREE.EdgesGeometry(geomRoom);
	var roomLined = new THREE.LineSegments(geomRoomLined, matLinesInvisible.clone());
	
	roomPlane.selected = false;
	roomPlane.args = args;
	roomPlane.click = function () {
		this.selected = !this.selected;
		var color = (this.selected === true) ? Colors.selectedColor : Colors.accentColor;
		this.parent.parent.traverse(function (child) {
			if (child.type === 'LineSegments') {
				child.material.color.set(Colors.accentColor);
			}
		});
		render();

		showDetails(this.args.id,this.selected);
	}

	roomPlane.over = function () {
		var color = (this.selected === true) ? Colors.selectedColor : Colors.accentColor;
		this.parent.parent.traverse(function (child) {
			if (child.type === 'LineSegments') {
				child.material.color.set(color);
			}
		});
		render();
	}
	roomPlane.out = function () {
		this.parent.parent.traverse(function (child) {
			if (child.type === 'LineSegments') {
				child.material.color.set(Colors.lineColor);
			}
		});
		render();
	}


	room.add(roomPlane)
	//room.add(roomLined)
	//room.position.y += (args.height)
	objectsInScene.push(roomPlane);


	room.position.y += args.height / 2
	this.mesh.add(room)

	/*
	*	DECORATIONS
	*/

}

var Altar = function (args) {
	args = merge({
		id: "altar",
		width: 275,
		height: 10,
		depth: 100,
	}, args || {});

	this.mesh = new THREE.Object3D();


	/*
	*	PLATEAU
	*/
	var plateau = new THREE.Object3D();
	var geomplateau = new THREE.BoxGeometry(args.width, args.height / 4, args.depth);
	geomplateau.applyMatrix(new THREE.Matrix4().makeTranslation(0, (args.height / 8), 0))
	var plateauPlane = new THREE.Mesh(geomplateau, material.clone());
	var geomplateauLined = new THREE.EdgesGeometry(geomplateau);
	var plateauLined = new THREE.LineSegments(geomplateauLined, matLines.clone());
	plateau.add(plateauPlane)
	plateau.add(plateauLined)
	this.mesh.add(plateau)

	/*
	*	ROOM
	*/

	var room = new THREE.Object3D();
	room.selected = false;
	
	var geomRoom = new THREE.BoxGeometry(args.width, args.height, args.depth);
	var roomPlane = new THREE.Mesh(geomRoom, matInvisible.clone());
	var geomRoomLined = new THREE.EdgesGeometry(geomRoom);
	var roomLined = new THREE.LineSegments(geomRoomLined, matLinesInvisible.clone());
	roomPlane.selected = false;
	roomPlane.args = args;
	roomPlane.click = function () {
		this.selected = !this.selected;
		var color = (this.selected === true) ? Colors.selectedColor : Colors.accentColor;
		this.parent.parent.traverse(function (child) {
			if (child.type === 'LineSegments') {
				child.material.color.set(Colors.accentColor);
			}
		});
		render();

		showDetails(this.args.id,this.selected);
	}

	roomPlane.over = function () {
		var color = (this.selected === true) ? Colors.selectedColor : Colors.accentColor;
		this.parent.parent.traverse(function (child) {
			if (child.type === 'LineSegments') {
				child.material.color.set(color);
			}
		});
		render();
	}
	roomPlane.out = function () {
		this.parent.parent.traverse(function (child) {
			if (child.type === 'LineSegments') {
				child.material.color.set(Colors.lineColor);
			}
		});
		render();
	}


	room.add(roomPlane)
	//room.add(roomLined)
	//room.position.y += (args.height)
	objectsInScene.push(roomPlane);


	room.position.y += args.height / 2
	this.mesh.add(room)

	/*
	*	DECORATIONS
	*/

	var desk = new Desk({ width: 40, depth: 40, height: 10, });
	desk.mesh.position.y += args.height / 4;
	this.mesh.add(desk.mesh);

	

	

}



/*
*	OBJECTS
*/

var Desk = function (args) {
	args = merge({
		width: 30,
		depth: 20,
		height: 10,
		colorTableTop: Colors.primaryColor,
		colorLegs: Colors.primaryColor,
		click: null,
		over: null,
		out: null,
	}, args || {});
	this.args = args;
	this.mesh = new THREE.Object3D();

	var geomTable = new THREE.Geometry();
	var geomTable_top = new THREE.BoxGeometry(args.width, 2, args.depth, 1, 1, 1);

	var geomLegs = new THREE.Geometry();
	var geomLeg = new THREE.BoxGeometry(2, args.height, 2, 1, 1, 1);

	geomLegs.merge(geomLeg.applyMatrix(new THREE.Matrix4().makeTranslation(-((args.width / 2) - 1), -(args.height / 2) - 1, -(args.depth / 2) + 1)));
	geomLegs.merge(geomLeg.applyMatrix(new THREE.Matrix4().makeTranslation((args.width - 2), 0, 0)));
	geomLegs.merge(geomLeg.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, (args.depth - 2))));
	geomLegs.merge(geomLeg.applyMatrix(new THREE.Matrix4().makeTranslation(-(args.width - 2), 0, 0)));


	geomTable.merge(geomTable_top);
	geomTable.merge(geomLegs);

	var table = new THREE.Mesh(geomTable, material.clone());
	var geoObject = new THREE.EdgesGeometry(geomTable);
	var tableLined = new THREE.LineSegments(geoObject, matLines.clone());



	table.castShadow = true;
	table.receiveShadow = true;

	table.selected = false;
	/*
	table.click = function () {
		this.selected = !this.selected;
		if (this.selected) {
			this.material.color.set(Colors.accentColor);
		} else {
			this.material.color.set(Colors.primaryColor);

		}
		render();
		
	}

	table.over = function () {
		var color = (this.selected === true) ? Colors.primaryColor : Colors.accentColor; 
		
		var wiredSibling = this.parent.children[1]
		wiredSibling.material.color.set(color);
		render();
	}
	table.out = function () {
		var wiredSibling = this.parent.children[1]
		wiredSibling.material.color.set(Colors.lineColor);
		render();
	}
	*/

	//objectsWireFrameInScene.push(tableLined);


	this.mesh.add(table)
	this.mesh.add(tableLined)
	this.mesh.position.y += args.height + 1;
	objectsInScene.push(this.mesh);

}

var Tree = function (args) {
	args = merge({
		id : null,
		size: 15,
		height: 70,
		positionX: 0,
		positionZ: 0
	}, args || {});
	
	this.mesh = new THREE.Object3D();
	this.mesh.castShadow = true;
	this.mesh.receiveShadow = true;

	var treeGeom = new THREE.Geometry();

	// POT
	var geomPot = new THREE.CylinderGeometry((args.size), args.size / 3, args.size, 0, 1, false);
	treeGeom.merge(geomPot.applyMatrix(new THREE.Matrix4().makeTranslation(0, args.size / 2, 0)));
	// trunk
	var geomTrunk = new THREE.CylinderGeometry(2, 2, args.height, 0, 1, false);
	treeGeom.merge(geomTrunk.applyMatrix(new THREE.Matrix4().makeTranslation(0, args.height / 2, 0)));

	// bush
	var geomBush = new THREE.SphereGeometry((args.size * 1.5), 7, 7);
	treeGeom.merge(geomBush.applyMatrix(new THREE.Matrix4().makeTranslation(0, args.height + (args.size / 2), 0)));





	var tree = new THREE.Mesh(treeGeom, material);
	var geoObject = new THREE.EdgesGeometry(treeGeom);
	var treeLined = new THREE.LineSegments(geoObject, matLines);

	tree.selected = false;
	tree.args = args;
	
	tree.click = function () {
		this.selected = !tree.selected 
		if (this.selected) {
			this.material.color.set(Colors.accentColor);
		} else {
			this.material.color.set(Colors.primaryColor);

		}
		render();
		
		showDetails(this.args.id,this.selected);
		
	}

	tree.over = function () {
		var color = (this.selected === true) ? Colors.primaryColor : Colors.accentColor; 
		var wiredSibling = this.parent.children[1]
		wiredSibling.material.color.set(color);
		render();
	}
	tree.out = function () {
		var wiredSibling = this.parent.children[1]
		wiredSibling.material.color.set(Colors.lineColor);
		render();
	}

	this.mesh.add(tree);
	this.mesh.add(treeLined);

	objectsInScene.push(this.mesh);
	



}

var Chair = function(args){
	args = merge({
		id : null,
		size: 10,
		material : material
	}, args || {});
	
	this.mesh = new THREE.Object3D();


	var geomChair = new THREE.Geometry();
	var geomSit = new THREE.BoxGeometry(args.size, 2, args.size);
	geomChair.merge(geomSit);
	
	var geomBack = new THREE.BoxGeometry(2, args.size * 1.5, args.size);
	geomBack.applyMatrix(new THREE.Matrix4().makeTranslation(-(args.size/2)-1, (args.size/1.9), 0));
	geomChair.merge(geomBack);
	
	var geomAxis = new THREE.BoxGeometry(2, args.size * 0.5, 2);
	geomAxis.applyMatrix(new THREE.Matrix4().makeTranslation(0, -(args.size * 0.5)/2, 0));
	
	geomChair.merge(geomAxis);
	
	var geomFoot = new THREE.BoxGeometry(2, 2, args.size * 1);
	geomFoot.applyMatrix(new THREE.Matrix4().makeTranslation(0, -(args.size * 0.5)-1, 0));
	geomFoot.applyMatrix(new THREE.Matrix4().makeRotationAxis(new THREE.Vector3( 0, 1, 0 ), 45 * ( Math.PI / 180)));
	geomChair.merge(geomFoot);
	
	geomFoot.applyMatrix(new THREE.Matrix4().makeRotationAxis(new THREE.Vector3( 0, 1, 0 ), 90 * ( Math.PI / 180)));
	geomChair.merge(geomFoot);


	var chair = new THREE.Mesh(geomChair, args.material.clone())
	var geomChairLined = new THREE.EdgesGeometry(geomChair);
	var chairLined = new THREE.LineSegments(geomChairLined, matLines.clone());

	this.mesh.position.y +=args.size/2+2

	this.mesh.add(chair)
	this.mesh.add(chairLined)
}

var SpiderLamp = function(args){
	args = merge({
		id : null,
		size: 14,
		material : matDark,
		lined : false,
		angle : 25
	}, args || {});
	
	this.mesh = new THREE.Object3D();

	var geomLamp = new THREE.Geometry();
	var geomBase = new THREE.Geometry();
	var geomArm = new THREE.Geometry();
	var geomLowerArm = new THREE.BoxGeometry(2, args.size, 2);
	geomLowerArm.applyMatrix(new THREE.Matrix4().makeRotationAxis(new THREE.Vector3( 1, 0, 0 ), args.angle * ( Math.PI / 180)));
	geomArm.merge(geomLowerArm);
	
	var geomUpperArm = new THREE.BoxGeometry(2, args.size, 2);
	geomUpperArm.applyMatrix(new THREE.Matrix4().makeRotationAxis(new THREE.Vector3( 1, 0, 0 ), (360 - args.angle) * ( Math.PI / 180)));
	geomUpperArm.applyMatrix(new THREE.Matrix4().makeTranslation(0, args.size-4, 0));
	geomArm.merge(geomUpperArm);
	
	var geomLight = new THREE.BoxGeometry(4, 4, 4);
	geomLight.applyMatrix(new THREE.Matrix4().makeTranslation(0, args.size, 4));
	geomLight.applyMatrix(new THREE.Matrix4().makeRotationAxis(new THREE.Vector3( 1, 0, 0 ), (360 - args.angle) * ( Math.PI / 180)));
	geomArm.merge(geomLight);

	//1	
	geomArm.applyMatrix(new THREE.Matrix4().makeRotationAxis(new THREE.Vector3( 1, 0, 0 ), 270 * ( Math.PI / 180)));
	geomArm.applyMatrix(new THREE.Matrix4().makeTranslation(0, 3, -6));
	geomLamp.merge(geomArm)
	
	//2
	for(var i=1; i<8; i++){
		var angle = i*45;
		var tmp_geomArm = new THREE.Geometry();
		tmp_geomArm = geomArm.clone();
		tmp_geomArm.applyMatrix(new THREE.Matrix4().makeRotationAxis(new THREE.Vector3( 0, 1, 0 ), angle * ( Math.PI / 180)));
		geomLamp.merge(tmp_geomArm)
	
	}
	var geomBase = new THREE.BoxGeometry(8, 1, 8);
	geomLamp.merge(geomBase)

	var geomCord = new THREE.BoxGeometry(2, args.size*1.5, 2);
	geomCord.applyMatrix(new THREE.Matrix4().makeTranslation(0, (args.size*1.5)/2, 0));
	geomLamp.merge(geomCord);
	
	var lamp = new THREE.Mesh(geomLamp, args.material.clone())
	this.mesh.add(lamp)

	if(args.lined === true){
		var lampLined = new THREE.LineSegments(new THREE.EdgesGeometry(geomLamp), matLines.clone());
		this.mesh.add(lampLined)
	}
}

/**
 * INTERACTIONS
 */
if(Settings.init.interactions){
    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('mousemove', onDocumentMouseOver, false);
}
var mousePosition = new THREE.Vector2(), INTERSECTED;
var raycaster = new THREE.Raycaster()
function onDocumentMouseDown(event) {
    if(objectsInScene.length === 0) return false;
    event.preventDefault();
    mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = - (event.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mousePosition, camera);
    var intersects = raycaster.intersectObjects(objectsInScene, true);

    if (intersects.length > 0) {
        if(intersects[0].object.click != null){
            intersects[0].object.click();
        }
    } else {
       //console.log("unhit")
    }


}
var objectHovered;
function onDocumentMouseOver(event) {
    if(objectsInScene.length === 0) return false;
    event.preventDefault();
    mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = - (event.clientY / window.innerHeight) * 2 + 1;
    
    //
     

    raycaster.setFromCamera(mousePosition, camera);
    var intersects = raycaster.intersectObjects(objectsInScene, true);
    
    if (intersects.length > 0) {

        if(intersects[0].object.click != null){
           document.body.classList.add("mouseOnSelectableObject")
        }
        if(intersects[0].object.over != null){
            if(objectHovered) {
                objectHovered.out();
                objectHovered = null;
            }
            intersects[0].object.over();
            objectHovered = intersects[0].object;
        }

    }else{
        document.body.classList.remove("mouseOnSelectableObject")
        if(objectHovered) {
            objectHovered.out();
            objectHovered = null;
        }

    }


}


var showDetails= function(id,show){
    if(id === null) return false;
    if(!data[id]) return false;
    console.log(id)
    //history.pushState(null, null, "#"+id);
   
    if(show){
         window.open("#"+id,"_self")
    }else{
       window.open("#","_self")
    }

}
