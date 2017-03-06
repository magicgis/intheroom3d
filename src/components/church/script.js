
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
	//var floor = new Floor({})
	//this.mesh.add(floor.mesh)


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
	var tree = new Tree({ id: "fauna__tree" });
	tree.mesh.position.z -= 100;

	scene.add(tree.mesh)

	// ADD Couch

	// ADD Desks group 1
	addTable({ x: -130, z: -10 });
	addTable({ x: -100, z: -10 });
	addTable({ x: -70, z: -10 });
	addTable({ x: -40, z: -10 });
	addTable({ x: -130, z: 10 });
	addTable({ x: -100, z: 10 });
	addTable({ x: -70, z: 10 });
	addTable({ x: -40, z: 10 });

	// ADD Desks group 2
	addTable({ x: -100, z: 90 });
	addTable({ x: -70, z: 90 });
	addTable({ x: -100, z: 110 });
	addTable({ x: -70, z: 110 });


	// ADD Desks group 3
	addTable({ x: 50, z: 80, rotation: THREE.Math.degToRad(90) });
	addTable({ x: 50, z: 110, rotation: THREE.Math.degToRad(90) });
	addTable({ x: 70, z: 80, rotation: THREE.Math.degToRad(90) });
	addTable({ x: 70, z: 110, rotation: THREE.Math.degToRad(90) });

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


var Floor_old = function (args) {
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


var Room = function (args) {
	args = merge({
		width: 100,
		height: 0,
		depth: 100,
		over: null,
		out: null,
	}, args || {});

	this.mesh = new THREE.Object3D();

	var geomRoom = new THREE.BoxGeometry(args.width, args.height, args.depth);

	var room = new THREE.Mesh(geomRoom, material.clone());
	var geomRoomLined = new THREE.EdgesGeometry(geomRoom);


	var roomLined = new THREE.LineSegments(geomRoomLined, matLines.clone());


	this.mesh.selected = false;

	/*
	room.click = function () {
		this.selected = !this.selected;
		if (this.selected) {
			this.material.color.set(Colors.accentColor);
		} else {
			this.material.color.set(Colors.primaryColor);

		}
		render();
		
	}

	room.over = function () {
		var color = (this.selected === true) ? Colors.primaryColor : Colors.accentColor; 
		
		var wiredSibling = this.parent.children[1]
		wiredSibling.material.color.set(color);
		render();
	}
	room.out = function () {
		var wiredSibling = this.parent.children[1]
		wiredSibling.material.color.set(Colors.lineColor);
		render();
	}
	*/
	this.mesh.add(room)
	this.mesh.add(roomLined)

	this.mesh.position.y += args.height / 2
	objectsInScene.push(this.mesh);

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
