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
	camera.position.x = 500;
	camera.position.z = 500;
	camera.position.y = 300;
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	//HELPER
	//scene.add(new THREE.CameraHelper( camera ));
	var axisHelper = new THREE.AxisHelper(100);
	scene.add(axisHelper);

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
	var hemisphereLight = new THREE.HemisphereLight(Colors.lightColor, 0x000000, .9)

	// A directional light shines from a specific direction. 
	// It acts like the sun, that means that all the rays produced are parallel. 
	shadowLight = new THREE.DirectionalLight(Colors.lightColor, .9);

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

var Church = function (args) {
	args = merge({
		numberOfPilarRows: 4
	}, args || {});

	this.mesh = new THREE.Object3D();

	// ADD PILARS
	for (var i = -1; i <= 2; i++) {
		var pilar = new Pilar();
		var pilar2 = new Pilar();
		var pilarSpacingX = 125;
		var pilarSpacingZ = 100;
		pilar.mesh.position.z = (i * pilarSpacingZ) - (1 * (pilarSpacingZ / 2));
		pilar.mesh.position.x = - pilarSpacingX / 2;
		pilar2.mesh.position.z = (i * pilarSpacingZ) - (1 * (pilarSpacingZ / 2));
		pilar2.mesh.position.x = pilarSpacingX / 2;

		this.mesh.add(pilar.mesh);
		this.mesh.add(pilar2.mesh);
	}


	// ADD altar
	var altar = new Table({
		width: 130,
		height: 15,
	});
	altar.mesh.position.z -= 210;
	this.mesh.add(altar.mesh)

	// ADD lunchtable
	var lunchtable = new Table({
		width: 60,
	});
	lunchtable.mesh.position.z -= 110;
	lunchtable.mesh.position.x -= 110;

	lunchtable.mesh.rotation.y = THREE.Math.degToRad(90);
	this.mesh.add(lunchtable.mesh)

	// ADD TREE
	var tree = new Tree({});
	tree.mesh.position.z -= 100;
	
	this.mesh.add(tree.mesh)
	
	// ADD Couch

	// ADD Desks group 1
	addTable({ x: -130, z:-10 });
	addTable({ x: -100, z:-10 });
	addTable({ x: -70, z:-10 });
	addTable({ x: -40, z:-10 });
	addTable({ x: -130, z:10 });
	addTable({ x: -100, z:10 });
	addTable({ x: -70, z:10 });
	addTable({ x: -40, z:10 });
	
	// ADD Desks group 2
	addTable({ x: -100, z:90 });
	addTable({ x: -70, z:90 });
	addTable({ x: -100, z:110 });
	addTable({ x: -70, z:110 });
	

	// ADD Desks group 3
	addTable({ x: 50, z:80, rotation : THREE.Math.degToRad(90)});
	addTable({ x: 50, z:110, rotation : THREE.Math.degToRad(90)});
	addTable({ x: 70, z:80, rotation : THREE.Math.degToRad(90)});
	addTable({ x: 70, z:110, rotation : THREE.Math.degToRad(90)});

	// ADD Jakobus
	addTable({ x: -130, z: 200 });
	addTable({ x: -100, z: 200 });
	addTable({ x: -70, z: 200 });
	addTable({ x: -40, z: 200 });
	addTable({ x: -130, z: 220 });
	addTable({ x: -100, z: 220 });
	addTable({ x: -70, z: 220 });
	addTable({ x: -40, z: 220 });

	// ADd Fillipus
	addTable({ x: 130, z: 200 });
	addTable({ x: 100, z: 200 });
	addTable({ x: 70, z: 200 });
	addTable({ x: 130, z: 220 });
	addTable({ x: 100, z: 220 });
	addTable({ x: 70, z: 220 });


}


var Floor = function (args) {
	args = merge({
		width: 300,
		height: 600,
		positionZ: 0,
		positionX: 0,
		color: Colors.backgroundColor,
		click: null,
		hover: null,
	}, args || {});

	this.width = args.width;
	this.height = args.height;
	this.mesh = new THREE.Object3D();
	this.mesh.castShadow = true;
	this.mesh.receiveShadow = true;

	var plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(args.width, args.height), new THREE.MeshPhongMaterial({ color: args.color, transparent: true, opacity: 1 }));
	plane.material.side = THREE.DoubleSide;
	//plane.castShadow = true;
	plane.receiveShadow = true;
	this.mesh.add(plane);


	var geo = new THREE.EdgesGeometry(new THREE.PlaneBufferGeometry(args.width, args.height)); // or WireframeGeometry( geometry )
	var mat = new THREE.LineBasicMaterial({ color: Colors.strokeColor, linewidth: Settings.strokeWidth });

	var wireframe = new THREE.LineSegments(geo, mat);


	this.mesh.rotation.x = Math.PI / 2;

	this.mesh.add(wireframe);


	var geo = new THREE.EdgesGeometry(new THREE.PlaneBufferGeometry(args.width + 10, args.height + 10)); // or WireframeGeometry( geometry )
	var mat = new THREE.LineBasicMaterial({ color: Colors.strokeColor, linewidth: Settings.strokeWidth });

	var wireframe = new THREE.LineSegments(geo, mat);
	this.mesh.add(wireframe);


	this.mesh.position.z = args.positionZ

	this.mesh.rotation.x = Math.PI / 2;


}

