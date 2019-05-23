<template>
  <div>
    <div class="container">
      <div class="py-md-5 text-center">
        <h2>Update Password</h2>
        <hr>
      </div>
      <div class="row">
        <div class="col-md-12">
          <form @submit.prevent="edit">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="old password">Old Password <span class="text-muted">(Required)</span></label>
                <input type="text" class="form-control" name="old_password" id="old_password" v-model="oldPassword">
              </div>
              <div class="col-md-6 mb-3">
                <label for="new password">New Password <span class="text-muted">(Required)</span></label>
                <input type="text" class="form-control" name="new_password" id="new_password" v-model="newPassword">
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="confirm password">Confirm New Password <span class="text-muted">(Required)</span></label>
                <input type="text" class="form-control" name="confirm" id="confirm" v-model="confirm">
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
  name: 'Password',
  components: {
    Footer
  },
  data () {
    return {
      oldPassword: '',
      confirm: '',
      newPassword: ''
    }
  },
  computed: {
    ...mapGetters(['user']),
    logged: function () {
      return this.user
    }
  },
  methods: {
    edit: function () {
      const { id, email, password } = this.logged
      const { oldPassword, confirm, newPassword } = this
      const { dispatch } = this.$store
      if (id && email && password && oldPassword && confirm && newPassword) {
        dispatch('edit_password', { id, email, password, oldPassword, confirm, newPassword })
          .then(() => this.$router.push('/dashboard'))
      }
    }
  }
}
</script>
<style>

</style>
