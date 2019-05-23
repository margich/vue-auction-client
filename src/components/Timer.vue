<template id="progress-ring">
  <svg class="progress-ring" viewBox="-50,-50,100,100">
    <circle class="progress-ring-circle" r="46"></circle>
    <path class="progress-ring-ring" :d="path"></path>
    <circle class="progress-ring-end" :cx="endX" :cy="endY" r="0"></circle>
    <text style="color:white;font-size:40;font-Weight:bold;" alignment-baseline="middle" text-anchor="middle">{{ text }}
    </text>
  </svg>
</template>

<script>
export default {
  name: 'progress-ring',
  props: {
    value: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 1
    },
    text: {
      type: null,
      default: ''
    }
  },
  computed: {
    theta () {
      const frac = (this.value - this.min) / (this.max - this.min) || 0
      return frac * 2 * Math.PI
    },
    path () {
      const large = this.theta > Math.PI
      return `M0,-46 A46,46,0,${large ? 1 : 0},1,${this.endX},${this.endY}`
    },
    endX () {
      return Math.cos(this.theta - Math.PI * 0.5) * 46
    },
    endY () {
      return Math.sin(this.theta - Math.PI * 0.5) * 46
    }
  }
}
</script>
<style scoped>
.progress-ring {
  width: 161px;
  height: 161px;
}
.progress-ring-circle {
  stroke: #adb5bd;
  stroke-width: 4;
  fill: #adb5bd;
}
.progress-ring-ring {
  stroke:#007bff;
  stroke-width: 7;
  fill: #adb5bd;
  /* fill: #007bff; */
}
.progress-ring-end {
  fill: #007bff;
}
</style>
