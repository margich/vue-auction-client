<template>
  <div class="container">
    <div class="row my-4">
      <div class="col-12">
        <h2>{{ current.make + ' ' + current.model }}</h2>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-lg-4">
        <div class="table-responsive-sm">
          <table class="table table-sm table-stripped">
            <tbody>
              <tr>
                <td>
                  <p>Category</p>
                </td>
                <td>
                  <p>{{current.make}}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Primary Damage</p>
                </td>
                <td>
                  <p>{{current.make}}</p>
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
                  <p>{{current.make}}</p>
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
            </tbody>
          </table>
        </div>
      </div>

      <div class="col-12 col-lg-4">
        <div class="table-responsive-sm">
          <table class="table table-sm table-stripped">
            <tbody>
              <tr>
                <td>
                  <p>Est. Retail Value</p>
                </td>
                <td>
                  <p>{{current.est_retail_value}}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Transmission</p>
                </td>
                <td>
                  <p>{{current.make}}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Cylinders</p>
                </td>
                <td>
                  <p>{{current.make}}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Fuel</p>
                </td>
                <td>
                  <p>{{current.make}}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Odometer</p>
                </td>
                <td>
                  <p>{{current.make}}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="col-12 col-lg-4">
        <div class="row">
          <div class="col-12 text-center">
            <div class="well">
              <div class="pomodoro-timer">
                {{timer}}
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="p-4" style="background-color:rgb(173, 180, 206);">
              <div class="form-row">
                <div class="form-group">
                  <label>Current Bid:</label>
                  <span>{{current.top_bid}}</span>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-12">
                  <label for="bid-amount">Your Bid:</label>
                  <input v-model="bidAmount" type="number" name="bid_amount" class="form-control" id="bid_amount" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-12">
                  <button v-on:click="postBid" class="btn btn-primary col-12">Bid Now</button>
                  <small>Your bid has to be greater than {{current.top_bid}}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Current1',
  props: ['current1'],
  data () {
    return {
      timer: 5,
      balance: 5000,
      bidAmount: 0,
      userId: 1,
      vehicleId: 1,
      isConnected: false
    }
  },
  methods: {
    /* countdown: function () {
      function tick () {
        this.timer = this.timer - 1
        if (this.timer === 0) {
          this.timer = 60
          console.log('Timer expired')
        }
      }
      tick()
    }, */
    changeTimer: function (timer) {
      console.log(timer)
      console.log(this.current.id)
      this.timer = timer
      if (this.timer === 0) {
        if (this.current.top_bid > this.current.reserve_price) {
          console.log('sold')
        }
        this.$emit('expire')
        this.timer = 5
      }
    },
    changeData: function () {
      this.$socket.emit('initial_data', {lot: this.lotid})
    },
    currentExpire: function () {
      axios.patch(`http://localhost:3000/api/vehicles/${this.currentId}/completed`)
        .then(response => {
          // this.$socket.emit('reset_timer', {timer: 5})
          this.$socket.emit('vehicle_expire', {
            vehicle: this.currentId
          })
        })
        .catch(err => console.log({
          errr: err
        }))
    },
    vehicleExpired: function () {
      this.$socket.emit('vehicle_expire', {vehicle: this.currentId})
    },
    getData: function (vehicle) {
      // console.log(vehicle)
      this.current = vehicle
      this.currentId = vehicle.id
    },
    starttimer: function () {
      this.$socket.emit('start_timer', this.timer)
    },
    isLoggedIn: function () {
      return true
    },
    hasBalance: function () {
      return true
    },
    subtractBalance: function () {
      // run api request
      this.balance = this.balance - 1000
    },
    isGreater: function () {
      return true
    },
    validate: function () {
      // run validation
      return true
    },
    postBid: function () {
      this.$emit('add', this.bidAmount, this.userId, this.current.id)
      this.bidAmount = 0
      // update vehicles
      // subtract user balance
      this.subtractBalance()
      // let bid_amount = bidAmount
      /* axios.post(`http://localhost:3000/api/bids`, {bid_amount: this.bid_amount, vehicle_id: this.vehicle_id, user_id: this.user_id})
        .then(response => {
          console.log(response)
        }) */
    }
  },
  mounted () {
    // let current = this.$socket.emit('join_lot', this.lot.id)
    // console.log('lot id ' + this.lotId)
    // this.$socket.on('get_data', this.currentId)
    // let lot = this.$route.params.id
    /* this.$socket.emit('initial_data', {lot: this.lotid}
    this.$socket.on('change_data', this.changeData) */
    this.$socket.emit('start_timer', {timer: this.timer})
  }
}
</script>
