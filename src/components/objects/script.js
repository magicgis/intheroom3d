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
