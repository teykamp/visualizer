<template>
  <div>
    <canvas id="canvas"/>
  </div>
</template>

<script>
import Cell from '../classes/Cell.js'

export default {
  name: "Cell",
  data() {
    return {
      ctx: null,
      height: 0,
      width: 0,
      pointList: [], // list of [x, y]
      cellList: [], // list of Cell obj
      globID: 0,
      cellIndex: [0, 0],
      cellSize: 20,
    }
  },
  methods: {

    randomNumber(min, max) {
      return Math.random() * (max - min) + min;
    },

    generatePoints(num) {
      const bound = 100;
      for (let i = 0; i < num; i++) {
        this.pointList.push([this.randomNumber(bound, this.width-bound), this.randomNumber(bound, this.height-bound)]);
      }
    },

    gradient(x1, x2, y1, y2) {
      return (y2-y1) / (x2-x1);
    },

    drawCurve(f, t) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.pointList[0][0], this.pointList[0][1]);

      var m = 0;
      var dx1 = 0;
      var dy1 = 0;
      var dx2 = 0;
      var dy2 = 0;

      var preP = this.pointList[0];

      for (let i = 1; i < this.pointList.length; i++) {
          let curP = this.pointList[i];
          let nexP = this.pointList[i + 1];
          if (nexP) {
              m = this.gradient(preP[0], nexP[0], preP[1], nexP[1]);
              dx2 = (nexP[0] - curP[1]) * -f;
              dy2 = dx2 * m * t;
          }
          else {
              dx2 = 0;
              dy2 = 0;
          }

          this.ctx.bezierCurveTo(
              preP[0] - dx1, preP[1] - dy1,
              curP[0] + dx2, curP[1] + dy2,
              curP[0], curP[1]
          );

          dx1 = dx2;
          dy1 = dy2;
          preP = curP;
      }
      this.ctx.stroke();
    },

    generateGrid(boxSize) {
      const rows = Math.floor(this.height / boxSize);
      const columns = Math.floor(this.width / boxSize);
      const xOffset = (this.width - columns * boxSize) / 2;
      const yOffset = (this.height - rows * boxSize) / 2;
      for (let i = 0; i < columns; i++) {
        var cellColumn = [];
        for (let j = 0; j < rows; j++) {
          const x = i * boxSize + xOffset;
          const y = j * boxSize + yOffset;
          let cell = new Cell(x, y, boxSize, this.globID, this.cellIndex);
          cellColumn.push(cell);
          this.globID++;
          this.cellIndex[1]++;
          console.log(this.cellIndex);

        }
        this.cellIndex[1] = 0;
        this.cellIndex[0]++;
        this.cellList.push(cellColumn);
      }
    },

    drawGrid() {
      this.ctx.beginPath();
      for (let i = 0; i < this.cellList.length; i++) {
        for (let j = 0; j < this.cellList[i].length; j++) {
          const cell = this.cellList[i][j];
          this.ctx.fillStyle = cell.fillStyle;
          this.ctx.lineWidth = cell.lineWidth;
          this.ctx.strokeStyle = cell.strokeStyle;
          this.ctx.rect(cell.x, cell.y, cell.cellSize, cell.cellSize);
        }
      }
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
    },

    init() {
      var canvas = document.getElementById("canvas");
      this.ctx = canvas.getContext("2d");
      canvas.height = window.innerHeight-30;
      this.height = canvas.height;
      canvas.width = innerWidth-17;
      this.width = canvas.width
      this.ctx.lineWidth = 5;
      this.generateGrid(this.cellSize);
      // this.generatePoints(10);
    },

    draw() {
      requestAnimationFrame(this.draw);
      this.ctx.clearRect(0, 0, this.width, this.height);
      // this.drawCurve(.5, .5);
      this.hoverCell();
      this.drawGrid();
    }
  },

  mounted() {
    this.init();
    this.draw();
  }
}
</script>

<style scoped>

</style>
