<template>
  <tbody>
    <tr v-bind:key="vehicle.id" v-for="vehicle in vehicles">
      <td>
        <Carousel v-bind:images="vehicle.images" class="img-fluid"/>
      </td>
      <td> {{vehicle.year + ' ' + vehicle.make.make + ' ' + vehicle.model}} </td>
      <td> {{vehicle.start_time | formatDate}} </td>
      <td> {{vehicle.est_retail_value | toCurrency}} </td>
      <td>
        {{vehicle.top_bid | toCurrency}}
        <div class="row">
          <div class="col-12 text-left">
            <router-link class="btn btn-success btn-sm" :to="`/live/${vehicle.lot}`" v-if="now >= new Date(vehicle.start_time).getTime() && now <= new Date(vehicle.end_time).getTime()">Live Bid</router-link>
            <router-link class="btn btn-primary btn-sm" :to="`/vehicle/${vehicle.id}`" v-if="now < new Date(vehicle.start_time).getTime() && now < new Date(vehicle.end_time).getTime()">Bid Now</router-link>
          </div>
        </div>
      </td>
    </tr>
  </tbody>
</template>

<script>
import Carousel from '@/components/VehicleCarousel'
export default {
  name: 'VehicleList',
  props: ['vehicles'],
  components: {
    Carousel
  },
  data () {
    return {
      now: new Date().getTime()
    }
  },
  methods: {
    countDown: function () {
      setInterval(() => {
        this.now = new Date().getTime()
      }, 1000)
    }
  },
  created () {
    this.countDown()
  }
}
</script>
