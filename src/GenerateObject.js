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
        length_line = calculateLineLength(id)

        inner += "<p> Panjang Garis : " +length_line + "</p>"
        inner += "<p> Masukkan Panjang Baru </p>"
        inner += "<input type=number id=new_length_line></input>"
        // inner += "<p> vertex 2 = " + arrayObject[id].getVertex[1]+ "</p>"
        inner += "<button onclick = changeLineLength("+id+")>Ubah Panjang</button><br></br>"
        inner += "<button onclick = translation("+id+",'x','pos')>+</button> X-Translation <button onclick = translation("+id+",'x','neg')>-</button><br>"
        inner += "<button onclick = translation("+id+",'y','pos')>+</button> Y-Translation <button onclick = translation("+id+",'y','neg')>-</button>" 
        
    }
   
    else if (arrayObject[id] instanceof Polygon){
        inner += "<button onclick = createConvexHull(" +id+")>Convex Hull</button>"
        inner += "<div><button onclick = addVertex(" + id + ")>Add Vertex</button></div><br></br>"
        inner += "<button onclick = translation("+id+",'x','pos')>+</button> X-Translation <button onclick = translation("+id+",'x','neg')>-</button><br>"
        inner += "<button onclick = translation("+id+",'y','pos')>+</button> Y-Translation <button onclick = translation("+id+",'y','neg')>-</button>" 
    }else if (arrayObject[id] instanceof Square){
        length = calculateSideLength(id)
        inner += "<p id='lengthSide'>Panjang sisi : "+length+"</p>"
        inner += "<p>New Length</p>"
        inner += "<input type=number id='length'></input>"
        inner += "<button onclick = changeSide("+id+")>Ubah Panjang Sisi</button>"
        inner += "<button onclick = translation("+id+",'x','pos')>+</button> X-Translation <button onclick = translation("+id+",'x','neg')>-</button><br>"
        inner += "<button onclick = translation("+id+",'y','pos')>+</button> Y-Translation <button onclick = translation("+id+",'y','neg')>-</button>" 
    }else if (arrayObject[id] instanceof Rectangle){
        width = calculateRecWidth(id)
        height = calculateRecHeight(id)
        inner += "<p id='widthText'>Lebar sisi : "+width+"</p>"
        inner += "<p id='HeightText'>Panjang sisi : "+height+"</p>"
        inner += "<p>Lebar Baru</p>"
        inner += "<input type=number id='width'></input>"
        inner += "<p>Panjang Baru</p>"
        inner += "<input type=number id='height'></input>"
        inner += "<button onclick = changeSideRec("+id+")>Ubah Sisi</button><br></br>"
        inner += "<button onclick = translation("+id+",'x','pos')>+</button> X-Translation <button onclick = translation("+id+",'x','neg')>-</button><br>"
        inner += "<button onclick = translation("+id+",'y','pos')>+</button> Y-Translation <button onclick = translation("+id+",'y','neg')>-</button>" 
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


function calculateLineLength(id){
    var lineattr = new Array()
    lineattr[0] = arrayObject[id].getVertex(0)[0]
    lineattr[1] = arrayObject[id].getVertex(0)[1]
    lineattr[2] = arrayObject[id].getVertex(1)[0]
    lineattr[3] = arrayObject[id].getVertex(1)[1]
    return(Math.sqrt((lineattr[3]-lineattr[1])*(lineattr[3]-lineattr[1])+(lineattr[2]-lineattr[0])*(lineattr[2]-lineattr[0])))
}

function dilateLine(x1, y1, x2, y2, scale) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    var newX1 = x1 - dx * (scale - 1) / 2;
    var newY1 = y1 - dy * (scale - 1) / 2;
    var newX2 = x2 + dx * (scale - 1) / 2;
    var newY2 = y2 + dy * (scale - 1) / 2;
    return [newX1, newY1, newX2, newY2];
  }

function changeLineLength(id){
    old_length = calculateLineLength(id)
    new_length = document.getElementById('new_length_line').value
    scale_factor = new_length / old_length
    var lineattr = new Array()
    lineattr[0] = arrayObject[id].getVertex(0)[0]
    lineattr[1] = arrayObject[id].getVertex(0)[1]
    lineattr[2] = arrayObject[id].getVertex(1)[0]
    lineattr[3] = arrayObject[id].getVertex(1)[1]
    
    scaledCoords = dilateLine(lineattr[0], lineattr[1], lineattr[2], lineattr[3], scale_factor)
    // arrayObject[id].getVertex[0]

    // new_x
    new_vertex_position = arrayObject[id].changeVertices([vec2(scaledCoords[0],scaledCoords[1]),vec2(scaledCoords[2],scaledCoords[3])])
    // arrayObject[id].changeVertex(1,)


    
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

function translation(id,axis,value){
    if (axis=='x'){
        if(value=='pos'){
            for (i=0; i <= arrayObject[id].getLengthVertices()-1; i++){
                arrayObject[id].changeVertex(i, vec2((arrayObject[id].getVertex(i)[0]),(arrayObject[id].getVertex(i)[1]-0.1)))
            }   
        }
        else if(value=='neg'){
            for (i=0; i <= arrayObject[id].getLengthVertices()-1; i++){
                arrayObject[id].changeVertex(i, vec2((arrayObject[id].getVertex(i)[0]-0.2),(arrayObject[id].getVertex(i)[1]-0.1)))
            }   
        }
    }else if (axis =='y'){
        if(value=='pos'){
            for (i=0; i <= arrayObject[id].getLengthVertices()-1; i++){
                arrayObject[id].changeVertex(i, vec2((arrayObject[id].getVertex(i)[0]-0.1),(arrayObject[id].getVertex(i)[1]+0)))
            }   
        }
        else if(value=='neg'){
            for (i=0; i <= arrayObject[id].getLengthVertices()-1; i++){
                arrayObject[id].changeVertex(i, vec2((arrayObject[id].getVertex(i)[0]-0.1),(arrayObject[id].getVertex(i)[1]-0.2)))
            }   
        }
    }

    for (i=0; i <= arrayObject[id].getLengthVertices()-1; i++){
        arrayObject[id].changeVertex(i, vec2(arrayObject[id].getVertex(i)[0]+0.1,arrayObject[id].getVertex(i)[1]+0.1))
    }

}