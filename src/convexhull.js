// Jarvis’ Algorithm

// mencari orientation dari triplet (v1, v2, v3).
function checkOrientation(v1, v2, v3) {
    // check gradien m1 = titik v2 dan v1, m2 titik v3 dan v2 
    // val = m1 - m2
    let orientation = (v2[1] - v1[1]) * (v3[0] - v2[0]) -
        (v2[0] - v1[0]) * (v3[1] - v2[1]);

    if (orientation > 0){
        // clockwise
        return 1;  
    }
    else if (orientation < 0) {
        // counterclockwise
        return -1 
    }
    else{
        // colinear
        return 0;
    } 
}

function leftmost(vertices,n){
    let leftvertex= 0;
    for (let i = 1; i < n; i++){
        if (vertices.getVertex(i)[0] < vertices.getVertex(leftvertex)[0]){
            leftvertex = i;
        }
    }
    return leftvertex;
}

function convexHull(vertices, n) {
    // minimal terdapat 3 vertex
    if (n < 3) return;

    // Result
    let hull = [];

    // mencari titik paling ujung kiri
    let left = leftmost(vertices, n);
    let onhull = left;
    let vertex;

    do{
        // assign leftmost ke hull
        hull.push(vertices.getVertex(onhull));
        vertex = (onhull + 1) % n;

        for (let i = 0; i < n; i++) {
            if (checkOrientation(vertices.getVertex(onhull), vertices.getVertex(i), vertices.getVertex(vertex)) == -1){
                vertex = i;
            }
        }

        onhull = vertex;

    } while (onhull != left) // stop
    return hull;
    
}
