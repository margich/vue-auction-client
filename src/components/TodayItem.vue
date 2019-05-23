<template>
<tbody>
  <tr v-bind:key="lot.id" v-for="lot in lots">
    <td>{{lot.time_live | formatTime}} - {{lot.end_live | formatTime}}</td>
    <td>{{lot.lot_name}}</td>
    <td>{{numOfVehicles(lot.id)}}</td>
    <td>
      <div class="row">
        <div class="col-12">
          <router-link class="btn btn-primary btn-sm" :to="`/list/${lot.id}`">View List</router-link>
        </div>
      </div>
    </td>
  </tr>
</tbody>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'TodayItem',
  props: ['lots'],
  computed: {
    ...mapGetters({vehiclesCount: 'getNumberOfVehiclesInLot'})
  },
  methods: {
    ...mapActions(['fetchVehicles']),
    numOfVehicles: function (lotid) {
      return this.vehiclesCount(lotid)
    }
  },
  created () {
    this.fetchVehicles()
  }
}

</script>
