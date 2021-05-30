<template>
  <div>
    <canvas id="canvas"/>
  </div>
</template>

<script>
export default {
  name: 'Sphere',
  data() {
    return {
      ctx: null,
      height: 0,
      width: 0,
      pointList: [],
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

    init() {
      var canvas = document.getElementById("canvas");
      this.ctx = canvas.getContext("2d");
      canvas.height = window.innerHeight-20;
      this.height = canvas.height;
      canvas.width = innerWidth-20;
      this.width = canvas.width
      this.ctx.lineWidth = 5;
      this.generatePoints(10);

    },

    animate() {
      requestAnimationFrame(this.animate);
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.drawCurve(.5, .5);
    }
  },

  mounted() {
    this.init();
    this.animate();
  }
}
</script>

<style scoped>
#canvas {
  background: lightgoldenrodyellow;
}

</style>
