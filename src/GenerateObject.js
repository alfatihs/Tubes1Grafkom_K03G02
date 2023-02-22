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