var Pilar = function (args) {
	args = merge({
		height: 100,
		positionZ: 0,
		positionX: 0,
		color: Colors.primaryColor,
		click: null,
		hover: null,
	}, args || {});
	//this.args = args;

	this.mesh = new THREE.Object3D();


	var pilar = new THREE.CylinderGeometry(5, 5, args.height, 32);

	var pilarBaseHeight = 10;
	var pilarBase = new THREE.CylinderGeometry(7.5, 10, pilarBaseHeight, 32);
	pilarBase.applyMatrix(new THREE.Matrix4().makeTranslation(0, -((args.height / 2) - (pilarBaseHeight / 2)), 0));

	pilar.merge(pilarBase)

	var material = new THREE.MeshPhongMaterial({ color: args.color, shading: THREE.FlatShading });
	var pilar = new THREE.Mesh(pilar, material);
	pilar.applyMatrix(new THREE.Matrix4().makeTranslation(0, (args.height / 2), 0));

	pilar.castShadow = true;
	pilar.receiveShadow = true;

	this.mesh.add(pilar);

}

var Table = function (args) {
	args = merge({
		width: 30,
		depth: 20,
		height: 10,
		colorTableTop: Colors.primaryColor,
		colorLegs: Colors.primaryColor,
		click: null,
		hover: null,
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
	//geomTable.merge(geomLegs);

	var material = new THREE.MeshPhongMaterial({ color: args.colorTableTop, shading: THREE.FlatShading });
	var materialLegs = new THREE.MeshPhongMaterial({ color: args.colorLegs, shading: THREE.FlatShading });

	var table = new THREE.Mesh(geomTable, material);
	var legs = new THREE.Mesh(geomLegs, materialLegs);


	//table.castShadow = true;
	//table.receiveShadow = true;


	table.add(legs);

	table.castShadow = true;
	table.receiveShadow = true;
	legs.castShadow = true;
	legs.receiveShadow = true;


	table.position.y += args.height + 1;

	this.mesh.add(table)
}

var addTable = function (args) {
	args = merge({
		x: 0,
		z: 0,
		rotation : 0,
		click: null,
		hover: null,
	}, args || {});


	var desk = new Table(args);
	desk.mesh.position.z += args.z;
	desk.mesh.position.x += args.x;
	desk.mesh.rotation.y = args.rotation;
	
	scene.add(desk.mesh);

}

var Tree = function (args) {
	args = merge({
		size: 15,
		height : 70,
		positionX: 0,
		positionZ: 0
	}, args || {});

	this.mesh = new THREE.Object3D();
	this.mesh.castShadow = true;
	this.mesh.receiveShadow = true;

	var treeGeom = new THREE.Geometry();
	var material = new THREE.MeshPhongMaterial({ color: Colors.primaryColor, shading: THREE.FlatShading });
	
	// POT
	var geomPot = new THREE.CylinderGeometry((args.size), args.size / 3, args.size, 0, 1, false);
	treeGeom.merge(geomPot.applyMatrix(new THREE.Matrix4().makeTranslation(0, args.size/2, 0)));
	// trunk
	var geomTrunk = new THREE.CylinderGeometry(2, 2, args.height, 0, 1, false);
	treeGeom.merge(geomTrunk.applyMatrix(new THREE.Matrix4().makeTranslation(0, args.height/2, 0)));
	
	//trunk.position.y += (trunkHeight / 2);
	
	// bush
	var geomBush = new THREE.SphereGeometry((args.size * 1.5), 7, 7);
	treeGeom.merge(geomBush.applyMatrix(new THREE.Matrix4().makeTranslation(0, args.height + (args.size/2), 0)));
	
	//bush.position.y += (trunkHeight * 1.5);
	var tree = new THREE.Mesh(treeGeom, material);

	
	this.mesh.add(tree);

	//reposition to 0,0 of room
	//this.mesh.position.x += (room.width / 2) - (args.size / 2);
	//this.mesh.position.z -= (room.height / 2) - (args.size / 2);
	//this.mesh.position.y += args.size / 2;

	// position
	//this.mesh.position.z += args.positionZ
	//this.mesh.position.x -= args.positionX


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
