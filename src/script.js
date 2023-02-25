"use strict";

var canvas;
var gl;
var draw;

var modelSelected = false;
var vertexSelected = false;
var idxVertexSelected = -1;
var idxModelSelected = -1;

var program;
var afterClick = false;
var firstClick = true;
const model = new Line(1);
var arrayObject = [model];

// Polygon
var editPolygon = false;
var idPolygon = 0;

window.onload = function init() {

    canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.8, 0.8, 0.8, 1.0);

    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);
    gl.clear(gl.COLOR_BUFFER_BIT);

    cBuffer = gl.createBuffer();
    vBuffer = gl.createBuffer();
    vPosition = gl.getAttribLocation(program, "vPosition");
    vColor = gl.getAttribLocation(program, "vColor");


    canvas.addEventListener("click", function (event) {
        const x = 2 * (event.clientX - this.offsetLeft) / canvas.width - 1
        const y = 2 * (canvas.height - (event.clientY - this.offsetTop)) / canvas.height - 1
        var point = vec2(x,y)
        if (arrayObject[arrayObject.length - 1] instanceof Square){
            arrayObject[arrayObject.length-1].addVertex(x,y);
            resetClick()
            newModel()
        } else if (arrayObject[arrayObject.length-1] instanceof Polygon){
            if (firstClick){
                arrayObject[arrayObject.length - 1].addVertex(point);
                arrayObject[arrayObject.length - 1].addVertexColor(colorPicker)
                firstClick = false;
                afterClick=true;
            }
            afterClick=true;
        } else if (arrayObject[arrayObject.length - 1] instanceof Rectangle){
            arrayObject[arrayObject.length-1].addVertex(x,y);
            resetClick()
            newModel();
        } else if (arrayObject[arrayObject.length - 1] instanceof Line){
            if (firstClick) {
                arrayObject[arrayObject.length - 1].addVertex(point);
                arrayObject[arrayObject.length - 1].addVertexColor(colorPicker)
                firstClick = false;
                afterClick = true;
            }
            else{
                resetClick();
                newModel();
            }
            
        }

    });

    canvas.addEventListener("dblclick", function () {
        newModel()
        resetClick()
        
    });

    canvas.addEventListener("mousemove", function (event) {
        var point = vec2(2 * (event.clientX - this.offsetLeft) / canvas.width - 1,
            2 * (canvas.height - (event.clientY - this.offsetTop)) / canvas.height - 1);
        if (arrayObject[arrayObject.length - 1] instanceof Square) {
            
        } else if (arrayObject[arrayObject.length - 1] instanceof Polygon) {
            var idx;
            if (arrayObject[arrayObject.length - 1] instanceof Polygon) {
                if (editPolygon) {
                    idx = idPolygon
                }
                else {
                    idx = arrayObject.length - 1
                }
            }
            if (afterClick) {
                arrayObject[idx].addVertex(point);
                arrayObject[idx].addVertexColor(colorPicker)
                afterClick = false;
            } else if (!firstClick) {
                arrayObject[idx].changeLastVertex(point);
            }
        } else if (arrayObject[arrayObject.length - 1] instanceof Rectangle) {
           
        } else if (arrayObject[arrayObject.length - 1] instanceof Line) {
            if (afterClick) {
                arrayObject[arrayObject.length - 1].addVertex(point);
                arrayObject[arrayObject.length - 1].addVertexColor(colorPicker)
                afterClick = false;
            } else if (!firstClick) {
                arrayObject[arrayObject.length - 1].changeLastVertex(point);
            }
        }
        
    });


    document.getElementById("draw").onchange = function(){
        newModel()
    };

    document.getElementById("color").onchange = function () {
        changeColorVertices(this.value)
        if (modelSelected && ! vertexSelected){
            changeColorModel(idxModelSelected)
        }
        else if (modelSelected && vertexSelected){
            changeColorVertex(idxModelSelected,idxVertexSelected)
        }
    };

    document.getElementById("clear").onclick = function () {
        location.reload();
    }

    render()
}


