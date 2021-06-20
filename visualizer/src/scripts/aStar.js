function getNeighbors(cellIndex) {
    neighborIndices = [ [cellIndex[0] - 1, cellIndex[1]],
                        [cellIndex[0] + 1, cellIndex[1]],
                        [cellIndex[0],     cellIndex[1] - 1],
                        [cellIndex[0],     cellIndex[1] + 1] ]

    neighbors = [];

    for (let i = 1; i < length(neighborIndices); i++) {
        // check if the neighbors are either out of bounds or are walls
        if (neighborIndices[i][0] > 0 && neighborIndices[i][0] < length(cellList) &&
            neighborIndices[i][1] > 0 && neighborIndices[i][1] < length(cellList[0]) &&
            cellList[neighborIndices[i][0]][neighborIndices[i][1]].isWall == false &&
            exploredPoints.includes(cellList[neighborIndices[i][0]][neighborIndices[i][1]] == false)  ) {
                // if not out of bounds or walls, they are valid neighbors
                neighbors.push([neighborIndices[i]]);
            }
    }
    return neighbors;
}

function manhattan(point, dest) {
    return abs(dest[0] - point[0]) + abs(dest[1] - point[1]);
}

function closestPoint(points, dest) {
    var closest = points[0];
    var minDist = manhattan(closest, dest);
    for (let i = 1; i < length(neighbors); i++) {
        newDist = manhattan(points[i], dest);
        if (newDist < minDist) {
            closest = points[i];
            minDist = newDist;
        }
    }
    return closest;
}

start = [0, 0];
dest = [10, 10];
exploredPoints = [start];
aStarPath = [];

function aStar(exploredPoints, dest) {
    var point = closestPoint(exploredPoints, dest)
    if (pathFound == true || manhattan(point, dest) == 1) {
        aStarPath.push(point);
        pathFound = true;
        return aStarPath;
    }
    var neighbors = getNeighbors(point)
    if (neighbors.length() == 0) {
        // no path possible
        return [] // aStarPath = [];
    }
    var closestNeighbor = closestPoint(neighbors, dest);
    exploredPoints.push(closestNeighbor);
    aStarPath = aStar(exploredPoints, dest)
}