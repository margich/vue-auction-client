<template>
  <div>
    <NavBar />
    <div class="container">
      <div class="row my-4">
        <div class="col-12">
          <h2>Make of {{make.make}}</h2>
          <hr>
        </div>
      </div>
      <div class="table-responsive-sm">
        <table class="table table-bordered table-sm table-stripped">
          <thead class="bg-primary">
            <th>Image</th>
            <th>Title</th>
            <th>Sale Date</th>
            <th>Est. Retail Value</th>
            <th>Current Bid</th>
          </thead>
          <VehicleList v-bind:vehicles="vehicles" />
        </table>
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
  name: 'Makes',
  components: {
    NavBar,
    Footer,
    VehicleList
  },
  data () {
    return {
      make_id: parseInt(this.$route.params.id)
    }
  },
  computed: {
    ...mapGetters(['makeById', 'makeVehicles']),
    vehicles: function () {
      return this.makeVehicles(this.make_id)
    },
    make: function () {
      return this.makeById(this.make_id)
    }
  },
  methods: mapActions(['fetchVehicles', 'fetchMakes']),
  created () {
    this.fetchVehicles()
    this.fetchMakes()
  }
}
</script>
<style>

</style>
