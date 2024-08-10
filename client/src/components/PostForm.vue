<script setup>
import { ref } from "vue";
import { Account } from "../models/Account";
import { postsService } from "../services/PostsService";
import Pop from "../utils/Pop";
import { Modal } from "bootstrap";
import { logger } from "../utils/Logger.js";
import { petTagsService } from "../services/PetTagsService";
defineProps({
  account: Account
})

const editablePostData = ref({
  body: '',
  file: null,
  previewUrl: '',
  petTags: []
})


function selectPet(petId) {
  let petTags = editablePostData.value.petTags
  if (petTags.includes(petId)) {
    editablePostData.value.petTags = petTags.filter(id => id != petId)
  } else {
    petTags.push(petId)
  }
}

function resetForm() {
  editablePostData.value = {
    body: '',
    file: null,
    previewUrl: '',
    petTags: []
  }
}

async function createPost() {
  try {
    logger.log(editablePostData.value.file)
    const fileUrl = await postsService.getFileUrl(editablePostData.value.file)
    editablePostData.value.file = fileUrl
    logger.log(editablePostData.value)
    const post = await postsService.createPost(editablePostData.value)
    const petTagsData = editablePostData.value.petTags.map((petId) => {
      return { petId, postId: post.id }
    })
    await petTagsService.createPetTags(petTagsData)
    Modal.getOrCreateInstance('#newPostForm').hide()
    Pop.success("Created Post")
    resetForm()
    await postsService.getAllPosts()
  }
  catch (error) {
    Pop.error('Could not make Post',);
    logger.log(error)
  }
}


async function selectFile(event) {
  try {
    const file = event.target.files[0]
    logger.log(file)
    editablePostData.value.file = file
    editablePostData.value.previewUrl = URL.createObjectURL(file)
  }
  catch (error) {
    Pop.error("Could not select file");
    logger.error(error)
  }
}

</script>


<template>
  <form v-if="account" @submit.prevent="createPost()" class="row justify-content-center">
    <div class="col-8 mb-3">
      <label class="form-label">Image Preview</label>
      <div class="d-flex justify-content-center">
        <div v-if="!editablePostData.previewUrl"
          class="bg-subtle rounded img-preview d-flex justify-content-center align-items-center">
          <i class="mdi mdi-image display-1"></i>
        </div>
        <div v-else>
          <img class="rounded preview-img" :src="editablePostData.previewUrl" :alt="`${editablePostData.previewUrl}`">
        </div>
      </div>
    </div>
    <div class="col-12">
      <!-- <form @submit.prevent="uploadFile()"> -->
      <div class="row">
        <div class="col-12">
          <!-- <div class="mb-3">
            <label for="imgUrl" class="form-label">Image File</label>
            <input v-model="editablePostData.imgUrl" name="imgUrl" type="text" class="form-control" id="imgUrl"
              maxlength="1000">
          </div> -->
          <div class="mb-3">
            <label for="imgUrl" class="form-label">Image File</label>
            <input @change="selectFile" name="file" type="file" multiple="false" accept="image/*" class="form-control"
              id="imgUrl" maxlength="1000">
          </div>
        </div>
        <div class="col-3 d-flex align-items-center">
        </div>
      </div>
      <!-- </form> -->
    </div>
    <div class="col-12 mb-3">
      <label for="body">Make a Post!</label>
      <textarea v-model="editablePostData.body" class="form-control" id="body" minlength="15" maxlength="300"
        required></textarea>
    </div>
    <!-- <select v-model="editablePostData.petTags" class="form-select" multiple>
      <option v-for="pet in account?.pets" :key="pet.id" :value="pet.id">{{ pet.name }}</option>
    </select> -->
    <section class="row">
      <div class="col-12 mb-1">Tag Your Pets</div>
      <div v-for="pet in account.pets" :key="`pet-tag-${pet.id}`" class="col-3 mb-3">
        <img @click="selectPet(pet.id)" class="pet-tag selectable text-success"
          :class="{ 'selected': editablePostData.petTags.includes(pet.id) }" :src="pet.imgUrl" :alt="pet.name">
      </div>
    </section>
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

.pet-tag {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;

}

.img-preview {
  height: 25vh;
  width: 25vh;
  border: 2px dashed var(--bs-danger);
  color: var(--bs-danger);
  background-color: var(--bs-secondary);
}

.selected {
  border: 3px solid var(--bs-success);

  &::after {
    background-color: rgba(0, 128, 0, 0.432);
  }
}

.preview-img {
  width: 200px;
  height: 200px;
}
</style>
