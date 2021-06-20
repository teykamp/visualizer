<template>
  <div>
      <div div class="row" v-for="cell in cellRow" v-bind:key="cell.globID">
        <Cell v-bind:cell="cell"
              v-bind:isMouseDown="isMouseDown"
              v-bind:wallDrawingMode="wallDrawingMode"
              v-on:wallDrawingMode="emitHelper($event)"/>
      </div>
  </div>
</template>

<script>
import Cell from "./Cell"

export default {
    name: "CellRow",
    data() {
        return {

        }
    },

    components: {
        Cell
    },

    props: [
        "cellRow",
        "isMouseDown",
        "wallDrawingMode",
    ],

    methods: {
        emitHelper(emitted) {
            this.$emit("wallDrawingMode", emitted)
        },
    },

    mounted() {

    }
}
</script>

<style>

</style>