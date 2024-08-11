<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { Post } from '../models/Post.js';
import { postsService } from '../services/PostsService.js';
import { logger } from '../utils/Logger.js';
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';



const props = defineProps({
  postProp: { type: Post, required: true }
})

const router = useRouter()
const foundPost = computed(() => AppState.posts.find(postData => postData.id == props.postProp.id))
//NOTE more than likely the wrong thing to find the specific post
const account = computed(() => AppState.account)

async function setActiveProject() {
  postsService.setActiveProject(props.postProp)
  await router.push({ query: { postId: `${props.postProp.id}` } })
  logger.log(router.currentRoute)
}

async function likePost() {
  try {
    const postId = { postId: props.postProp.id }
    await postsService.likePost(postId)
  }
  catch (error) {
    Pop.error("Could not like post", 'error');
    logger.log(error)
  }
}

async function unlikePost() {
  const foundLike = props.postProp.likes.find(like => like.accountId == account.value.id)
  const likeId = foundLike.id
  await postsService.unlikePost(likeId, props.postProp.id)
}

async function deletePost(postsId) {
  try {
    const choice = await Pop.confirm("are you sure?", 'delete post')
    if (choice == false) {
      return
    }
    await postsService.deletePost(postsId)
    Pop.success("Post Deleted!")
  }
  catch (error) {
    logger.error(error)
  }
}

</script>


<template>

  <div v-if="AppState.posts" class="justify-content-center d-flex mb-3 mt-1">
    <div class="card bg-primary shadow" style="width: 100dvh;">
      <div class="card-title bg-primary">
        <div class="">
          <div class="d-flex align-items-center d-col ">
            <router-link :to="{ name: 'Profile', params: { profileId: postProp.creatorId } }">
              <img :src="postProp.creator.picture" class="account-img m-2" alt="">
            </router-link>
            <p class="mb-0 text-dark fs-5">
              {{ postProp.creator.name }}
            </p>
            <div v-if="account?.id == postProp.creator.id" class="dropdown m-3 flex-grow-1 d-flex justify-content-end">
              <p href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                ...
              </p>
              <div class="dropdown-menu bg-danger">
                <div class="bg-danger d-flex justify-content-center">
                  <button @click="deletePost(postProp.id)" class="btn btn-danger"><i
                      class="mdi mdi-delete-forever">Delete</i></button>
                </div>
              </div>
            </div>
          </div>


          <div class=" d-flex justify-content-center">
            <p class="card-title mx-3">{{ postProp.body }}</p>
          </div>
        </div>
      </div>

      <div @click="setActiveProject()" data-bs-toggle="modal" data-bs-target="#postFocusModal">
        <img :src="postProp.imgUrl || postProp.file" class="post-img img-fluid"
          :alt="`An image of an event with the type of`">
      </div>
      <div class="card-body bg-primary d-flex align-items-center justify-content-between">
        <p class="mb-0 fs-5">{{ postProp?.commentCount }} <i class="mdi mdi-comment-outline"></i></p>
        <p v-if="!props.postProp.likes.find(like => like.accountId == account?.id)" class=" mb-0 fs-5"><i
            @click="likePost()" class="mdi mdi-heart-outline"></i>{{
              foundPost?.likes.length }}
        </p>
        <p v-else-if="props.postProp.likes.find(like => like.accountId === account?.id)" class="mb-0 fs-5"><i
            @click="unlikePost()" class="mdi text-info mdi-heart"></i>{{
              foundPost?.likes.length }}
        </p>



      </div>
    </div>
  </div>

</template>


<style lang="scss" scoped>
.post-img {
  width: 100%;
  height: 50vh;
  object-fit: cover;
  object-position: center;
}
</style>
