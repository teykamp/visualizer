<template>
  <div>
    
  </div>
</template>

<script>
import * as THREE from 'three'

export default {
  name: 'Sphere',
  data() {
    return {
      sphere: null,
      renderer: null,
      scene: null,
      camera: null
    }
  },
  methods: {
    init() {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(window.innerWidth-10, window.innerHeight-20);
      document.body.appendChild(this.renderer.domElement);

      const geometry = new THREE.SphereGeometry(5, 15, 15);
      const material = new THREE.PointsMaterial({ 
          size: 0.03 
        });
      this.sphere = new THREE.Points(geometry, material);
      this.scene.add(this.sphere);

      this.camera.position.z = 25;
    },

    animate() {
      requestAnimationFrame(this.animate);

      this.sphere.rotation.x += 0.01;
      this.sphere.rotation.y += 0.01;

      this.renderer.render(this.scene, this.camera);
    }
  },
  mounted() {
    this.init();
    this.animate();
  }
}
</script>

<style scoped>


</style>
