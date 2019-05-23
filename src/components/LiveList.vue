<template>
  <tbody>
    <tr v-bind:key="vehicle.id" v-for="vehicle in vehicles">
      <td class="text-center m-0 p-0">
        <img style="height:20%;" src="../assets/images/cars/car1.jpg" />
      </td>
      <td> {{vehicle.year + ' ' + vehicle.make_id + ' ' + vehicle.model}} </td>
      <td> {{vehicle.start_time | formatDate}} </td>
      <td> {{vehicle.est_retail_value | toCurrency}} </td>
      <td>
        {{vehicle.starting_bid | toCurrency}}
        <div class="row">
          <div class="col-12 text-left">
            <router-link class="btn btn-primary btn-sm" :to="`/vehicle/${vehicle.id}`">Bid Now</router-link>
          </div>
        </div>
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: 'LiveList',
  props: ['vehicles']
}
</script>
