if(Settings.init.intractions){
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
    var intersects = raycaster.intersectObjects(objectsInScene);

    if (intersects.length > 0) {
        if(intersects[0].object.click != null){
            intersects[0].object.click();
        }
    } else {
       //console.log("unhit")
    }


}

function onDocumentMouseOver(event) {
    if(objectsInScene.length === 0) return false;
    event.preventDefault();
    mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = - (event.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mousePosition, camera);
    var intersects = raycaster.intersectObjects(objectsInScene);

    if (intersects.length > 0) {
        if(intersects[0].object.click != null){
           document.body.classList.add("mouseOnSelectableObject")
        }
        if(intersects[0].object.hover != null){
            intersects[0].object.hover();
        }

    }else{
        document.body.classList.remove("mouseOnSelectableObject")
    }


}
