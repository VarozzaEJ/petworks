<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { petsService } from '../services/PetsService.js';


const account = computed(() => AppState.account)
const activeProfilePets = computed(() => AppState.activeProfilePets)
const activeProfilePosts = computed(() => AppState.activeProfilePosts)

onMounted(() => {
  getActiveProfile()
  getActiveProfilePosts()
  getActiveProfilePets()

})





async function getActiveProfilePosts() {
  try {
    logger.log('🧍‍♂️🧍‍♂️🧍‍♂️🧍‍♂️🧍‍♂️', account.value.id)
    await postsService.getActiveProfilePosts(account.value.id)

  }
  catch (error) {
    Pop.error('Could not get specific posts');
    logger.log(error)
  }
}

async function getActiveProfile() {
  try {
    await postsService.getActiveProfile(account.value.id)
  }
  catch (error) {
    Pop.error('Could not get profile');
    logger.log(error)
  }
}

async function getActiveProfilePets() {
  try {
    await petsService.getActiveProfilePets(account.value.id)
  }
  catch (error) {
    Pop.error("Could not get this profile's pets");
    logger.error(error)
  }
}
</script>

<template>
  <div class="about">
    <div v-if="account">
      <div class="container">
        <div class="row my-4 justify-content-between">
          <div class="col-3">
            <img class="profilePageImg" :src="account.picture" alt="">
          </div>
          <div class="col-7">
            <div class="mt-3 fs-4">
              <p>{{ account.name }}</p>
            </div>
            <div>
              <p>{{ account.tagline }}</p>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12 mx-0 px-0 pt-3">
            <p class="text-center fs-4">
              Pets <i role="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false"
                aria-controls="collapseExample" class="mdi mdi-menu-down-outline"></i>
            </p>
          </div>
          <div v-if="activeProfilePets">
            <div v-for="pet in activeProfilePets" :key="pet.id" id="collapseExample" class="collapse col-12 mx-0 px-0">
              <router-link :to="{ name: 'Pets', params: { petsId: pet.id } }">
                <PetCard :petProp="pet" />
              </router-link>
            </div>
          </div>
          <hr>
        </div>
        <div class="row">
          <div class="col-12 mx-0 px-0">
            <p class="text-center fs-4">
              Posts <i role="button" data-bs-toggle="collapse" data-bs-target="#collapsePosts" aria-expanded="false"
                aria-controls="collapsePosts" class="mdi mdi-menu-down-outline"></i>
            </p>
          </div>
          <div v-if="activeProfilePosts">

            <div v-for="post in activeProfilePosts" :key="post.id" id="collapsePosts" class="col-12 mx-0 px-0">
              <PostCard :postProp="post" />
            </div>
          </div>
          <hr>
        </div>
      </div>

    </div>
    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
.profilePageImg {
  height: 15dvh;
  width: 15dvh;
  aspect-ratio: 1/1;
  border-radius: 30%;
}

.hidden {
  display: none !important;
}
</style>
