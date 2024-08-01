<script setup>
import { computed } from 'vue';
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'


const account = computed(() => AppState.account)

</script>

<template>
  <header class="sticky-top">
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer class="bg-danger sticky-bottom text-warning">
    <div class="container-fluid">
      <div class="row justify-content-around">
        <div class="col-2">
          <router-link :to="{ name: 'Home' }">

            <i class=" mdi mdi-home text-warning"></i>
          </router-link>
        </div>
        <div class="col-2">
          <i class=" mdi mdi-magnify"></i>
        </div>
        <div class="col-2">
          <i class=" mdi mdi-plus-circle-outline"></i>
        </div>
        <div class="col-2">
          <i class=" mdi mdi-heart-outline"></i>
        </div>
        <div v-if="account" class="col-2 d-flex align-items-center">
          <router-link :to="{ name: 'Account' }">
            <div>
              <img class="account-img " :src="account.picture" alt="">
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  font-size: 40px;
  height: 64px;
}

.account-img {
  width: 50px;
  height: 50px;
  aspect-ratio: 1/1;
  border-radius: 50%;
}
</style>
