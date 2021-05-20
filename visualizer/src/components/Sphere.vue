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
      const bound = 10;
      for (let i = 0; i < num; i++) {
        this.pointList.push([this.randomNumber(bound, this.width-bound), this.randomNumber(bound, this.height-bound)])
      }
    },

    init() {
      var canvas = document.getElementById("canvas");
      this.ctx = canvas.getContext("2d");
      canvas.height = window.innerHeight-20;
      this.height = canvas.height;
      canvas.width = innerWidth-20;
      this.width = canvas.width
      this.ctx.lineWidth = 15;
      this.generatePoints(10);
      
    },

    animate() {
      requestAnimationFrame(this.animate);
      this.ctx.clearRect(0, 0, this.width, this.height);
      // for (let i = 0; i < this.pointList.length; i++) {
      //   this.ctx.beginPath();
      //   this.ctx.arc(this.pointList[i][0], this.pointList[i][1], 5, 0, Math.PI * 2, false);
      //   this.ctx.fillStyle = "black";
      //   this.ctx.fill();
      // }

      this.ctx.moveTo(this.pointList[0][0], this.pointList[0][1]);
      
      for(let i = 0; i < this.pointList.length-1; i++) {
        const x_mid = (this.pointList[i][0] + this.pointList[i+1][0]) / 2;
        const y_mid = (this.pointList[i][1] + this.pointList[i+1][1]) / 2;
        const cp_x1 = (x_mid + this.pointList[i][0]) / 2;
        const cp_x2 = (x_mid + this.pointList[i+1][0]) / 2;
        this.ctx.quadraticCurveTo(cp_x1, this.pointList[i][1], x_mid, y_mid);
        this.ctx.quadraticCurveTo(cp_x2, this.pointList[i+1][1], this.pointList[i+1][0], this.pointList[i+1][1]);
      }
      this.ctx.stroke();
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
