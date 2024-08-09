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

        <div v-if="petProp.file == undefined || null"
            class="card bg-primary d-flex justify-content-center align-items-center rounded" style="width: 100dvh;">
            <img class="img-fluid" :src="petProp.imgUrl" :alt="petProp.name">
            <p class="fs-1 text-shadow fw-bold text-light">{{ petProp?.name }}</p>
        </div>
        <div v-else-if="petProp.imgUrl == undefined || null"
            class="card bg-primary d-flex justify-content-center align-items-center rounded" style="width: 100dvh;">
            <img class="img-fluid" :src="petProp.file" :alt="petProp.name">
            <p class="fs-1 text-shadow fw-bold text-light">{{ petProp?.name }}</p>
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

.file-pet-background-image {
    background-image: v-bind('petProp?.petFileBackgroundImage');
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