<script setup>
import { RouterLink } from "vue-router";
import { Pet } from "../models/Pet";

defineProps({ petOfTheDayProp: Pet })
</script>


<template>
  <div class=" d-none d-sm-block card m-3 bg-info shadow" style="width: 100dvh; height: 33dvh">
    <div class="row g-0">
      <div class="col-3">
        <RouterLink :to="{ name: 'Pets', params: { petId: petOfTheDayProp.id } }">
          <img :src="petOfTheDayProp.imgUrl" class="img-fluid rounded-start hero-img" :alt="petOfTheDayProp.name">
        </RouterLink>
      </div>
      <div class="col">
        <div class="card-body d-flex flex-column justify-content-between" style="height: 33dvh;">
          <div>
            <p class="card-title text-center fs-3 fw-semibold mb-3">Pet of the Day</p>
            <hr class="mb-2">
            <p class="card-text text-capitalize fs-4 fw-semibold">{{ petOfTheDayProp.name }}</p>
          </div>
          <small class="card-text text-capitalize fw-semibold text-center">{{ petOfTheDayProp.bio }}</small>
          <div class="d-flex mt-4">
            <p class="me-auto card-text">Owners:</p>
            <p v-for="owner in petOfTheDayProp.owner" :key="owner.id" class="card-text">
              <img class="profile-img me-1" :src="owner.picture" :alt="owner.name">
              <small class="text-body-secondary">{{ owner.name }}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="card d-block d-sm-none m-3 bg-info" style="width: 100dvh;">
    <div class="card-body">
      <div>
        <p class="card-title text-center fs-3 fw-semibold mb-3">Pet of the Day</p>
        <hr class="mb-2">
        <p class="card-text text-capitalize fs-4 fw-semibold">{{ petOfTheDayProp.name }}</p>
      </div>
      <small class="card-text text-capitalize fw-semibold text-center">{{ petOfTheDayProp.bio }}</small>
      <div class="d-flex mt-4">
        <p class="me-auto card-text">Owners:</p>
        <p v-for="owner in petOfTheDayProp.owner" :key="owner.id" class="card-text">
          <img class="profile-img me-1" :src="owner.picture" :alt="owner.name">
          <small class="text-body-secondary">{{ owner.name }}</small>
        </p>
      </div>
    </div>
    <img :src="petOfTheDayProp.imgUrl" class="card-img-bottom" :alt="petOfTheDayProp.name">
  </div>
</template>


<style lang="scss" scoped>
.hero-img {
  height: 33dvh;
  object-fit: cover;
  object-position: center;
}

.profile-img {
  height: 5dvh;
  object-fit: cover;
  object-position: center;
  aspect-ratio: 1/1;
  border-radius: 50%;
}
</style>