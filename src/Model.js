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

  changeVertices(vertices){
    this.vertices=vertices;
  }
  getLengthVertices(){
    return this.vertices.length;
  }
  addVertexColor(color){
    this.verticesColor.push(color);
  }
  getVertex(i){
    return this.vertices[i];
  }
  changeLastVertex(vertex){
    if (this.vertices.length!=0){
      this.vertices[this.vertices.length-1] = vertex;
    }
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

  constructor(id){
    super(id, "Polygon" +id);
  }

  render(gl){
    super.render(gl);
    gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length);
  }
}

class Square extends Model {
  constructor(id){
    super(id, "Square" +id);
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
    console.log(this.vertices)
  }
  
  changeSideModel(newLength){
    newLength = newLength / 10
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
  constructor(id){
    super(id, "Rectangle" +id);
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
    newModel()
  }
  
  changeSideModel(panjang, lebar){
    panjang = panjang / 10
    lebar = lebar / 10
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
  constructor(id){
    super(id, "Line"+id);
  }

  render(gl){
    super.render(gl);
    gl.drawArrays(gl.LINES, 0, this.vertices.length);
  }


}