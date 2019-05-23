<template>
  <div>
    <NavBar />
    <Current v-if="current" />
    <Next v-bind:vehicles="next" />
    <Footer />
  </div>
</template>

<script>
// import socket from 'socket.io-client'
import Current from '@/components/Current'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import Next from '@/components/Next'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Live',
  components: {
    NavBar,
    Footer,
    Current,
    Next
  },
  data () {
    return {
      lotid: parseInt(this.$route.params.id)
    }
  },
  computed: {
    ...mapGetters({lotVehicles: 'lotVehicles', currentVehicle: 'currentVehicle'}),
    next: function () {
      return this.lotVehicles(this.lotid)
    },
    current: function () {
      return this.currentVehicle(this.lotid)
    }
  },
  methods: mapActions(['fetchVehicles', 'fetchLots']),
  created () {
    this.fetchLots()
    this.fetchVehicles()
  }
}
</script>
