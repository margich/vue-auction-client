<template>
  <main>
    <Alert />
    <div class="main">
      <form class="form-signin" @submit.prevent="login">
        <h1 class="h3 mb-3 font-weight-normal text-center">Please Sign In</h1>
        <label for="email" class="sr-only">Email address</label>
        <input type="email" v-model="email" name="email" id="email" class="form-control" autofocus>
        <label for="password" class="sr-only">Password</label>
        <input type="password" v-model="password" name="password" id="password" class="form-control">
        <button class="btn btn-lg btn-primary btn-block" name="submit" type="submit">Sign in</button>
        <router-link class="btn btn-lg btn-secondary btn-block" to="/">Cancel</router-link>
        <p class="mt-5 mb-3 text-muted text-center">&copy; 2019 Auction</p>
      </form>
    </div>
  </main>
</template>

<script>
import Alert from '@/components/Alert'
import { mapGetters } from 'vuex'
export default {
  name: 'Login',
  components: {
    Alert
  },
  data () {
    return {
      email: '',
      password: '',
      submitted: false
    }
  },
  computed: {
    ...mapGetters({status: 'status', message: 'message'})
  },
  methods: {
    login: function () {
      const { email, password } = this
      const { dispatch } = this.$store
      if (email === '' || password === '') {
        const message = 'All fields are required!'
        dispatch('error', { message })
      } else {
        if (password.length < 6) {
          const message = 'Password must be greater than 5 characters!'
          dispatch('error', { message })
        } else {
          dispatch('login', { email, password })
            .then(() => this.$router.push('/today'))
            .then(() => this.$store.commit('success', {message: 'Successfully logged in'}))
        }
      }
    }
  }
}
</script>

<style scoped>
main {
  width:100%;
  height:100%;
  background-color:whitesmoke;
}
.main {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding-top: 50px;
  padding-bottom: 50px;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
