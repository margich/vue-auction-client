<template>
  <div>
    <NavBar />
    <div class="container">
      <h1 class="text-center text-dark mt-4">{{vehicle.year + ' ' + make.make + ' ' + vehicle.model}}</h1>
      <hr>
      <div class="row">
        <div class="col-12 col-md-6">
          <Carousel v-bind:images="vehicle.images"/>
        </div>
        <div class="col-12 col-md-6">
          <form @submit="onSubmit">
            <div class="px-4 py-2">
              <div class="form-row">
                <div class="col-6">
                  <label>Sale Date:</label>
                </div>
                <div class="col-6">
                  <span>{{vehicle.start_time | formatDate}}</span>
                </div>
              </div>
              <div class="form-row">
                <div class="col-6">
                    <label>Current Bid:</label>
                </div>
                <div class="col-6">
                    <span>{{vehicle.top_bid | toCurrency}}</span>
                </div>
              </div>
              <div v-if="this.now < Math.trunc((new Date(vehicle.end_time)).getTime() / 1000)">
                <div class="form-row">
                  <div class="form-group col-12">
                      <label for="bid">Your Bid:</label>
                      <input type="number" v-model="bidAmount" name="bidAmount" class="form-control" id="bidAmount" :min="min" />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group text-left col-12">
                    <button class="btn btn-primary btn-block mb-2" v-if="logged">Bid Now</button>
                    <router-link class="btn btn-primary col-12" to="/login" v-else>Log in</router-link>
                    <small style="text-decoration: underline">Your bid has to be greater than
                        {{min | toCurrency}}</small>
                  </div>
                </div>
              </div>
              <div v-else>
                <h3 class="text-center text-success">Auction over</h3>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12">
          <div class="table-responsive">
            <h2 class="text-dark">Features</h2>
            <table class="table table-sm table-stripped">
              <thead>
              </thead>
              <tbody>
                <tr>
                  <td>Condition</td>
                  <td>{{vehicle.condition}}</td>
                </tr>
                <tr>
                  <td>Primary Damage</td>
                  <td>{{vehicle.primary_damage}}</td>
                </tr>
                <tr>
                  <td>Make</td>
                  <td>{{make.make}}</td>
                </tr>
                <tr>
                  <td>Model</td>
                  <td>{{vehicle.model}}</td>
                </tr>
                <tr>
                  <td>Year</td>
                  <td>{{vehicle.year}}</td>
                </tr>
                <tr>
                  <td>Estimated Retail Value</td>
                  <td>{{vehicle.est_retail_value | toCurrency}}</td>
                </tr>
                <tr>
                  <td>Engine Type</td>
                  <td>{{vehicle.engine_type}}</td>
                </tr>
                <tr>
                  <td>Cylinders</td>
                  <td>{{vehicle.cylinders}}</td>
                </tr>
                <tr>
                  <td>Transmission</td>
                  <td>{{vehicle.transmission}}</td>
                </tr>
                <tr>
                  <td>Fuel</td>
                  <td>{{vehicle.fuel}}</td>
                </tr>
                <tr>
                  <td>Odometer</td>
                  <td>{{vehicle.odometer}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import Carousel from '@/components/VehicleCarousel'
export default {
  name: 'Vehicle',
  components: {
    NavBar,
    Footer,
    Carousel
  },
  data () {
    return {
      id: parseInt(this.$route.params.id),
      bidAmount: 0,
      now: Math.trunc((new Date()).getTime() / 1000)
    }
  },
  computed: {
    ...mapGetters({currentV: 'vehicleById', currentM: 'makeById', currentLot: 'lotById', logged: 'isLoggedIn'}),
    vehicle: function () {
      return this.currentV(this.id)
    },
    make: function () {
      return this.currentM(this.vehicle.makeId)
    },
    lot: function () {
      return this.currentLot(this.vehicle.lotId)
    },
    min: function () {
      return this.vehicle.top_bid + 1000
    },
    seconds: function () {
      return (Math.trunc((new Date(this.vehicle.end_time)).getTime() / 1000) - this.now)
    },
    start: function () {
      return (this.now - Math.trunc((new Date(this.vehicle.start_time)).getTime() / 1000))
    },
    remaining: function () {
      return (this.seconds > this.total || this.start < 0) ? this.total : this.seconds
    }
  },
  methods: {
    ...mapActions(['fetchVehicles', 'fetchLots', 'socket_new_bid', 'socket_update_top_bid', 'vehicleCompleted', 'socket_update_timers']),
    onSubmit (e) {
      e.preventDefault()
      const bid = {
        vehicle: this.vehicle.id,
        amount: this.bidAmount,
        user: this.user.id
      }
      this.socket_new_bid(bid)
      this.socket_update_top_bid(bid)
      this.bidAmount = 0
      const data = {
        remaining: this.seconds,
        lot: this.lot.id,
        vehicle: this.vehicle.id,
        timer: this.lot.timer,
        number: this.vehicle.lot_number
      }
      if (this.start > 0) {
        this.socket_update_timers(data)
        this.total = this.lot.timer
      }
    },
    fetchCountDown: function () {
      setInterval(() => {
        this.now = Math.trunc((new Date()).getTime() / 1000)
      }, 1000)
    }
  },
  created () {
    this.fetchVehicles()
    this.fetchLots()
    this.fetchCountDown()
  }
}
</script>
