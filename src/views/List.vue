<template>
  <div>
    <NavBar />
    <div class="container" v-if="vehicles != ''">
      <div class="row my-4">
        <div class="col-12">
          <h2>Sale List for {{lot.lot_name}}
          </h2>
          <hr>
        </div>
      </div>
      <div class="table-responsive-sm">
        <table class="table table-bordered table-sm table-stripped">
          <thead class="bg-primary">
            <th>Image</th>
            <th>Title</th>
            <th>Sale Time</th>
            <th>Est. Retail Value</th>
            <th>Current Bid</th>
          </thead>
          <VehicleList v-bind:vehicles="vehicles" />
        </table>
      </div>
    </div>
    <div class="container" v-else>
      <div class="row">
        <div class="col-12">
          <h1 class="text-center mt-5 text-danger">No vehicles in this lot at the moment!</h1>
          <router-link class="text-success" :to="`/today`"><h3>Back</h3></router-link>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import VehicleList from '@/components/VehicleList'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'List',
  components: {
    NavBar,
    Footer,
    VehicleList
  },
  data () {
    return {
      lotid: parseInt(this.$route.params.id),
      now: Math.trunc((new Date()).getTime() / 1000)
    }
  },
  computed: {
    ...mapGetters(['lotById', 'lotVehicles']),
    vehicles: function () {
      return this.lotVehicles(this.lotid)
    },
    lot: function () {
      return this.lotById(this.lotid)
    }
  },
  methods: mapActions(['fetchVehicles', 'fetchLots']),
  created () {
    this.fetchLots()
    this.fetchVehicles()
  }
}
</script>
<style>

</style>
