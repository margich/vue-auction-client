<template>
  <div>
    <NavBar />
    <div class="container">
      <div class="row my-4">
        <div class="col-12">
          <h2 class="text-center">Today's Auctions</h2>
          <hr>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <h4 style="color:#1C82C2;">Live Auctions</h4>
        </div>
      </div>
      <div class="table-responsive-ssm">
        <table class="table table-bordered table-sm table-stripped">
          <thead class="bg-primary">
            <th>Sale Time</th>
            <th>Sale Name</th>
            <th>Items</th>
            <th>View List</th>
          </thead>
          <TodayItem v-bind:lots="live" />
        </table>
      </div>
      <div class="row">
        <div class="col-12">
          <h4 class="mt-4" style="color:#1C82C2;">Upcoming Auctions</h4>
        </div>
      </div>
      <div class="table-responsive-ssm">
        <table class="table table-bordered table-sm table-stripped">
          <thead class="bg-primary">
            <th>Sale Time</th>
            <th>Sale Name</th>
            <th>Items</th>
            <th>View List</th>
          </thead>
          <TodayItem v-bind:lots="upcoming" />
        </table>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import TodayItem from '@/components/TodayItem'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Todays',
  components: {
    NavBar,
    Footer,
    TodayItem
  },
  data () {
    return {
      now: new Date().getTime()
    }
  },
  methods: {
    ...mapActions(['fetchLots']),
    countDown: function () {
      setInterval(() => {
        this.now = new Date().getTime()
      }, 1000)
    }
  },
  computed: {
    ...mapGetters({liveLots: 'liveLots', upcomingLots: 'upcomingLots'}),
    live: function () {
      return this.liveLots(this.now)
    },
    upcoming: function () {
      return this.upcomingLots(this.now)
    }
  },
  created () {
    this.fetchLots()
    this.countDown()
  }
}
</script>
