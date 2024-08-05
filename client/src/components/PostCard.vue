<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { Post } from '../models/Post.js';
import PostSpotlight from './PostSpotlight.vue';
import { postsService } from '../services/PostsService.js';
import { logger } from '../utils/Logger.js';


const props = defineProps({ postProp: { type: Post, required: true } })
const route = useRoute()
const router = useRouter()


async function setActiveProject() {
  postsService.setActiveProject(props.postProp)
  await router.push({ query: { postId: `${props.postProp.id}` } })
  logger.log(router.currentRoute)
}
</script>


<template>
  <div class="justify-content-center d-flex mb-3 mt-1">
    <div class="card bg-primary" style="width: 100dvh;">
      <div class="card-title bg-primary">
        <div class="">
          <div class="d-flex align-items-center">
            <router-link :to="{ name: 'Profile', params: { profileId: postProp.creatorId } }">
              <img :src="postProp.creator.picture" class="account-img m-2" alt="">
            </router-link>
            <p class="mb-0 text-dark fs-5">
              {{ postProp.creator.name }}
            </p>
          </div>
          <div class="d-flex justify-content-center">
            <h5 class="card-title">{{ postProp.body }}</h5>
          </div>
        </div>
      </div>
      <div @click="setActiveProject()" data-bs-toggle="modal" data-bs-target="#postFocusModal">

        <img :src="postProp.imgUrl" class="card-img-top" :alt="`An image of an event with the type of`">
        <div class="card-body bg-primary d-flex align-items-center justify-content-between">
          <p class="mb-0 fs-5">12 <i class="mdi mdi-comment-outline"></i></p>
          <p class="mb-0 fs-5"><i class="mdi mdi-heart-outline"></i>15</p>
        </div>
      </div>
    </div>
  </div>

</template>


<style lang="scss" scoped></style>
