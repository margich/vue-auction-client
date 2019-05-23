<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 text-center p-0">
                <b-alert class="mb-0" :variant="type" v-if="message" show dismissible fade>{{message.message}}</b-alert>
            </div>
        </div>
    </div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex'
export default {
  name: 'alert',
  computed: mapGetters({
    type: 'type',
    message: 'message'
  }),
  methods: {
    ...mapActions({
      clearAlert: 'clear'
    })
  }
}
</script>
