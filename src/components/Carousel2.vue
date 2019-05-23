<template>
  <div class="container">
    <b-carousel id="carousel-1" v-model="slide" :interval="5000" controls indicators background="#ababab"
      img-width="1024" img-height="480" style="text-shadow: 1px 1px 2px #333;" @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd">

      <b-carousel-slide>
        <img slot="img" class="d-block img-fluid w-100" width="1024" height="480" src="../assets/vehicles/car1.jpg"
          alt="image slot">
        <h1>Example Headline</h1>
        <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget
        metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
        <p>
          <router-link class="btn btn-lg btn-primary" to="/login">Sign up today</router-link>
        </p>
      </b-carousel-slide>

      <b-carousel-slide>
        <img slot="img" class="d-block img-fluid w-100" width="1024" height="480" src="../assets/vehicles/car1.jpg"
          alt="image slot">
          <h1>Example Headline</h1>
          <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget
          metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
          </p>
          <p><a class="btn btn-lg btn-primary" href="#" role="button">Learn more</a></p>
      </b-carousel-slide>

      <b-carousel-slide img-blank img-alt="Blank image">
          <h1>Example Headline</h1>
          <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget
          metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
          </p>
          <p><a class="btn btn-lg btn-primary" href="#" role="button">Learn more</a></p>
      </b-carousel-slide>

    </b-carousel>
  </div>
</template>

<script>
export default {
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
