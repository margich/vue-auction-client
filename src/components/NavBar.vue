<template>
  <div>
    <Alert />
    <b-navbar toggleable="lg" style="background-color:#1453b7;color:white;">
      <div class="logo">
        <router-link class="navbar-brand" to="/home">
          <img class="img-fluid" src="../assets/logo.jpg" alt="logo" />
        </router-link>
      </div>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>

      <div class="navbar-collapse">
        <form class="form-inline my-2 my-lg-0 text-center col-lg-12 col-md-12">
          <div class="form-row col-lg-8 col-md-12 p-0">
            <div class="form-group col-lg-12 col-md-12 p-0">
              <input class="form-control form-control-lg mr-sm-2 col-lg-8 col-md-8" type="text" placeholder="Search..."
                aria-label="Search">
              <button class="btn btn-primary btn-lg my-sm-0 col-lg-2 col-md-3 mt-2" type="submit">Search</button>
            </div>
          </div>
          <div class="col-lg-4 offset-lg-0 col-md-6 offset-md-2 mt-2 p-0 " v-if="isLoggedIn === false">
            <div class="btn-group col-lg-12 p-0 col-md-12" role="group">
              <router-link class="btn btn-light" to="/login">Sign In</router-link>
              <router-link class="btn btn-secondary" to="/register">Register</router-link>
            </div>
          </div>
          <div class="col-lg-2 offset-lg-0 col-md-2 offset-md-5 p-0 mt-sm-2" v-if="isLoggedIn === true">
            <div class="col-lg-12 col-md-12">
              <b-dropdown id="dropdown-1" :text="firstName">
                <router-link class="dropdown-item" to="/dashboard">Profile</router-link>
                <b-dropdown-item @click="logout">Log Out</b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
          <div class="col-lg-2 offset-lg-0 col-md-4" v-if="isLoggedIn === true">
            <div class="col-lg-12 mt-md-2 col-md-12">
              <p class="p-0 m-0">Balance</p>
              <p class="font-weight-bold p-0 m-0">
                {{user.balance | toCurrency}}</p>
            </div>
          </div>
        </form>
      </div>
      </b-collapse>
    </b-navbar>

    <div class="nav-scroller bg-white box-shadow">
      <nav class="nav nav-underline">
        <router-link class="nav-link" to="/">Home</router-link>
        <router-link class="nav-link" to="/today">Auctions</router-link>
      </nav>
    </div>
  </div>
</template>

<script>
import Alert from '@/components/Alert'
export default {
  name: 'NavBar',
  components: {
    Alert
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn
    },
    user: function () {
      return this.$store.getters.user
    },
    firstName: function () {
      return this.user.full_name.split(' ').slice(0, -1).join(' ')
    }
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
        .then(() => this.$router.push('/'))
        .then(() => this.$store.commit('success', {
          message: 'Successfully logged out'
        }))
    }
  }
}
</script>
<style>

</style>
