export default class Cell {
    constructor(x, y, cellSize, globID, cellIndex) {
        this.x = x;
        this.y = y;
        this.cellSize = cellSize;
        this.cellCenter = [x + cellSize/2, y + cellSize/2];
        this.globID = globID;
        this.fillStyle = "white";
        this.lineWidth = 1;
        this.borderStyle = "1px solid black";
        this.cellIndex = cellIndex;
        // add images for start/finish
        this.cellType = {
            WALL: "black",
            START: "#00cc99", // mint
            FINISH: "gold",
            EMPTY: "white"
        };
        this.prevType = this.cellType.EMPTY;
    }

    isType(type) {
        // comparisons of types easier
        const cellTypes = {
            "WALL": this.cellType.WALL,
            "START": this.cellType.START,
            "FINISH": this.cellType.FINISH,
            "EMPTY": this.cellType.EMPTY
        };
        return this.fillStyle == cellTypes[type];
    }

    toggleWall() {
        this.fillStyle = (this.fillStyle == this.cellType.WALL) ? this.cellType.EMPTY : this.cellType.WALL;
    }

    setWall() {
        if (this.fillStyle == this.cellType.EMPTY) {
            // no paving over start/finish
            this.fillStyle = this.cellType.WALL;
        }
    }

    removeWall() {
        if (this.fillStyle == this.cellType.WALL) {
            // no paving over start/finish
            this.fillStyle = this.cellType.EMPTY;
        }
    }

    setStart() {
        if (this.fillStyle != this.cellType.START && this.fillStyle != this.cellType.FINISH) {
            this.prevType = this.fillStyle;
            this.fillStyle = this.cellType.START;
        }
    }

    setFinish() {
        if (this.fillStyle != this.cellType.START && this.fillStyle != this.cellType.FINISH) {
            this.prevType = this.fillStyle;
            this.fillStyle = this.cellType.FINISH;
        }
    }

    setPrev() {
        this.fillStyle = this.prevType;
    }

}