function newModel() {
    var value = document.getElementById("draw").value;
    if (value == "Line") {
        arrayObject.push(new Line())
    }
    else if (value == "Square") {
        arrayObject.push(new Square())
    }
    else if (value == "Rectangle") {
        arrayObject.push(new Rectangle())
    }
    else if (value == "Polygon") {
        arrayObject.push(new Polygon())
    }
    refreshDaftarObjek();
};

function resetClick() {
    afterClick = false;
    firstClick = true;
}

function resetSelect(){
    var modelSelected = false;
    var vertexSelected = false;
    var idxVertexSelected = -1;
    var idxModelSelected = -1;
}

function changeColorVertices(hex){
    const arrayColor = hexToRgb(hex);
    colorPicker = arrayColor;
}

function changeColorModel(id_model) {
    arrayObject[id_model].deleteVerticesColor()
    for (let i = 0; i < arrayObject[id_model].getLengthVertices(); i++) {
        arrayObject[id_model].addVertexColor(colorPicker);
    }
}

function changeColorVertex(idxModel, idxVertex) {
    arrayObject[idxModel].changeVerticesColor(idxVertex, colorPicker);
}


function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    
    for (let i = 0; i < arrayObject.length; i++) {
        if (arrayObject[i].isEmpty() && i!=arrayObject.length-1) {
            arrayObject.splice(i, 1);
        }
        arrayObject[i].render(gl);
    }
    window.requestAnimFrame(render);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255, 1.0];
}


function save() {
    for (let i = 0; i < arrayObject.length; i++) {
        if (arrayObject[i].isEmpty()) {
            arrayObject.splice(i, 1);
        }
    }
    const jsonFile = JSON.parse(JSON.stringify(arrayObject));
    const downloadFile = document.createElement("a");
    downloadFile.href = URL.createObjectURL(new Blob([JSON.stringify(jsonFile, null, 2)], {
        type: "text/plain"
    }));
    downloadFile.setAttribute("download", "data.json");
    document.body.appendChild(downloadFile);
    downloadFile.click();
    document.body.removeChild(downloadFile);
}

function load() {
    const file = document.getElementById("file-input").files[0];
    var fileread;
    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function () {
        fileread = JSON.parse(reader.result);
        for (let i = 0; i < fileread.length; i++) {

            if (fileread[i]["name"].includes("Line")) {
                arrayObject.push(new Line());
                for (let j = 0; j < fileread[i]["vertices"].length; j++) {
                    arrayObject[arrayObject.length - 1].addVertex(fileread[i]["vertices"][j]);
                    arrayObject[arrayObject.length - 1].addVertexColor(fileread[i]["verticesColor"][j]);
                }
            }
            else if (fileread[i]["name"].includes("Square")) {
                arrayObject.push(new Square());
                arrayObject[arrayObject.length - 1].addVertex(fileread[i]["vertices"][0][0], fileread[i]["vertices"][0][1]);
                arrayObject[arrayObject.length-1].deleteVerticesColor();
                for (let j=0;j < fileread[i]["vertices"].length; j++){
                    arrayObject[arrayObject.length-1].addVertexColor(fileread[i]["verticesColor"][j]);
                }
            }
            else if (fileread[i]["name"].includes("Rectangle")) {
                arrayObject.push(new Rectangle());
                arrayObject[arrayObject.length - 1].addVertex(fileread[i]["vertices"][0][0], fileread[i]["vertices"][0][1]);
                arrayObject[arrayObject.length-1].deleteVerticesColor();
                for (let j=0;j < fileread[i]["vertices"].length; j++){
                    arrayObject[arrayObject.length-1].addVertexColor(fileread[i]["verticesColor"][j]);
                }
            } else {
                arrayObject.push(new Polygon());
                for (let j = 0; j < fileread[i]["vertices"].length; j++) {
                    arrayObject[arrayObject.length - 1].addVertex(fileread[i]["vertices"][j]);
                    arrayObject[arrayObject.length - 1].addVertexColor(fileread[i]["verticesColor"][j]);
                }
            }

        }
        newModel()
        console.log(arrayObject);
    };
}
