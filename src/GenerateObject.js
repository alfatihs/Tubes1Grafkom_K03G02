const refreshDaftarObjek = () => {
    let inner = '<h3>Daftar Object</h3>';
    for (let i = 0; i < arrayObject.length; i++){
        if (!arrayObject[i].isEmpty()){
            inner += "<div>"
            inner += "<button onclick='select(" + i + ")'>" + arrayObject[i].name + "</button>"
            inner += "<div>"
        }
        
    }
    
    document.getElementById('daftar-objek').innerHTML = inner;

};

function select(id){
    let inner = '';
    if (arrayObject[id] instanceof Polygon){
        inner += "<button onclick = createConvexHull(" +id+")>Convex Hull</button>"
        document.getElementById('mode').innerHTML = inner;
    }
}

function createConvexHull(id){
    const hull = convexHull(arrayObject[id],arrayObject[id].getLengthVertices());
    console.log(hull);
    arrayObject[id].changeVertices(hull);
}