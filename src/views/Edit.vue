<template>
  <div>
    <div class="container">
      <div class="py-md-5 text-center">
        <h2>Update Account</h2>
        <hr>
      </div>
      <div class="row">
        <div class="col-md-12">
          <form @submit.prevent="edit">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="first_name">First name</label>
                <input type="text" class="form-control" name="first_name" id="first_name" v-model="firstName"
                  required>
              </div>
              <div class="col-md-6 mb-3">
                <label for="last_name">Last name</label>
                <input type="text" class="form-control" name="last_name" id="last_name" v-model="lastName"
                  required>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="email">Email Address</label>
                <input type="email" class="form-control" name="email" id="email" v-model="user.email" required>
              </div>
              <div class="col-md-6 mb-3">
                <label for="phone number">Phone Number</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">+254</span>
                  </div>
                  <input type="number" class="form-control" name="phone_number" id="phone_number" v-model="phone" required>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="id">ID Number</label>
                <input type="number" class="form-control" name="id" id="id" v-model="user.id_number" required>
              </div>
              <div class="col-md-6 mb-3">
                <label for="city">City</label>
                <input type="text" class="form-control" name="city" id="city" v-model="user.city" required>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="region">Region</label>
                <input type="text" class="form-control" name="region" id="region" v-model="user.region" required>
              </div>
              <div class="col-md-6 mb-3">
                <label for="street">Street</label>
                <input type="text" class="form-control" name="street" id="street" v-model="user.street" required>
              </div>
            </div>
            <div class="text-right">
              <router-link class="btn btn-secondary btn-lg" to="/dashboard">Cancel</router-link>
              <button class="btn btn-primary btn-lg" name="submit" type="submit">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer'
import { mapGetters } from 'vuex'
export default {
  name: 'Edit',
  components: {
    Footer
  },
  computed: {
    ...mapGetters(['user']),
    logged: function () {
      return this.user
    },
    firstName: function () {
      return this.logged.full_name.split(' ').slice(0, -1).join(' ')
    },
    lastName: function () {
      return this.logged.full_name.split(' ').slice(-1).join(' ')
    },
    phone: function () {
      // this.user.phone_number.split('+254').slice(-1).join(' ')
      return this.logged.phone_number.split('+254').slice(-1).join(' ')
    }
  },
  methods: {
    edit: function () {
      /* let data = {
        id: this.id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phoneNo: this.phone,
        idNumber: this.id_number,
        city: this.city,
        region: this.region,
        street: this.street
      } */
      console.log('1')
      const { id, email, city, region, street, password } = this.logged
      const { firstName, lastName, phone } = this
      const idNumber = this.logged.id_number
      const fullName = firstName + ' ' + lastName
      const phoneNo = '+254' + phone
      // const id = this.logged.id
      // password = this.logged.password
      const { dispatch } = this.$store
      if (firstName && lastName && email && phone && idNumber && city && region && street) {
        console.log('2')
        dispatch('edit', {id, fullName, email, phoneNo, idNumber, city, region, street, password})
          .then(() => this.$router.push('/dashboard'))
      }
    }
  }
}
</script>
<style>

</style>
