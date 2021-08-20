<template>
  <div>
      <!-- grid -->
    <div id="grid" @mousedown="isMouseDown = true"
                   @mouseup="isMouseDown = false"
                   >
      <div class="row" v-for="cellRow in cellList" v-bind:key="cellRow">
          <CellRow  v-bind:cellRow="cellRow"
                    v-bind:isMouseDown="isMouseDown"
                    v-bind:wallDrawingMode="wallDrawingMode"
                    v-bind:startIndex="startIndex"
                    v-bind:finishIndex="finishIndex"
                    v-on:wallDrawingMode="drawEmitHelper($event)"
                    v-on:updateIndex="indexEmitHelper($event)"
                    />
      </div>
    </div>

  </div>
</template>

<script>
import Cell from "../classes/Cell.js"
import CellRow from "./CellRow.vue";

export default {
  name: "Grid",
  components: {
    CellRow
  },
  data() {
    return {
        ctx: null,
        height: 0,
        width: 0,
        pointList: [], // list of [x, y]
        cellList: [], // list of Cell obj
        globID: 0, // can probably be local to generateGrid()
        cellIndex: [0, 0], // can probably be local to generateGrid()
        cellSize: 30, // cellsize is default 30
        isMouseDown: false, // checks if mouse button pressed
        wallDrawingMode: false, // checks if adding or reomving walls based on first cell from mouse drag
        startIndex: [0, 0], // index of START cell
        finishIndex: [1, 1], // index of FINISH cell
        wallList: [], // list of all wall cells by index
    }
  },
  methods: {
    drawEmitHelper(emitted) {
        this.wallDrawingMode = emitted;
    },

    indexEmitHelper({action, index}) {
      switch (action) {
        case "removeWall":
          this.wallList = this.wallList.filter(function(item) {
            return item != index
          })
          break;

        case "addWall":
          this.wallList.push(index);
          break;

        case "updateStart":
          if (index != this.finishIndex){
            this.startIndex = index;
          }
          break;

        case "updateFinish":
          if (index !=this.startIndex) {
            this.finishIndex = index;
          }
          break;
      }
    },

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
      // TODO: change box size based on screen size. Smaller screens hae more dense boxes meaning that all screens have similar box count
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
        }
        this.cellIndex[1] = 0;
        this.cellIndex[0]++;
        this.cellList.push(cellColumn);
      }

      // set top left/bottom right as start/finish
      let cellStart = this.cellList[0][0];
      cellStart.fillStyle = cellStart.cellType.START;
      let cellEnd = this.cellList[columns-1][rows-1];
      cellEnd.fillStyle = cellEnd.cellType.FINISH;
      // init var (scalable)
      this.finishIndex = [columns-1, rows-1];
    },

    init() {
      // need to make this useable for alternate boxSizes
      // currently wraps when window resized without reload
      this.height = window.innerHeight * 0.9;
      this.width = window.innerWidth * 0.92;
      this.generateGrid(this.cellSize);
      // document.getElementById("grid").onmousemove = this.findObjectCoords();
      // this.generatePoints(10);

    },
  },

  mounted() {
    this.init();
    // this.draw();
  },
}
</script>

<style scoped>
.row{
  display: inline-flex;
}
</style>
