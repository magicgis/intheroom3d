var Avatar = function (args) {
	args = merge({
		shirtColor: 40,
	}, args || {});

	this.mesh = new THREE.Object3D();
	this.mesh.castShadow = true;
	this.mesh.receiveShadow = true;

	
    var body = new Cube({x : 100, y: 100, z : 100});
    this.mesh.add(body.mesh);
    
    var arm = new Arm({type:"right"});
    arm.mesh.rotation.x += 0.4;
    this.mesh.add(arm.mesh);

    var arm = new Arm({type:"left"});
    arm.mesh.rotation.x += 0.4;
    this.mesh.add(arm.mesh);

    var leg = new Leg({type:"left"});
    this.mesh.add(leg.mesh);

    var leg = new Leg({type:"right"});
    this.mesh.add(leg.mesh);

    var head = new Head({});
    this.mesh.add(head.mesh);
	
    var hair = new Hair({});
    this.mesh.add(hair.mesh);

    this.mesh.castShadow = true;
    this.mesh.position.y += 20

}

var Head = function(args){
     args = merge({
		type : "right"
	}, args || {});
    this.mesh = new THREE.Object3D();

    var head = new Cube({color:0xf6d3b3, x: 120, y: 120, z : 120})
    head.mesh.position.y +=  110;
    this.mesh.add(head.mesh);
}

var Hair = function(args){
     args = merge({
		color : 0x9ebbbf
	}, args || {});
    this.mesh = new THREE.Object3D();

     var hair = new Cube({color:args.color, x: 130, y: 80, z : 120})
     hair.mesh.position.y +=  135;
     hair.mesh.position.z -=  5;
     //this.mesh.add(hair.mesh);

     var hair_bottom = new Cube({color:args.color, x: 130, y: 30, z : 80})
     hair_bottom.mesh.position.y +=  80;
     hair_bottom.mesh.position.z -=  25;


     var geomHair = new THREE.Geometry();
     
     // TOP
     var geomHairTop = new THREE.BoxGeometry(130, 80, 120, 1, 1, 1);
     geomHairTop.applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, -5) );
     geomHair.merge( geomHairTop, geomHairTop.matrix );
     
     
     // BOTTOM
     var geomHairBottom = new THREE.BoxGeometry(130, 30,30, 1, 1, 1);
     geomHairBottom.applyMatrix( new THREE.Matrix4().makeTranslation(0, -55, -50) );
     geomHair.merge( geomHairBottom, geomHairBottom.matrix );
     
     // PAINT
     var matCube = new THREE.MeshPhongMaterial({ color: args.color, transparent: true, opacity: 1, shading: THREE.FlatShading });
     var hair = new THREE.Mesh( geomHair, matCube );
     hair.position.y +=  135;



     this.mesh.add(hair);
}


var Arm = function(args){
     args = merge({
		type : "right"
	}, args || {});
    this.mesh = new THREE.Object3D();

    var shoulder = new Cube({x: 25, y: 25, z : 25})
    var arm = new Cube({color:0xf6d3b3, x: 25, y: 25, z : 50})
    var hand = new Cube({color:0xf6d3b3, x: 20, y: 20, z : 20})
    
    arm.mesh.position.z = 36.5
    hand.mesh.position.z = 65
	shoulder.mesh.add(arm.mesh)
	shoulder.mesh.add(hand.mesh)
    //shoulder.mesh.rotation.x += 0.4
    if(args.type == "left"){
        shoulder.mesh.position.x += 62.5;
    }else if(args.type == "right"){
        shoulder.mesh.position.x -= 62.5;
        
    }
    shoulder.mesh.position.z += 12.5;
    shoulder.mesh.position.y += 25;
    this.mesh.add(shoulder.mesh);
}

var Hair = function(args){
     args = merge({
		color : 0x9ebbbf
	}, args || {});
    this.mesh = new THREE.Object3D();

     var hair = new Cube({color:args.color, x: 130, y: 80, z : 120})
     hair.mesh.position.y +=  135;
     hair.mesh.position.z -=  5;
     //this.mesh.add(hair.mesh);

     var hair_bottom = new Cube({color:args.color, x: 130, y: 30, z : 80})
     hair_bottom.mesh.position.y +=  80;
     hair_bottom.mesh.position.z -=  25;


     var geomHair = new THREE.Geometry();
     
     // TOP
     var geomHairTop = new THREE.BoxGeometry(130, 80, 120, 1, 1, 1);
     geomHairTop.applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, -5) );
     geomHair.merge( geomHairTop, geomHairTop.matrix );
     
     
     // BOTTOM
     var geomHairBottom = new THREE.BoxGeometry(130, 30,30, 1, 1, 1);
     geomHairBottom.applyMatrix( new THREE.Matrix4().makeTranslation(0, -55, -50) );
     geomHair.merge( geomHairBottom, geomHairBottom.matrix );
     
     // PAINT
     var matCube = new THREE.MeshPhongMaterial({ color: args.color, transparent: true, opacity: 1, shading: THREE.FlatShading });
     var hair = new THREE.Mesh( geomHair, matCube );
     hair.position.y +=  135;



     this.mesh.add(hair);
}


var Leg = function(args){
     args = merge({
		type : "right"
	}, args || {});
    this.mesh = new THREE.Object3D();

    var shoulder = new Cube({x: 25, y: 25, z : 25})
    var leg = new Cube({color:Colors.backgroundColor, x: 25, y: 75, z : 25})
    leg.mesh.position.y -=  62.5;
    this.mesh.add(leg.mesh);

    var shoe = new Cube({color:0x000000, x: 28, y: 14, z : 46})
    shoe.mesh.position.y -=  62.5 + (75/2);
    shoe.mesh.position.z +=  10;
    this.mesh.add(shoe.mesh);

    if(args.type == "left"){
        this.mesh.position.x += 25;
    }else if(args.type == "right"){
        this.mesh.position.x -= 25;
        
    }
}



var Cube = function(args){
    args = merge({
		color: Colors.primaryColor,
        opacity : 1,
        x : 40,
        y: 40,
        z : 40,
	}, args || {});

    this.mesh = new THREE.Object3D();

    var geomCube = new THREE.BoxGeometry(args.x, args.y, args.z, 1, 1, 1);
	var matCube = new THREE.MeshPhongMaterial({ color: args.color, transparent: true, opacity: args.opacity, shading: THREE.FlatShading });
    
    var cube = new THREE.Mesh(geomCube, matCube);
    cube.castShadow = true;
    cube.receiveShadow = true;
    this.geomerty = geomCube;
    this.material = matCube;
    this.mesh.add(cube);
}