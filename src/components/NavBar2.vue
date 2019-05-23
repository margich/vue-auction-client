<template>
  <div>
    <nav class="navbar navbar-expand-md fixed-top navbar-light" style="background-color:#1453b7;color:white;">
      <div class="logo">
        <router-link class="navbar-brand" to="/home">
          <img class="img-fluid" src="../assets/images/logo.jpg" alt="logo" />
        </router-link>
      </div>
      <button class="navbar-toggler p-0 border-0" type="button" data-toggle="offcanvas" data-target="#offcanvas">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="navbar-collapse offcanvas-collapse" id="offcanvas">
        <form class="form-inline my-2 my-lg-0 text-center col-lg-12 col-md-12">
          <div class="form-row col-lg-8 col-md-8 p-0">
            <div class="form-group col-lg-12 col-md-12 p-0">
              <input class="form-control form-control-lg mr-sm-2 col-lg-8 col-md-8" type="text" placeholder="Search..."
                aria-label="Search">
              <button class="btn btn-primary btn-lg my-2 my-sm-0 col-lg-2 col-md-3" type="submit">Search</button>
            </div>
          </div>
          <div class="col-lg-4 col-md-4 p-0" v-if="!isLoggedIn">
            <div class="btn-group col-lg-12 p-0 col-md-12" role="group">
              <router-link class="btn btn-light" to="/login">Sign In</router-link>
              <router-link class="btn btn-secondary" to="/register">Register</router-link>
            </div>
          </div>
          <div class="col-lg-2 col-md-2 p-0" v-else>
            <div class="col-lg-12 p-0 col-md-12">
              <b-dropdown id="dropdown-1" :text="user.full_name" class="m-md-2">
                <router-link class="dropdown-item" to="/dashboard">Profile</router-link>
                <b-dropdown-item @click="logout">Log Out</b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
          <div class="col-lg-2 col-md-2 p-0 m-0" v-if="isLoggedIn">
            <div class="col-lg-12 mt-md-2 p-0 col-md-12">
              <p class="p-0 m-0">Balance</p>
              <p class="font-weight-bold p-0 m-0">
                Ksh {{user.balance}}</p>
            </div>
          </div>
        </form>
      </div>
    </nav>

    <div class="nav-scroller bg-white box-shadow mt-4">
      <nav class="nav nav-underline">
        <router-link class="nav-link" to="/">Home</router-link>
        <router-link class="nav-link" to="/">Find Vehicles</router-link>
        <router-link class="nav-link" to="/today">Auctions</router-link>
        <router-link class="nav-link" to="/">Locations</router-link>
        <router-link class="nav-link" to="/">Sell a Vehicle</router-link>
        <router-link class="nav-link" to="/">Services</router-link>
        <router-link class="nav-link" to="/">Support</router-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn
    },
    user: function () {
      return this.$store.getters.user
    }
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>
<style>

</style>
