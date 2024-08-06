<script setup>
import { ref } from "vue";
import { Account } from "../models/Account";
import { postsService } from "../services/PostsService";
import Pop from "../utils/Pop";
defineProps({
  account: Account
})

const editablePostData = ref({
  body: '',
  imgUrl: '',
})

async function createPost() {
  try {
    await postsService.createPost(editablePostData.value)
  }
  catch (error) {
    Pop.error('Could not make Post');
  }
}
</script>


<template>
  <form @submit.prevent="createPost()" class="row justify-content-center">
    <div class="col-8 mb-3">
      <label class="form-label">Image Preview</label>
      <div class="d-flex justify-content-center">
        <div v-if="!editablePostData.imgUrl"
          class="bg-subtle rounded img-preview d-flex justify-content-center align-items-center">
          <i class="mdi mdi-image display-1"></i>
        </div>
        <div v-else>
          <img class="rounded" :src="editablePostData.imgUrl" :alt="`${editablePostData.imgUrl}`">
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="mb-3">
        <label for="imgUrl" class="form-label">Image URL</label>
        <input v-model="editablePostData.imgUrl" type="text" class="form-control" id="imgUrl" maxlength="1000">
      </div>
    </div>
    <div class="col-12 mb-3">
      <label for="body">Make a Post!</label>
      <textarea v-model="editablePostData.body" class="form-control" id="body" maxlength="300" required></textarea>
    </div>
    <div class="d-grid">
      <button type="submit" class="btn btn-danger fw-bold">Make Post</button>
    </div>
  </form>

</template>


<style lang="scss" scoped>
textarea {
  resize: none;
  height: 27vh !important;
}

.img-preview {
  height: 25vh;
  width: 25vh;
  border: 2px dashed var(--bs-danger);
  color: var(--bs-danger);
  background-color: var(--bs-secondary);
}

img {
  height: 35vh;
  width: 35vh;
  object-fit: cover;
  object-position: center;
}
</style>