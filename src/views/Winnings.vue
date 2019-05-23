<template>
  <div>
    <NavBar />
    <div class="container">
      <h1 class="mt-3">Winnings</h1>
      <hr>
      <div class="row">
        <div class="col-lg-3 mb-3">
          <div class="list-group">
            <router-link to="/dashboard" class="list-group-item">Bids</router-link>
            <router-link to="/winning" class="list-group-item  active disabled">Winnings</router-link>
            <router-link to="/edit" class="list-group-item">Update Account</router-link>
            <router-link to="/password" class="list-group-item">Update Password</router-link>
          </div>
        </div>
        <div class="col-lg-9">
          <div class="row">
            <div class="table-responsive-sm mx-auto">
              <table class="table table-bordered table-sm table-stripped">
                <thead class="bg-primary">
                  <th>Vehicle</th>
                  <th>Amount Bid</th>
                  <th>Date Bid</th>
                </thead>
                <tbody>
                  <tr v-bind:key="bid.id" v-for="bid in bids">
                    <td>
                      <router-link :to="`/vehicle/${bid.vehicle.id}`">{{bid.year + ' ' + bid.make.make + ' ' + bid.model}}</router-link>
                    </td>
                    <td>
                      {{bid.bid_amount | toCurrency}}
                    </td>
                    <td>
                      {{bid.created_At | formatDate}}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Winnings',
  components: {
    NavBar,
    Footer
  },
  computed: {
    ...mapGetters({userBids: 'userBids'}),
    bids: function () {
      return this.userBids.filter(bid => bid.vehicle.sold === 1 && bid.vehicle.top_bid > bid.vehicle.reserve_price)
    }
  },
  methods: mapActions(['fetchVehicles', 'fetchBids', 'fetchMakes']),
  created () {
    this.fetchBids()
    this.fetchMakes()
    this.fetchVehicles()
  }
}
</script>
<style>

</style>
