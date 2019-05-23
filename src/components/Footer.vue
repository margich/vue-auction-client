<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <hr class="my-5">
      </div>
    </div>
    <footer class="my-4 pt-3 text-muted text-center text-small">
      <p class="mb-1">&copy; 2019 Auction</p>
      <ul class="list-inline">
        <router-link class="list-inline-item" to="/Privacy">Privacy</router-link>
        <router-link class="list-inline-item" to="/Terms">Terms</router-link>
        <router-link class="list-inline-item" to="/Support">Support</router-link>
        <router-link class="list-inline-item" to="/about">About</router-link>
      </ul>
      <ul class="list-inline">
        <li class="list-inline-item"><a href="#"><span class="fa fa-facebook-square"></span></a></li>
        <li class="list-inline-item"><a href="#"><span class="fa fa-instagram"></span></a></li>
        <li class="list-inline-item"><a href="#"><span class="fa fa-twitter-square"></span></a></li>
      </ul>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>
