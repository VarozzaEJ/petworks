<script setup>
import { ref } from "vue";
import { Pet } from "../models/Pet";
import { Account } from "../models/Account";
defineProps({
  account: Account
})

const editablePostData = ref({
  body: '',
  imgUrl: '',
  petTags: [Pet]
})
</script>


<template>
  <form class="row justify-content-center">
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
        <input v-model="editablePostData.imgUrl" type="email" class="form-control" id="imgUrl" maxlength="1000">
      </div>
    </div>
    <div class="col-12">
      <label for="body">Make a Post!</label>
      <textarea v-model="editablePostData.body" class="form-control" id="body" maxlength="300"></textarea>
    </div>
    <div class="col-12">
      <div v-if="account?.pets">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
          <label class="form-check-label" for="flexCheckDefault">
            Default checkbox
          </label>
        </div>
      </div>
      <div v-else>
        <p class="text-center">You need to add a pet before you can post!</p>
      </div>
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