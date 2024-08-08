<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
import PostCard from '../components/PostCard.vue';
import { petsService } from "../services/PetsService.js";
import PetOfTheDay from "../components/PetOfTheDay.vue";
import { logger } from '../utils/Logger.js';



const posts = computed(() => AppState.posts)
const petOfTheDay = computed(() => AppState.petOfTheDay)

onMounted(() => {
  getAllPosts()
  getPetOfTheDay()
})

async function getAllPosts() {
  try {
    await postsService.getAllPosts()
  }
  catch (error) {
    Pop.error('Could not get posts');
  }
}

async function getPetOfTheDay() {
  try {
    await petsService.getPetOfTheDay()
  }
  catch (error) {
    Pop.error('Could not retrieve the Pet of the Day');
  }
}

</script>

<template>
  <div class="container-fluid">
    <div class="row ">
      <div v-if="petOfTheDay" class="col-12 d-flex justify-content-center mx-0 px-0">
        <PetOfTheDay :petOfTheDayProp="petOfTheDay" />
      </div>
      <div v-for="post in posts" :key="post.id" class="col-12  mx-0 px-0">
        <PostCard :postProp="post" />
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: clamp(500px, 50vw, 100%);

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}

.text-shadow {
  text-shadow: 2px 2px black;
}
</style>
