var scene, camera, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH, renderer, container;

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
	scene.fog = new THREE.Fog(0xf7d9aa, 500, 2000);

	// Create the camera
	aspectRatio = WIDTH / HEIGHT;
	fieldOfView = 45;
	nearPlane = 0.1;
	farPlane = 10000;
	camera = new THREE.PerspectiveCamera(
		fieldOfView,
		aspectRatio,
		nearPlane,
		farPlane
	);

	// Set the position of the camera
	camera.position.x = 0;
	camera.position.z = 750;
	camera.position.y = 550;
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


function createLights() {
	// A hemisphere light is a gradient colored light; 
	// the first parameter is the sky color, the second parameter is the ground color, 
	// the third parameter is the intensity of the light
	var hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9)

	// A directional light shines from a specific direction. 
	// It acts like the sun, that means that all the rays produced are parallel. 
	var shadowLight = new THREE.DirectionalLight(0xffffff, .9);

	// Set the direction of the light  
	shadowLight.position.set(150, 350, 350);

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
	this.mesh = new THREE.Object3D();
	this.mesh.castShadow = true;
	this.mesh.receiveShadow = true;

	var plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(width, height), new THREE.MeshPhongMaterial({color: Colors.primaryColor }));
	plane.material.side = THREE.DoubleSide;

	plane.receiveShadow = true;
	this.mesh.add(plane);


	var geo = new THREE.EdgesGeometry(new THREE.PlaneBufferGeometry(width, height)); // or WireframeGeometry( geometry )
	var mat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });

	var wireframe = new THREE.LineSegments(geo, mat);
	this.mesh.rotation.x = Math.PI / 2;

	this.mesh.add(wireframe);
	var geo = new THREE.EdgesGeometry(new THREE.PlaneBufferGeometry(width + 10, height + 10)); // or WireframeGeometry( geometry )
	var mat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });

	var wireframe = new THREE.LineSegments(geo, mat);


	this.mesh.rotation.x = Math.PI / 2;
	this.mesh.add(wireframe);

}

var Desk = function (width = 30, depth = 20, height = 15) {
	this.mesh = new THREE.Object3D();
	this.mesh.castShadow = true;
	this.mesh.receiveShadow = true;

	var geomDesk = new THREE.BoxGeometry(width,height, depth , 1, 1, 1);
	var matDesk = new THREE.MeshPhongMaterial({ color: Colors.primaryColor, shading: THREE.FlatShading });
	
	var desk = new THREE.Mesh(geomDesk, matDesk);
	//desk.castShadow = true;
	//desk.receiveShadow = true;
	this.mesh.add(desk);

	var geoDeskWire = new THREE.EdgesGeometry(geomDesk);	
	var matDeskWire = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
	var wireframe = new THREE.LineSegments(geoDeskWire, matDeskWire);
	this.mesh.add(wireframe);
	
	this.mesh.position.y += height / 2;
	
}