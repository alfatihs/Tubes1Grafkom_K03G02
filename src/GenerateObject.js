const refreshDaftarObjek = (select) => {
    let inner = '<h3>Daftar Object</h3>';
    for (let i = 0; i < arrayObject.length; i++){
        if (!arrayObject[i].isEmpty()){
            inner += "<div>"
            inner += "<button onclick='select(" + i + ")'>" + arrayObject[i].name + "</button>"
            if (select == i){
                inner += "<div id=daftar-vertex></div>"
            }
            inner += "</div>"
        }
        
    }
    resetSelect()
    document.getElementById('daftar-objek').innerHTML = inner;
    
};

const refreshDaftarVertex = (id) => {
    var sameVertex =false;
    let inner =""
    console.log(id);
    for (let i = 0; i < arrayObject[id].getLengthVertices(); i++) {
        if (arrayObject[id] instanceof Square || arrayObject[id] instanceof Rectangle) {
            for (let j = 0; j < i; j++) {

                if (arrayObject[id].getVertex(i)[0] == arrayObject[id].getVertex(j)[0] && arrayObject[id].getVertex(i)[1] == arrayObject[id].getVertex(j)[1]) {
                    sameVertex = true;
                }
            }
            
        }
        
        if (!sameVertex) {
            inner += "<div style='margin-left:20px;'> "
            inner += "<button  onclick='selectVertex("+ id + ", "+ i + ")'>vertex "+(i+1)+"</button>"
            inner += "</div>"
        }
        sameVertex = false;
        
    }
    resetSelect()
    document.getElementById('daftar-vertex').innerHTML = inner;

};

function select(id){
    refreshDaftarObjek(id)
    modelSelected = true
    idxModelSelected = id
    let inner = '';
    if (arrayObject[id] instanceof Line){

    }
    else if (arrayObject[id] instanceof Polygon){
        inner += "<button onclick = createConvexHull(" +id+")>Convex Hull</button>"
        inner += "<div><button onclick = addVertex(" + id + ")>Add Vertex</button></div>"
    }else if (arrayObject[id] instanceof Square){
        length = calculateSideLength(id)
        inner += "<p id='lengthSide'>Panjang sisi : "+length+"</p>"
        inner += "<p>New Length</p>"
        inner += "<input type=number id='length'></input>"
        inner += "<button onclick = changeSide("+id+")>Ubah Panjang Sisi</button>"
    }else if (arrayObject[id] instanceof Rectangle){
        width = calculateRecWidth(id)
        height = calculateRecHeight(id)
        inner += "<p id='widthText'>Lebar sisi : "+width+"</p>"
        inner += "<p id='HeightText'>Panjang sisi : "+height+"</p>"
        inner += "<p>Lebar Baru</p>"
        inner += "<input type=number id='width'></input>"
        inner += "<p>Panjang Baru</p>"
        inner += "<input type=number id='height'></input>"
        inner += "<button onclick = changeSideRec("+id+")>Ubah Sisi</button>"
    }
    document.getElementById('mode').innerHTML = inner;
    refreshDaftarVertex(id)
}

function selectVertex(id, id_vertex) {
    modelSelected = true
    idxModelSelected = id
    vertexSelected = true
    idxVertexSelected = id_vertex
    let inner = '';
    if (arrayObject[id] instanceof Line) {
        
    }
    else if (arrayObject[id] instanceof Polygon) {
        inner += "<div><button onclick = deleteVertex(" + id + "," + id_vertex + ")>Delete Vertex</button></div>"
    } else if (arrayObject[id] instanceof Square) {

    } else if (arrayObject[id] instanceof Rectangle) {

    }
    document.getElementById('mode-vertex').innerHTML = inner;
}



function calculateSideLength(id){
    t1 = arrayObject[id].getVertex(0)
    t2 = arrayObject[id].getVertex(1)
    panjang = Number(t2[1]) - Number(t1[1])
    return (panjang)
}

function calculateRecWidth(id){
    t1 = arrayObject[id].getVertex(0)
    t2 = arrayObject[id].getVertex(2)
    width = Number(t2[0]) - Number(t1[0])
    return (width)
}

function calculateRecHeight(id){
    t1 = arrayObject[id].getVertex(0)
    t2 = arrayObject[id].getVertex(1)
    height = Number(t2[1]) - Number(t1[1])
    return (height)
}

function changeSide(id){
    panjang = document.getElementById('length').value
    arrayObject[id].changeSideModel(Number(panjang))
}

function changeSideRec(id){
    panjang = document.getElementById('height').value
    lebar = document.getElementById('width').value
    arrayObject[id].changeSideModel(Number(panjang), Number(lebar))
}

function createConvexHull(id){
    const hull = convexHull(arrayObject[id],arrayObject[id].getLengthVertices());
    console.log(hull);
    arrayObject[id].changeVertices(hull);
}

// Polygon
function addVertex(id) {
    editPolygon = true
    idPolygon = id
    afterClick = true
    firstClick = false
}

function deleteVertex(id, index_vertex) {
    console.log("index tobe delete " + index_vertex)
    arrayObject[id].deleteVertex(index_vertex);
    refreshDaftarVertex(id)
}