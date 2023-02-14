"use strict";

var canvas;
var gl;
var draw;

var index = 0;
var program;
var afterClick = false;
var firstClick = true;
const model = new Model(0,"Line");
var arrayObject = [model];


window.onload = function init() {

    canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.8, 0.8, 0.8, 1.0);

    //  Load shaders and initialize attribute buffers
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);
    gl.clear(gl.COLOR_BUFFER_BIT);


    cBuffer = gl.createBuffer();
    vBuffer = gl.createBuffer();
    vPosition = gl.getAttribLocation(program, "vPosition");
    vColor = gl.getAttribLocation(program, "vColor");


    // event listener mouse klik
    canvas.addEventListener("click", function (event) {
        if (firstClick){
            var point = vec2(2 * (event.clientX-this.offsetLeft) / canvas.width - 1,
                2 * (canvas.height - (event.clientY-this.offsetTop)) / canvas.height - 1);
            arrayObject[arrayObject.length - 1].addVertex(point);
            arrayObject[arrayObject.length - 1].addVertexColor(colorPicker)
            firstClick = false;
        }
        afterClick = true;
        render()
    });


    canvas.addEventListener("dblclick", function () {
        newModel()
        afterClick = false;
        firstClick = true;

    });

    canvas.addEventListener("mousemove", function (event) {
        var point = vec2(2 * (event.clientX - this.offsetLeft) / canvas.width - 1,
            2 * (canvas.height - (event.clientY - this.offsetTop)) / canvas.height - 1);
        if (afterClick){
            arrayObject[arrayObject.length - 1].addVertex(point);
            arrayObject[arrayObject.length - 1].addVertexColor(colorPicker)
            afterClick =false;
        }else{
            arrayObject[arrayObject.length - 1].changeLastVertex(point);
            
        }
        
    });


    document.getElementById("draw").onchange = function(){
        newModel()
    };

    document.getElementById("color").onchange = function () {
        changeColorVertices(this.value)
    };

    document.getElementById("clear").onclick = function () {
        arrayObject = [];
        newModel();
    }
}

function newModel() {
    var value = document.getElementById("draw").value;
    if (value == "Line") {
        arrayObject.push(new Line(arrayObject.length))
    }
    else if (value == "Square") {
        arrayObject.push(new Square(arrayObject.length))
    }
    else if (value == "Rectangle") {
        arrayObject.push(new Rectangle(arrayObject.length))
    }
    else if (value == "Polygon") {
        arrayObject.push(new Polygon(arrayObject.length))
    }
};

function changeColorVertices(hex){
    const arrayColor = hexToRgb(hex);
    colorPicker = arrayColor;
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    for (let i = 0; i < arrayObject.length; i++) {
        arrayObject[i].render(gl);
    }
    window.requestAnimFrame(render);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255, 1.0];
}