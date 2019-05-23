<template>
  <div>
    <NavBar />
    <div v-if="current">
      <h1 class="text-center"> {{this.current.id}} </h1>
      <div v-if="Bids != ''">
        <h1 class="text-center text-success"> New Bid of {{this.Bids.data.bid}} </h1>
      </div>
      <Current v-bind:current="current" v-on:add="newBid" v-on:expire="currentExpire" v-on:sold="currentSold" />
    </div>
    <div v-else class="mt-5">
      <h1 class="text-center">Items in Lot Over</h1>
    </div>
    <Footer />
  </div>
</template>

<script>
// import socket from 'socket.io-client'
import Current from '@/components/Current'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import axios from 'axios'

export default {
  name: 'Live2',
  components: {
    NavBar,
    Footer,
    Current
  },
  data () {
    return {
      vehicles: [],
      lot: [],
      current: {},
      currentId: 0,
      lotid: this.$route.params.id,
      Bids: []
    }
  },
  methods: {
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
    currentSold: function () {
      axios.patch(`http://localhost:3000/api/vehicles/${this.currentId}/sold`)
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
    newBid: function (bidAmount, userId, vehicleId, topBid) {
      if (bidAmount <= topBid) {
        console.log('your bid is less than the top bid')
        // eslint-disable-next-line
      }
      else {
        axios.post(`http://localhost:3000/api/bids`, {bid_amount: bidAmount, vehicle_id: vehicleId, user_id: userId, bid_timestamp: new Date()})
          .then(response => {
            this.$socket.emit('new_bid', {user: userId, vehicle: vehicleId, bid: bidAmount, lot: this.lotid})
          })
        axios.patch(`http://localhost:3000/api/vehicles/${this.current.id}/bids`, {bid: bidAmount})
      }
    },
    vehicleExpired: function () {
      this.$socket.emit('vehicle_expire', {vehicle: this.currentId})
    },
    getData: function (vehicle) {
      // console.log(vehicle)
      this.current = vehicle
      this.currentId = vehicle.id
    },
    getBids: function (message) {
      this.Bids = message
    }
  },
  created () {
    axios.get(`http://localhost:3000/api/live/${this.$route.params.id}`)
      .then(response => {
        this.lot = response.data.result
        this.vehicles = response.data.result.vehicles
        this.current = response.data.result.vehicles[0]
      })
      .catch(err => console.log({
        errr: err
      }))
  },
  mounted () {
    this.$socket.emit('initial_data', {lot: this.lotid})
    this.$socket.on('change_data', this.changeData)
    this.$socket.on('get_data', this.getData)
    this.$socket.on('message', this.getBids)
  }
}
</script>
<style>

</style>
