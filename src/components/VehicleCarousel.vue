<template>
  <b-carousel v-model="slide" :interval="5000" controls @sliding-start="onSlideStart"
    @sliding-end="onSlideEnd">
    <b-carousel-slide v-bind:key="image.id" v-for="image in images">
      <img slot="img" class="img-fluid" :src="`../static/images/vehicles/${image.image_url}`">
    </b-carousel-slide>
  </b-carousel>
</template>

<script>
export default {
  name: 'VehicleCarousel',
  props: ['images'],
  data () {
    return {
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  }
}
</script>
