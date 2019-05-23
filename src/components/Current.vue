<template>
  <div class="container" v-if="current" >
    <div class="row">
      <div class="col-12 col-md-8 mt-4">
        <div class="row">
          <div class="table-responsive-sm">
            <table class="table table-sm table-stripped mb-0">
              <tbody>
                <tr>
                  <td class="m-0 p-0">
                    <img style="height:30%;" class="img-fluid" src="../assets/vehicles/car1.jpg" />
                  </td>
                  <td class="m-0 p-0">
                    <img style="height:30%;" class="img-fluid" src="../assets/vehicles/car1.jpg" />
                  </td>
                  <td class="m-0 p-0">
                    <img style="height:30%;" class="img-fluid" src="../assets/vehicles/car1.jpg" />
                  </td>
                  <td class="m-0 p-0">
                    <img style="height:30%;" class="img-fluid" src="../assets/vehicles/car1.jpg" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="row">
          <div class="col-12" style="background-color:white;color:black;">
            <h3>{{make.make}} {{current.model}} {{current.year}} </h3>
            <h4>Item #: {{current.id}}</h4>
          </div>
        </div>
        <div class="row mt-0">
          <div class="col-12 col-md-6">
            <div class="table-responsive-sm">
              <table class="table table-sm table-stripped mb-0">
                <tbody>
                  <tr>
                    <td>
                      <p>Primary Damage</p>
                    </td>
                    <td>
                      <p>{{current.primary_damage}}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Year</p>
                    </td>
                    <td>
                      <p>{{current.year}}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Make</p>
                    </td>
                    <td>
                      <p>{{make.make}}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Model</p>
                    </td>
                    <td>
                      <p>{{current.model}}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Engine Type</p>
                    </td>
                    <td>
                      <p>{{current.engine_type}}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="table-responsive-sm">
              <table class="table table-sm table-stripped m-sm-0">
                <tbody>
                  <tr>
                    <td>
                      <p>Est. Retail Value</p>
                    </td>
                    <td>
                      <p>{{current.est_retail_value | toCurrency}}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Transmission</p>
                    </td>
                    <td>
                      <p>{{current.transmission}}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Cylinders</p>
                    </td>
                    <td>
                      <p>{{current.cylinders}}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Fuel</p>
                    </td>
                    <td>
                      <p>{{current.fuel}}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Odometer</p>
                    </td>
                    <td>
                      <p>{{current.odometer}}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4 mt-md-4 m-0 p-0" style="background-color:#e8e8e8;">
        <div class="row">
          <div class="col-12 text-center">
            <Timer class="mt-2" :min="0" :max="total" :value="remaining" :text="remaining" />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <form @submit="onSubmit">
              <div class="px-4 py-2">
                <div class="form-row">
                  <div class="form-group col-12">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-12">
                    <input type="number" v-model="bidAmount" name="bidAmount" class="form-control" id="bidAmount" :min="min" />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-12">
                    <button type="submit" class="btn btn-primary col-12" v-if="logged" >Bid Now</button>
                    <router-link class="btn btn-primary col-12" to="/login" v-else>Log in</router-link>
                    <small style="text-decoration: underline" class="text-center">Your bid has to be greater than
                      {{min | toCurrency}}</small>
                  </div>
                  <div class="form-group col-12 mb-0">
                    <p style="background-color:grey;color:white;">Previous Bids</p>
                    <div>
                      <p class="text-success" v-bind:key="bid.id" v-for="bid in bids">Bid of {{bid.bid_amount | toCurrency}}</p>
                      <h5 class="text-danger text-center" v-if="bids.length === 0">No bids yet!</h5>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Timer from '@/components/Timer'
export default {
  name: 'Current',
  components: {
    Timer
  },
  data () {
    return {
      lotid: parseInt(this.$route.params.id),
      bidAmount: 0,
      now: Math.trunc((new Date()).getTime() / 1000),
      now2: new Date().getTime(),
      total: 0
    }
  },
  computed: {
    ...mapGetters({currentV: 'currentVehicle', upcoming: 'currentVehicle', currentBids: 'vehicleBids', currentLot: 'lotById', currentMake: 'makeById', logged: 'isLoggedIn'}),
    current: function () {
      return this.currentV(this.lotid)
    },
    bids: function () {
      return this.currentBids(this.current.id)
    },
    lot: function () {
      return this.currentLot(this.lotid)
    },
    make: function () {
      return this.currentMake(this.current.makeId)
    },
    seconds: function () {
      // return (this.now - Math.trunc((new Date(this.current.start_time)).getTime() / 1000))
      return (Math.trunc((new Date(this.current.end_time)).getTime() / 1000) - this.now)
    },
    start: function () {
      return (this.now - Math.trunc((new Date(this.current.start_time)).getTime() / 1000))
    },
    user: function () {
      return this.$store.getters.user
    },
    remaining: function () {
      return (this.seconds > this.total || this.start < 0) ? this.total : this.seconds
    },
    min: function () {
      return this.current.top_bid + 1000
    },
    diff: function () {
      return (Math.trunc((new Date(this.current.end_time)).getTime() / 1000) - this.now)
    }
  },
  methods: {
    ...mapActions(['fetchVehicles', 'socket_new_bid', 'fetchBids', 'socket_update_top_bid', 'vehicleCompleted', 'lotCompleted', 'setTimer', 'socket_update_timers', 'vehicleSold']),
    onSubmit (e) {
      e.preventDefault()
      const bid = {
        vehicle: this.current.id,
        amount: this.bidAmount,
        user: this.user.id
      }
      this.socket_new_bid(bid)
      this.socket_update_top_bid(bid)
      this.bidAmount = 0
      const data = {
        remaining: this.seconds,
        lot: this.lot.id,
        endLot: this.lot.end_live,
        vehicle: this.current.id,
        timer: this.lot.timer,
        number: this.current.lot_number
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
  watch: {
    seconds: function () {
      if (this.seconds === 0) {
        const bid = {
          vehicle: this.current.id,
          amount: this.bidAmount,
          user: this.user.id
        }
        this.vehicleCompleted(bid)
        if (this.current.top_bid >= this.current.reserve_price) {
          this.vehicleSold(bid)
        }
      }
    }
  },
  created () {
    this.fetchBids()
    this.fetchCountDown()
    this.total = this.lot.timer
  }
}
</script>
