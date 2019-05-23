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
            {{timer}}
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
export default {
  name: 'Current3',
  props: ['current'],
  data () {
    return {
      timer: 60,
      balance: 5000,
      bidAmount: 0,
      userId: 1,
      vehicleId: 1,
      isConnected: false
    }
  },
  methods: {
    changeTimer: function (timer) {
      this.timer = timer
      if (this.timer === 0) {
        if (this.current.top_bid > this.current.reserve_price) {
          console.log(this.reserve_price)
          this.$emit('sold')
        }
        this.$emit('expire')
        this.timer = 60
        this.$socket.emit('start_timer', {timer: this.timer})
      }
    },
    starttimer: function () {
      this.$socket.emit('start_timer', this.timer)
    },
    resetTimer: function () {
      this.$socket.emit('reset_timer', {timer: 60})
    },
    subtractBalance: function () {
      this.balance = this.balance - 1000
    },
    postBid: function () {
      this.resetTimer()
      this.$emit('add', this.bidAmount, this.userId, this.current.id, this.current.top_bid)
      this.bidAmount = 0
      this.subtractBalance()
    }
  },
  mounted () {
    this.$socket.emit('start_timer', {timer: this.timer, reset: 0})
    this.$socket.on('timer', this.changeTimer)
  }
}
</script>
