//Setiap bangun (Line, Square, Rectangle) harus bisa jalanin ini

// var maxNumTriangles = 200;
// var maxNumVertices = 3 * maxNumTriangles;
var cBuffer;
var vColor;
var vBuffer;
var vPosition;
var vColor;
var ver0;
var ver;
var newVertices;
var colorPicker = [0.0,0.0,0.0,1.0];

var id_polygon = 0
var id_line = 0
var id_square = 0
var id_rectangle =0
// pisah polygon 
class Model {

  constructor(id, name){
    this.name = name;
    this.vertices = [];
    this.verticesColor = [];
    this.id = id;
  } 
  addVertex(vertex){
    this.vertices.push(vertex);
  }
  getLengthVertices(){
    return this.vertices.length;
  }
  changeVertices(vertices){
    this.vertices=vertices;
  }
  getLengthVertices(){
    return this.vertices.length;
  }
  addVertexColor(color){
    this.verticesColor.push(color);
  }
  changeVerticesColor(id, color){
    this.verticesColor[id] = color
  }
  deleteVerticesColor(){
    this.verticesColor =[];
  }
  getVertex(i){
    return this.vertices[i];
  }
  changeLastVertex(vertex){
    if (this.vertices.length!=0){
      this.vertices[this.vertices.length-1] = vertex;
    }
  }

  changeVertex(i, newvertex) {
    this.vertices[i] = newvertex
  }

  render(gl){
    const vertices = [];
    const colors = [];
    for (let j = 0; j < this.vertices.length; j++) {
      vertices.push(this.vertices[j]);
      colors.push(this.verticesColor[j]);
    }
    
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

  
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);
  }
  isEmpty(){
    return this.vertices.length==0;
  }
}

class Polygon extends Model{
  
  constructor(){
    id_polygon +=1
    super(id_polygon, "Polygon " +id_polygon);
    
  }

  render(gl){
    super.render(gl);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, this.vertices.length);
  }

  deleteVertex(id) {
    this.vertices.splice(id, 1);
  }
}

class Square extends Model {
  constructor(){
    id_square +=1
    super(id_square, "Square " +id_square);
  }

  addVertex(x,y){
    super.addVertex(vec2(x, y));
    super.addVertex(vec2(x, y+0.2));
    super.addVertex(vec2(x+0.2, y));
    super.addVertex(vec2(x+0.2, y+0.2));
    super.addVertex(vec2(x, y+0.2));
    super.addVertex(vec2(x+0.2, y));
    super.addVertexColor(colorPicker);
    super.addVertexColor(colorPicker);
    super.addVertexColor(colorPicker);
    super.addVertexColor(colorPicker);
    super.addVertexColor(colorPicker);
    super.addVertexColor(colorPicker);
  }
  
  changeSideModel(newLength){
    newVertices = []
    ver0 = this.getVertex(0);
    newVertices.push(ver0)
    for(let i = 1; i < this.vertices.length; i++){
      ver = this.getVertex(i);
      if(ver[0] > ver0[0] && ver[1] == ver0[1]){
        ver[0] = ver0[0] + newLength
      }else if(ver[1] > ver0[1] && ver[0] == ver0[0]){
        ver[1] = ver0[1] + newLength
      }else{
        ver[0] = ver0[0] + newLength
        ver[1] = ver0[1] + newLength
      } 
      newVertices.push(ver);
    }
    console.log(newVertices)
    this.changeVertices(newVertices)
  }

  render(gl){
    super.render(gl);
    gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length);
  }
}

class Rectangle extends Model {
  constructor(){
    id_rectangle +=1
    super(id_rectangle, "Rectangle" +id_rectangle);
  }

  addVertex(x,y){
    super.addVertex(vec2(x, y));
    super.addVertex(vec2(x, y+0.1));
    super.addVertex(vec2(x+0.3, y));
    super.addVertex(vec2(x+0.3, y+0.1));
    super.addVertex(vec2(x, y+0.1));
    super.addVertex(vec2(x+0.3, y));
    super.addVertexColor(colorPicker);
    super.addVertexColor(colorPicker);
    super.addVertexColor(colorPicker);
    super.addVertexColor(colorPicker);
    super.addVertexColor(colorPicker);
    super.addVertexColor(colorPicker);
  }
  
  changeSideModel(panjang, lebar){
    newVertices = []
    ver0 = this.getVertex(0);
    newVertices.push(ver0)
    for(let i = 1; i < this.vertices.length; i++){
      ver = this.getVertex(i);
      if(ver[0] > ver0[0] && ver[1] == ver0[1]){
        ver[0] = ver0[0] + lebar
      }else if(ver[1] > ver0[1] && ver[0] == ver0[0]){
        ver[1] = ver0[1] + panjang
      }else{
        ver[0] = ver0[0] + lebar
        ver[1] = ver0[1] + panjang
      } 
      newVertices.push(ver);
    }
    console.log(newVertices)
    this.changeVertices(newVertices)
  } 

  render(gl){
    super.render(gl);
    gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length);
  }
}

class Line extends Model {
  constructor(){
    id_line +=1
    super(id_line, "Line"+id_line);
  }

  render(gl){
    super.render(gl);
    gl.drawArrays(gl.LINES, 0, this.vertices.length);
  }


}