<template>
  <div>
    <Alert />
    <div class="container">
      <div class="text-center">
        <h2 class="mt-5">Registration Form</h2>
        <hr>
      </div>

      <div class="row">
        <div class="col-md-12">
          <form @submit.prevent="register">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="first name">First name <span class="text-muted">(Required)</span></label>
                <input type="text" class="form-control" name="firstName" id="firstName" v-model="firstName">
              </div>
              <div class="col-md-6 mb-3">
                <label for="last name">Last name <span class="text-muted">(Required)</span></label>
                <input type="text" class="form-control" name="lastName" id="lastName" v-model="lastName">
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="email">Email Address <span class="text-muted">(Required)</span></label>
                <input type="email" class="form-control" name="email" id="email" v-model="email">
              </div>
              <div class="col-md-6 mb-3">
                <label for="phone number">Phone Number <span class="text-muted">(Required)</span></label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">+254</span>
                  </div>
                  <input type="number" class="form-control" name="phoneNo" id="phoneNo" v-model="phoneNo">
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="id">ID Number <span class="text-muted">(Required)</span></label>
                <input type="number" class="form-control" name="id" id="id" v-model="idNumber">
              </div>
              <div class="col-md-6 mb-3">
                <label for="city">City <span class="text-muted">(Required)</span></label>
                <input type="text" class="form-control" name="city" id="city" v-model="city">
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="region">Region <span class="text-muted">(Required)</span></label>
                <input type="text" class="form-control" name="region" id="region" v-model="region">
              </div>
              <div class="col-md-6 mb-3">
                <label for="street">Street <span class="text-muted">(Required)</span></label>
                <input type="text" class="form-control" name="street" id="street" v-model="street">
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="password">Password <span class="text-muted">(Required)</span></label>
                <input type="password" class="form-control" name="password" id="password" min="6" v-model="password">
              </div>
              <div class="col-md-6 mb-3">
                <label for="confirm">Confirm Password <span class="text-muted">(Required)</span></label>
                <input type="password" class="form-control" name="confirm" id="confirm" min="6" v-model="confirm">
              </div>
            </div>
            <div class="text-right">
              <router-link class="btn btn-secondary btn-lg" to="/">Cancel</router-link>
              <button class="btn btn-primary btn-lg" name="submit" type="submit">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
/* eslint-disable */
import Alert from '@/components/Alert'
import Footer from '@/components/Footer'
export default {
  name: 'Register',
  components: {
    Alert,
    Footer
  },
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phoneNo: '',
      idNumber: '',
      city: '',
      region: '',
      street: '',
      password: '',
      confirm: '',
      submitted: false
    }
  },
  methods: {
    register: function () {
      this.submitted = true
      const { firstName, lastName, email, phoneNo, idNumber, city, region, street, password, confirm } = this
      const { dispatch } = this.$store
      if (firstName === '' || lastName === '' || email === '' || phoneNo === '' || idNumber === '' || city === '' || region === '' || street === '' || password === '' || confirm === '') {
        const message = 'All fields are required!'
        dispatch('error', {message})
      } else {
        if (password.length < 6) {
          const message = 'Password must be greater than 6 characters'
          dispatch('error', {message})
        }
        if (idNumber.length !== 8) {
          const message = 'Id number must equal 8 characters'
          dispatch('error', {message})
        }
        if (phoneNo.length !== 9) {
          const message = 'Phone number must equal 9 digits!'
          dispatch('error', {message})
        }
        if (password !== confirm) {
          const message = 'Passwords do not match!'
          dispatch('error', {message})
        }
        else {
          dispatch('register', {firstName, lastName, email, phoneNo, idNumber, city, region, street, password, confirm})
            .then(() => this.$router.push('/login'))
            .then(() => this.$store.commit('success', {message: 'Successfully created account!'}))
        }
      }
    }
  }
}
</script>
