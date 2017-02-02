
var Church_floor = function (args) {
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

		//this.mesh.add(pilar.mesh);
		//this.mesh.add(pilar2.mesh);
	}
	var floor = new Floor({})
	this.mesh.add(floor.mesh)


	// ADD altar
	var altar = new Desk({
		width: 130,
		height: 15,
	});
	altar.mesh.position.z -= 210;
	this.mesh.add(altar.mesh)

	// ADD lunchtable
	var lunchtable = new Desk({
		width: 60,
		depth: 30
	});
	lunchtable.mesh.position.z -= 110;
	lunchtable.mesh.position.x -= 110;

	lunchtable.mesh.rotation.y = THREE.Math.degToRad(90);
	this.mesh.add(lunchtable.mesh)

	// ADD TREE
	var tree = new Tree({id:"fauna__tree"});
	tree.mesh.position.z -= 100;
	
	scene.add(tree.mesh)
	
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

	// Add Petrus


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

	var plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(args.width, args.height), material);
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
		rotation : 0,
		click: null,
		hover: null,
	}, args || {});


	var desk = new Desk(args);
	desk.mesh.position.z += args.z;
	desk.mesh.position.x += args.x;
	desk.mesh.rotation.y = args.rotation;
	
	scene.add(desk.mesh);

}
