var scene, camera, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH, renderer, container, shadowLight;
var objectsInScene = [];

function createScene() {
	console.log("Create Scene")

	// Get the width and the height of the screen,
	// use them to set up the aspect ratio of the camera 
	// and the size of the renderer.
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;

	// Create the scene
	scene = new THREE.Scene();

	// Add a fog effect to the scene; same color as the
	// background color used in the style sheet
	scene.fog = new THREE.Fog(Colors.backgroundColor, 500, 2000);

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
	camera.position.x = -500;
	camera.position.z = 500;
	camera.position.y = 300;
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	//HELPER
	//scene.add(new THREE.CameraHelper( camera ));

	// Create the renderer
	renderer = new THREE.WebGLRenderer({
		// Allow transparency to show the gradient background
		// we defined in the CSS
		alpha: true,

		// Activate the anti-aliasing; this is less performant,
		// but, as our project is low-poly based, it should be fine :)
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


var Room = function (width = 300, height = 500) {
	this.width = width;
	this.height = height;
	this.mesh = new THREE.Object3D();
	this.mesh.castShadow = true;
	this.mesh.receiveShadow = true;

	var plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(width, height), new THREE.MeshPhongMaterial({ color: Colors.primaryColor }));
	plane.material.side = THREE.DoubleSide;

	plane.receiveShadow = true;
	this.mesh.add(plane);


	var geo = new THREE.EdgesGeometry(new THREE.PlaneBufferGeometry(width, height)); // or WireframeGeometry( geometry )
	var mat = new THREE.LineBasicMaterial({ color: Colors.strokeColor, linewidth: Settings.strokeWidth });

	var wireframe = new THREE.LineSegments(geo, mat);


	this.mesh.rotation.x = Math.PI / 2;

	this.mesh.add(wireframe);


	var geo = new THREE.EdgesGeometry(new THREE.PlaneBufferGeometry(width + 10, height + 10)); // or WireframeGeometry( geometry )
	var mat = new THREE.LineBasicMaterial({ color: Colors.strokeColor, linewidth: Settings.strokeWidth });

	var wireframe = new THREE.LineSegments(geo, mat);
	this.mesh.add(wireframe);


	this.mesh.rotation.x = Math.PI / 2;


}

var Desk = function (args) {

	this.mesh = new THREE.Object3D();
	this.mesh.castShadow = true;
	this.mesh.receiveShadow = true;

	var geomDesk = new THREE.BoxGeometry(args.width, args.height, args.depth, 1, 1, 1);
	var matDesk = new THREE.MeshPhongMaterial({ color: Colors.primaryColor, shading: THREE.FlatShading });

	var desk = createWiredObject({
		object: geomDesk,
		material: matDesk,
		click: function () {
			console.log("click - select desk");
		},
		hover: function () {
			console.log("hover - hightlight desk");
		}
	})

	this.mesh.add(desk);

	// reposition to 0,0 of room
	this.mesh.position.x += (room.width / 2) - (args.width / 2);
	this.mesh.position.z -= (room.height / 2) - (args.height / 2);
	this.mesh.position.y += args.height / 2;

	// position
	this.mesh.position.z += args.positionZ
	this.mesh.position.x -= args.positionX
}

var Door = function (args) {
	args = merge({
		height: 40,
		width: 5,
		depth: 25,
	}, args || {});

	this.mesh = new THREE.Object3D();
	this.mesh.castShadow = true;
	this.mesh.receiveShadow = true;

	var geomDoor = new THREE.BoxGeometry(args.width, args.height, args.depth, 1, 1, 1);
	var matDoor = new THREE.MeshPhongMaterial({ color: Colors.primaryColor, transparent: true, opacity: 1, shading: THREE.FlatShading });

	var door = createWiredObject({
		object: geomDoor,
		material: matDoor,
		click: function () {
			console.log("click - door open");
		},
		hover: function () {
			console.log("hover - hightlight door");
		}
	})



	this.mesh.add(door);

	// handle
	var geomHandle = new THREE.BoxGeometry(args.width / 10, args.height / 10, args.depth, 1, 1, 1);

	//reposition to 0,0 of room
	this.mesh.position.x += (room.width / 2) - (args.width / 2);
	this.mesh.position.z -= (room.height / 2) - (args.height / 2);
	this.mesh.position.y += args.height / 2;

	// position
	this.mesh.position.z += args.positionZ
	this.mesh.position.x -= args.positionX
}

var Plant = function (args) {
	args = merge({
		size: 10,
		positionX: 0,
		positionZ: 0
	}, args || {});

	this.mesh = new THREE.Object3D();
	this.mesh.castShadow = true;
	this.mesh.receiveShadow = true;

	// POT
	var geomPot = new THREE.CylinderGeometry((args.size), args.size / 3, args.size, 0, 1, false);
	var matPot = new THREE.MeshPhongMaterial({ color: Colors.primaryColor, shading: THREE.FlatShading });
	var pot = createWiredObject({
		object: geomPot,
		material: matPot
	})
	this.mesh.add(pot);


	// trunk
	var trunkHeight = args.size * 2;
	var geomTrunk = new THREE.CylinderGeometry(2, 2, trunkHeight, 0, 1, false);
	var matTrunk = new THREE.MeshPhongMaterial({ color: Colors.primaryColor, shading: THREE.FlatShading });

	var trunk = createWiredObject({
		object: geomTrunk,
		material: matTrunk
	})
	trunk.position.y += (trunkHeight / 2);
	this.mesh.add(trunk);

	// bush
	var geomBush = new THREE.SphereGeometry((args.size * 1.5), 7, 7);
	var matBush = new THREE.MeshPhongMaterial({ color: Colors.primaryColor, shading: THREE.FlatShading });
	var bush = createWiredObject({
		object: geomBush,
		material: matBush
	})
	bush.position.y += (trunkHeight * 1.5);
	this.mesh.add(bush);

	//reposition to 0,0 of room
	this.mesh.position.x += (room.width / 2) - (args.size / 2);
	this.mesh.position.z -= (room.height / 2) - (args.size / 2);
	this.mesh.position.y += args.size / 2;

	// position
	this.mesh.position.z += args.positionZ
	this.mesh.position.x -= args.positionX


}


var createWiredObject = function (args) {
	args = merge({
		object: null,
		color: Colors.strokeColor,
		click: null,
		hover: null,
	}, args || {});
	if (args.object == null) { return false; }

	this.mesh = new THREE.Object3D();
	var object = new THREE.Mesh(args.object, args.material);
	object.castShadow = true;
	object.receiveShadow = true;


	var wireObject = addStrokeToObject({ object: args.object });

	var scaleFactor = 0.98;
	object.scale.set(1 * scaleFactor, 1 * scaleFactor, 1 * scaleFactor);

	// add callback
	object.click = args.click;
	object.hover = args.hover;
	object.add(wireObject)

	this.mesh.add(object);


	objectsInScene.push(object);

	return this.mesh;
}

var addStrokeToObject = function (args) {
	args = merge({
		object: null,
		color: Colors.strokeColor,
		positionZ: 0,
		positionX: 0,
	}, args || {});
	if (args.object == null) { return false; }


	var geoObject = new THREE.EdgesGeometry(args.object);
	var matWire = new THREE.LineBasicMaterial({ color: args.color, linewidth: Settings.strokeWidth });
	var strokedObject = new THREE.LineSegments(geoObject, matWire);
	//var wireFrameScaleFactor = 1.04	;
	//strokedObject.scale.set(1 * wireFrameScaleFactor,1 * wireFrameScaleFactor,1 * wireFrameScaleFactor);
	return strokedObject;

}
