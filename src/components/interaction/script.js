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
    
    if(show){
        $(".inner-menu").html(data[id]);
        $(".menu").addClass("open");
    }else{
        $(".inner-menu").html("")
        $(".menu").removeClass("open");
        
    }

}