<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { petsService } from '../services/PetsService.js';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';

const activeProfilePosts = computed(() => AppState.activeProfilePosts)
const activePet = computed(() => AppState.activePets)

const route = useRoute()
onMounted(() => {
  getActivePetsDetails()
})

async function getActivePetsDetails() {
  try {
    logger.log('📍📍📍📍', route.params.petId)
    await petsService.getActivePetsDetails(route.params.petId)
  } catch (error) {
    Pop.error('Could not get pets details');
    logger.error(error)
  }
}
</script>


<template>

  <div class="col-12">
    <img class="img-fluid pet-img" :src="activePet.imgUrl" alt="">
  </div>
  <div class="card-body pt-4 bg-primary d-flex flex-column align-items-center ">
    <p class="fs-1 fw-bold">{{ activePet.name }}</p>
    <div class="card bg-primary border-0" style="width: 18rem;">
      <p class="bg-subtle p-1">Sociability: </p>
      <p class="bg-subtle p-1">Obedience:</p>
      <p class="bg-subtle p-1">Loudness:</p>
      <p class="bg-subtle p-1">Protectiveness:</p>
      <p class="bg-subtle p-1">Energy:</p>
      <p class="bg-subtle p-1">Cleanliness:</p>
      <div class=" pt-3 d-flex justify-content-center">
        <p class="fs-5">{{ activePet.bio }}</p>
      </div>
    </div>
  </div>
  <div class="d-flex justify-content-center pt-3">

    <p class="d-inline-flex gap-1">

      <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#multiCollapseExample2"
        aria-expanded="false" aria-controls="multiCollapseExample2">Posts <span class="fs-2">👇</span></button>
    </p>
  </div>
  <div class="row">
    <div class="col">
      <div class="collapse multi-collapse" id="multiCollapseExample2">
        <div class="card card-body">
          <div v-for="post in activeProfilePosts" :key="post.id" class="col-12 mx-0 px-0">
            <PostCard :postProp="post" />
          </div>
        </div>
      </div>
    </div>
  </div>

</template>


<style lang="scss" scoped>
.pet-img {
  height: 30vh;
  width: 100vh;
  object-fit: cover;
}
</style>
