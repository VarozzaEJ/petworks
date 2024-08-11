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
import { router } from '../router.js';



const route = useRoute()


const petData = ref({
  name: '',
  bio: '',
  file: null,
  previewUrl: '',
  species: '',
  breed: '',
  birthday: '',
  petStats: [
    {
      attribute: '',
      value: 1,
    },
  ]
})



function resetFrom() {
  petData.value = {
    name: '',
    bio: '',
    file: null,
    previewUrl: '',
    species: '',
    breed: '',
    birthday: '',
    petStats: [
      {
        attribute: '',
        value: 1,
      },
    ]
  }
}


const activeProfilePets = computed(() => AppState.activeProfilePets)
const activeProfilePosts = computed(() => AppState.activeProfilePosts)
const activeProfile = computed(() => AppState.activeProfile)

onMounted(() => {
  getActiveProfile()
  getActiveProfilePosts()
  getActiveProfilePets()

})

async function createPet() {
  try {
    const fileUrl = await petsService.getFileUrl(petData.value.file)
    petData.value.file = fileUrl
    logger.log('🦎🦎🦎🦎🦎🦎🦎', petData.value)
    await petsService.createPet(petData.value)
    Pop.success(`Pet Created!`)
    resetFrom()
    Modal.getOrCreateInstance('#exampleModal').hide()
    // router.push({ name: 'Pets', params: { petId: newPet?.id || newPet?._id } }) 
  } catch (error) {
    Pop.toast('Error creating pet', 'error')
    logger.error(error)
  }
}

async function selectFile(event) {
  try {
    const file = event.target.files[0]
    petData.value.file = file
    petData.value.previewUrl = URL.createObjectURL(file)
  }
  catch (error) {
    Pop.error("Could not select file");
    logger.error(error)
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

function addAttribute() {
  petData.value.petStats.push({ attribute: '', value: 1 })
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

      <button v-if="AppState.account?.id == activeProfile.id" type="button" class="btn btn-primary mx-auto fw-bold fs-4"
        data-bs-toggle="modal" data-bs-target="#exampleModal">
        Add A Pet Now!
      </button>
    </div>



    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Tell Us About Your Best Friend</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <form @submit.prevent="createPet">
            <div class="modal-body">
              <div class="mb-3">
                <label for="inputPetName" class="form-label">Pet Name</label>
                <input v-model="petData.name" required type="text" class="form-control" id="inputPetName"
                  aria-describedby="petName" minlength="3" maxlength="50">
              </div>
              <div class="mb-3">
                <label for="petDescription" class="form-label">Pet Description</label>
                <input v-model="petData.bio" type="text" class="form-control" id="petDescription"
                  aria-describedby="petDescription" minlength=" 3" maxlength="50">
              </div>
              <div class="mb-3">
                <label class="form-label">Image Preview</label>
                <div class="d-flex justify-content-center">
                  <div v-if="!petData.previewUrl"
                    class="bg-subtle rounded img-preview d-flex justify-content-center align-items-center">
                    <i class="mdi mdi-image display-1"></i>
                  </div>
                  <div v-else>
                    <img class="rounded preview-img" :src="petData.previewUrl" :alt="`${petData.previewUrl}`">
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label for="imgUrl" class="form-label">Image File</label>
                <input @change="selectFile" name="file" type="file" multiple="false" accept="image/*"
                  class="form-control" id="imgUrl" maxlength="1000">
              </div>

              <div class="mb-3">
                <label for="pet-birth">When Was Your Pet born</label>
                <input v-model="petData.birthday" class="form-control" type="date" id="pet-birth" name="pet-birth"
                  required>
              </div>

              <div class="mb-3">
                <label for="petEnergy" class="form-label">Pet breed </label>
                <input v-model="petData.breed" type="text" class="form-control" id="petEnergy"
                  aria-describedby="petEnergy" minlength=" 1" maxlength="5" required>
              </div>
              <div class="mb-3">
                <label for="pet-species">Pet Species</label>
                <input v-model="petData.species" class="form-control" type="text" id="pet-species" name="pet-species"
                  required>
              </div>
              <div class="mb-3">
                <label for="pet-stats">Pet Attributes</label>
                <button @click="addAttribute()" type="button" class="btn btn-secondary ms-2 mb-2"><i
                    class="mdi mdi-plus"></i></button>
                <div v-for="(petStat, i) in petData.petStats">
                  <input v-model="petStat.attribute" class="form-control mb-1" type="text"
                    :id="'pet-stats-attribute-' + i" name="pet-stats-attribute" minlength="3" maxlength="15" required>
                  <input v-model="petStat.value" class="form-control mb-3" type="range" min="1" max="5"
                    :id="'pet-stats-value-' + i" name="pet-stats-value" required>
                </div>

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
      <div class="col-12 d-flex justify-content-center mx-0 px-0 pt-3">

        <button class="btn btn-subtle-outline" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample"
          aria-expanded="false" aria-controls="collapseExample">Pets
          <i class="mdi mdi-menu-down-outline"></i></button>
      </div>

      <div v-for="pet in activeProfilePets" :key="pet.id" id="collapseExample" class="collapse col-12 mx-0 px-0">
        <router-link :to="{ name: 'Pets', params: { petId: pet.id } }">
          <PetCard :petProp="pet" />
        </router-link>

      </div>
      <hr>
    </div>
    <div class="container">

      <div class="row">
        <div class="col-12 d-flex justify-content-center mx-0 px-0">

          <button class="btn btn-subtle-outline" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePosts"
            aria-expanded="false" aria-controls="collapsePosts">Posts
            <i class="mdi mdi-menu-down-outline"></i></button>

        </div>
        <div v-for="post in activeProfilePosts" :key="post.id" id="collapsePosts" class="col-12 mx-0 px-0">
          <PostCard :postProp="post" />
        </div>
        <hr>
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

.preview-img {
  width: 200px;
  height: 200px;
}
</style>
