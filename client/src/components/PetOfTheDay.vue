<script setup>
import { petsService } from "../services/PetsService";
import Pop from "../utils/Pop";
import PetCard from "./PetCard.vue";



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
  <div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-4">
        <PetCard />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional
            content. This content is a little bit longer.</p>
          <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>