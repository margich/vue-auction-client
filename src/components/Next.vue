<template>
  <div class="container">
    <div class="row mt-md-4 mt-4">
      <div class="col-12">
        <h3 class="text-left">Lot Vehicles</h3>
      </div>
      <div class="col-12">
        <table class="table table-sm table-stripped">
          <tbody>
            <tr v-bind:key="vehicle.id" v-for="vehicle in vehicles" class="text-muted">
              <td>
                <img style="height:20%;" class="img-fluid" src="../assets/vehicles/car1.jpg" />
              </td>
              <td class="text-left">
                <h5 class="text-left">{{ vehicle.year + ' ' + vehicle.make.make + ' ' + vehicle.model }}</h5>
                <h6>Item #: {{vehicle.id}}</h6>
              </td>
              <td>
                <h5 class="text-center">Top Bid: {{vehicle.top_bid | toCurrency}}</h5>
              </td>
              <td>
                <h5 v-if="vehicle.sold === 1" class="text-center text-success">Sold <span class="fa fa-check"></span></h5>
                <h5 v-else class="text-center text-danger">Sold <span class="fa fa-times"></span></h5>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Next',
  props: ['vehicles', 'currentId']
}
</script>
