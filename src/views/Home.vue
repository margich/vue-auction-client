<template>
  <div>
    <NavBar />
    <Carousel />
    <div class="container">
      <div class="row">
        <div class="col-12 text-center mt-4">
          <h2>Browse Vehicles</h2>
          <hr>
        </div>
      </div>

      <div class="row">
        <div class="col-12 mt-2">
          <h4>Makes</h4>
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-md-3 col-lg-3 mt-2">
          <ul class="text-left pull-left m-0">
            <li style="list-style: none;" v-bind:key="make.id" v-for="make in makes">
              <router-link :to="`/makes/${make.id}`" v-if="countM(make.id) > 0"> {{make.make}} </router-link>
            </li>
          </ul>
        </div>
      </div>

      <div class="row">
        <div class="col-12 mt-4">
          <h4 class="">Category</h4>
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-md-3 col-lg-3 mt-2">
          <ul class="text-left pull-left m-0">
            <li style="list-style: none;" v-bind:key="category.id" v-for="category in categories">
              <router-link :to="`/categories/${category.id}`" v-if="countC(category.id) > 0"> {{category.category}} </router-link>
            </li>
          </ul>
        </div>
      </div>

    </div>
    <Footer />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import Carousel from '@/components/Carousel2'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Home',
  components: {
    NavBar,
    Footer,
    Carousel
  },
  computed: {
    ...mapGetters({makes: 'allMakes', categories: 'allCategories', countMake: 'countMakeVehicles', countCategory: 'countCategoryVehicles'})
  },
  methods: {
    ...mapActions(['fetchMakes', 'fetchCategories', 'fetchVehicles']),
    countM: function (id) {
      return this.countMake(id)
    },
    countC: function (id) {
      return this.countCategory(id)
    }
  },
  created () {
    this.fetchMakes()
    this.fetchCategories()
    this.fetchVehicles()
  }
}
</script>
<style>

</style>
