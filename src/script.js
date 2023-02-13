"use strict";

var canvas;
var gl;
var draw;

var maxNumTriangles = 200;
var maxNumVertices = 3 * maxNumTriangles;
var index = 0;
var program;
var afterClick = false;
var firstClick = true;
const model = new Model(0,"Line");
const arrayObject = [model];


window.onload = function init() {

    canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.8, 0.8, 0.8, 1.0);

    //
    //  Load shaders and initialize attribute buffers
    //
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
            var point = vec2(2 * event.clientX / canvas.width - 1,
                2 * (canvas.height - event.clientY) / canvas.height - 1);
            arrayObject[arrayObject.length - 1].addVertex(point);
            firstClick = false;
        }
        afterClick = true;
        render()
    });

    canvas.addEventListener("mousemove", function (event) {
        var point = vec2(2 * event.clientX / canvas.width - 1,
            2 * (canvas.height - event.clientY) / canvas.height - 1);
        if (afterClick){
            arrayObject[arrayObject.length - 1].addVertex(point);
            afterClick =false;
        }else{
            arrayObject[arrayObject.length - 1].changeLastVertex(point);
            
        }
        
    });


    document.getElementById("draw").onchange = function () {
        var value = document.getElementById("draw").value;
        if(value == "Line"){
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
}


function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    for (let i = 0; i < arrayObject.length; i++) {
        arrayObject[i].render(gl);
    }
    window.requestAnimFrame(render);
}

