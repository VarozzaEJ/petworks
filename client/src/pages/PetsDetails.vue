<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { petsService } from '../services/PetsService.js';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { petTagsService } from "../services/PetTagsService.js";

const petPosts = computed(() => AppState.petPosts)
const activePet = computed(() => AppState.activePets)

const route = useRoute()
onMounted(() => {
  getActivePetsDetails()
  getPetPosts()
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

async function getPetPosts() {
  try {
    await petTagsService.getPetPosts(route.params.petId)
  } catch (error) {
    Pop.error(error);
  }
}
</script>


<template>
  <section class="container-fluid" v-if="activePet">
    <div class="row">

      <div class="col-12 px-0">
        <img class="img-fluid pet-img" :src="activePet.imgUrl" alt="">
      </div>
      <div class="col-12 pt-4 bg-primary d-flex flex-column align-items-center ">
        <p class="text-capitalize fs-1 fw-bold">{{ activePet.name }}</p>
        <p class="fs-2 text-capitalize fw-bold">Species: {{ activePet.species }}</p>


        <div v-for="activePet in activePet.petStats" :key="activePet.attribute"
          class="d-flex w-100  mb-4 row justify-content-between bg-light">
          <div class="row">

            <div class="col-4 d-flex me-4">
              <p class="bg-subtle d-flex mb-0 me-3 p-1">{{ activePet.attribute }}: </p>
            </div>
            <div class="col-7 pe-3 justify-content-between d-flex">

              <div v-if="activePet.value == 1" class="bg-light  d-flex">
                <div class="move-down handle bg-primary ms-1 d-flex justify-content-center align-items-center"></div>
                <div class="move-down handle ms-1 d-flex justify-content-center align-items-center"></div>
                <div class="move-down handle ms-1 d-flex justify-content-center align-items-center"></div>
                <div class="move-down handle ms-1 d-flex justify-content-center align-items-center"></div>
                <div class="move-down handle ms-1 me-2 d-flex justify-content-center align-items-center"></div>

              </div>
              <div v-else-if="activePet.value == 2" class="bg-light  d-flex">
                <div class="move-down handle bg-primary ms-1 d-flex justify-content-center align-items-center"></div>
                <div class="move-down handle bg-primary ms-1 d-flex justify-content-center align-items-center"></div>
                <div class="move-down handle ms-1 d-flex justify-content-center align-items-center"></div>
                <div class="move-down handle ms-1 d-flex justify-content-center align-items-center"></div>
                <div class="move-down handle ms-1 me-2 d-flex justify-content-center align-items-center"></div>

              </div>
              <div v-else-if="activePet.value == 3" class="bg-light d-flex">
                <div class="move-down handle bg-primary ms-1 d-flex justify-content-center align-items-center"></div>
                <div class="move-down handle bg-primary ms-1 d-flex justify-content-center align-items-center"></div>
                <div class="move-down handle bg-primary ms-1 d-flex justify-content-center align-items-center"></div>
                <div class="move-down handle ms-1 d-flex justify-content-center align-items-center"></div>
                <div class="move-down handle ms-1 me-2 d-flex justify-content-center align-items-center"></div>

              </div>
              <div v-else-if="activePet.value == 4" class="bg-light d-flex">
                <div class="move-down handle bg-primary ms-1 d-flex justify-content-center align-items-center"></div>
                <div class="move-down handle bg-primary ms-1 d-flex justify-content-center align-items-center"></div>
                <div class="move-down handle bg-primary ms-1 d-flex justify-content-center align-items-center"></div>
                <div class="move-down handle bg-primary ms-1 d-flex justify-content-center align-items-center"></div>
                <div class="move-down handle ms-1 me-2 d-flex justify-content-center align-items-center"></div>

              </div>
              <div v-else-if="activePet.value == 5" class="bg-light  d-flex">
                <div class="move-down handle bg-primary ms-1 d-flex  align-items-center"></div>
                <div class="move-down handle bg-primary ms-1 d-flex  align-items-center"></div>
                <div class="move-down handle bg-primary ms-1 d-flex  align-items-center"></div>
                <div class="move-down handle bg-primary ms-1 d-flex  align-items-center"></div>
                <div class="move-down handle bg-primary ms-1 me-2 d-flex  align-items-center"></div>
              </div>
            </div>
          </div>
        </div>

        <div class=" pt-3 d-flex justify-content-center">
          <p class="fs-5">{{ activePet.bio }}</p>
        </div>
      </div>

      <div class="d-flex justify-content-center pt-3">

        <p class="d-inline-flex gap-1">

          <button class="btn btn-subtle-outline" type="button" data-bs-toggle="collapse"
            data-bs-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">Posts <i
              class="mdi mdi-menu-down-outline"></i></button>
        </p>
      </div>
      <div class="col-12 collapse multi-collapse" id="multiCollapseExample2">
        <div class="row">
          <div class="card card-body">
            <div v-for="petPost in petPosts" :key="petPost.post.id" class="col-12 mx-0 px-0">
              <PostCard :postProp="petPost.post" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>
.pet-img {
  height: 40vh;
  width: 100vw;
  object-fit: cover;
  object-position: center;
}

.handle {
  height: 10px;
  width: 40px;
  background-color: black;
  z-index: 1;
  margin-top: .75em;
}

.move-down {
  top: +40px;
}
</style>
