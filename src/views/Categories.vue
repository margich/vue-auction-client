<template>
  <div>
    <NavBar />
    <div class="container">
      <div class="row my-4">
        <div class="col-12">
          <h2>Category of {{category.category}}</h2>
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
  name: 'Categories',
  components: {
    NavBar,
    Footer,
    VehicleList
  },
  data () {
    return {
      id: parseInt(this.$route.params.id)
    }
  },
  computed: {
    ...mapGetters(['categoryById', 'categoryVehicles']),
    vehicles: function () {
      return this.categoryVehicles(this.id)
    },
    category: function () {
      return this.categoryById(this.id)
    }
  },
  methods: mapActions(['fetchVehicles', 'fetchCategories']),
  created () {
    this.fetchVehicles()
    this.fetchCategories()
  }
}
</script>
<style>

</style>
