<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import ModalWrapper from "./components/ModalWrapper.vue";
import PostForm from "./components/PostForm.vue";
import { postsService } from './services/PostsService.js';
import Pop from './utils/Pop.js';


const account = computed(() => AppState.account)
const posts = computed(() => AppState.posts.find(post => post.id == account.value.id))

onMounted(() => {
  getAllPosts()
})

async function getAllPosts() {
  try {
    await postsService.getAllPosts()
  }
  catch (error) {
    Pop.error('Could not get posts');
  }
}

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
        <div class="col-2 text-center selectable navbar-button" role="button">
          <router-link :to="{ name: 'Home' }">
            <i class=" mdi icon-select mdi-home text-warning"></i>
          </router-link>
        </div>
        <div class="col-2 text-center selectable navbar-button" role="button">
          <i class=" mdi icon-select mdi-magnify"></i>
        </div>
        <div class="col-2 text-center selectable navbar-button" role="button" data-bs-toggle="modal"
          data-bs-target="#newPostForm">
          <i class=" mdi icon-select mdi-plus-circle-outline"></i>
        </div>
        <div class="col-2 text-center selectable navbar-button" role="button">
          <i class=" mdi icon-select mdi-heart-outline"></i>
        </div>
        <div v-if="account" class="col-2 text-center d-flex justify-content-center align-items-center">
          <router-link :to="{ name: 'Profile', params: { profileId: account?.id } }">
            <div class="d-flex align-items-center">
              <img class="account-img" :src="account.picture" :alt="account.name">
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </footer>
  <ModalWrapper modalId="newPostForm">
    <PostForm :account="account" />
  </ModalWrapper>
  <PostSpotlight />
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
  height: 45px;
  aspect-ratio: 1/1;
  border-radius: 50%;
}

.navbar-button:active {
  filter: opacity(50%);
  background-color: #da2b429d;
}

// .navbar-button:hover {
//   animation: icon-select 2s infinite linear;
// }

// @keyframes icon-select {
//   from {
//     transform: rotate(0deg);
//   }
//   to {
//     transform: rotate(360deg);
//   }
// }</style>
