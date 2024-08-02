<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
import PostCard from '../components/PostCard.vue';



const posts = computed(() => AppState.posts)

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
  <div class="container-fluid">
    <div class="row ">
      <div v-for="post in posts" :key="post.id" class="col-12 mx-0 px-0">
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
