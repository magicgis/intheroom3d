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

