<script setup>
import { Pet } from '../models/Pet.js';


defineProps({ petProp: { type: Pet, required: true } })



function hide() {
    const petCardElement = document.getElementById('petCard')
    petCardElement.classList.add('hidden')
}
</script>


<template>
    <div class="justify-content-center d-flex mb-3 mt-1 mx-2">

        <div class="card bg-primary d-flex justify-content-center align-items-center pet-background-image img-fluid rounded"
            style="width: 100dvh;">
            <p class="fs-1 text-shadow fw-bold text-light">{{ petProp.name }}</p>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.pet-background-image {
    background-image: v-bind('petProp?.petBackgroundImage');
    background-size: cover;
    background-position: center;
    height: 40vh;
    border-radius: 50%;
    aspect-ratio: 1/1;
}

.text-shadow {
    text-shadow: 2px 2px black;
}
</style>