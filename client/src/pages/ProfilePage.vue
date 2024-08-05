<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { postsService } from '../services/PostsService.js';
import PostCard from '../components/PostCard.vue';
import PetCard from '../components/PetCard.vue';
import { petsService } from '../services/PetsService.js';
import { RouterLink } from 'vue-router';
import { Modal } from 'bootstrap';



const route = useRoute()


const activeProfilePets = computed(() => AppState.activeProfilePets)
const activeProfilePosts = computed(() => AppState.activeProfilePosts)
const activeProfile = computed(() => AppState.activeProfile)

onMounted(() => {
  getActiveProfile()
  getActiveProfilePosts()
  getActiveProfilePets()

})


const petData = ref({
  name: '',
  coverImg: '',
  age: Number,
  description: '',
  color: '',
  energy: '',
  friendly: '',
})

function resetFrom() {
  petData.value = {
    name: '',
    coverImg: '',
    age: Number,
    description: '',
    color: '',
    energy: '',
    friendly: '',
  }
}


async function getActiveProfilePosts() {
  try {
    await postsService.getActiveProfilePosts(route.params.profileId)
  }
  catch (error) {
    Pop.error('Could not get specific posts');
    logger.log(error)
  }
}

async function getActiveProfile() {
  try {

    await postsService.getActiveProfile(route.params.profileId)
  }
  catch (error) {
    Pop.error('Could not get profile');
    logger.log(error)
  }
}

async function getActiveProfilePets() {
  try {
    await petsService.getActiveProfilePets(route.params.profileId)
  }
  catch (error) {
    Pop.error("Could not get this profile's pets");
    logger.error(error)
  }
}

async function addPet() {
  try {
    logger.log(petData.value)
    // const newPet = await petsService.createPet(petData.value)
    // // Pop.success(`You did it! ${petData}`)
    // resetFrom()
    // Modal.getOrCreateInstance('#staticBackdrop').hide()
    // router.push({ name: 'Pets', params: { petsId: newPet.id } })

  } catch (error) {
    Pop.toast('Could not create pet', 'error', 'center-start')
    logger.error(error)
  }
}

</script>


<template>

  <div v-if="activeProfile" class="container">
    <div class="row my-4 justify-content-between">
      <div class="col-3">
        <img class="profilePageImg" :src="activeProfile.picture" alt="">
      </div>
      <div class="col-7">
        <div class="mt-3 fs-4">
          <p>{{ activeProfile.name }}</p>
        </div>
        <div>
          <p>{{ activeProfile.tagline }}</p>
        </div>
      </div>
    </div>


    <div class="col-12 d-grid">

      <button type="button" class="btn btn-primary mx-auto fw-bold fs-4" data-bs-toggle="modal"
        data-bs-target="#exampleModal">
        Add A Pet Now!
      </button>
    </div>


    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Tell Us About Your Best Friend</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form @submit.prevent="addPet">
            <div class="modal-body">

              <div class="mb-3">
                <label for="inputPetName" class="form-label">Pet Name</label>
                <input v-model="petData.name" required type="text" class="form-control" id="inputPetName"
                  aria-describedby="petName" minlength="3" maxlength="50" placeholder="Sam">
              </div>
              <!-- <div class="mb-3">
                <label for="petDescription" class="form-label">Pet Description</label>
                <input v-model="petData.description" type="text" class="form-control" id="petDescription"
                  aria-describedby="petDescription" minlength=" 3" maxlength="50" placeholder="Sam is my BFF" required>
              </div> -->
              <!-- <div class="mb-3">
                <label for="pet-img">Image URL</label>
                <input v-model="petData.coverImg" class="form-control" type="url" id="event-img" name="pet-img"
                  maxlength="3000" placeholder="Pic of Same" required>
              </div> -->

              <div class="input-group mb-3">
                <label class="input-group-text" for="inputGroupFile01">Pet Picture</label>
                <input v-on="petData.coverImg" type="file" class="form-control" id="inputGroupFile01" required>
              </div>

              <div class="mb-3">
                <label for="pet-age">When Was Your Pet born</label>
                <input v-model="petData.age" class="form-control" type="date" id="event-date" name="pet-age" required>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Add Pet!!!</button>
            </div>

          </form>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 mx-0 px-0">
        <p class="text-center fs-4">
          Pets <i role="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false"
            aria-controls="collapseExample" class="mdi mdi-menu-down-outline"></i>
        </p>
      </div>
      <div v-for="pet in activeProfilePets" :key="pet.id" id="collapseExample" class="collapse col-12 mx-0 px-0">
        <router-link :to="{ name: 'Pets', params: { petsId: pet.id } }">
          <PetCard :petProp="pet" />
        </router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-12 mx-0 px-0">
        <p class="text-center fs-4">
          Posts <i role="button" data-bs-toggle="collapse" data-bs-target="#collapsePosts" aria-expanded="false"
            aria-controls="collapsePosts" class="mdi mdi-menu-down-outline"></i>
        </p>
      </div>
      <div v-for="post in activeProfilePosts" :key="post.id" id="collapsePosts" class="col-12 mx-0 px-0">
        <PostCard :postProp="post" />
      </div>
    </div>
  </div>

</template>


<style lang="scss" scoped>
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
