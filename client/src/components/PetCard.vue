<script setup>
import { Pet } from '../models/Pet.js';


defineProps({ petProp: { type: Pet, required: true } })




</script>


<template>
    <div class="justify-content-center d-flex mb-3 mt-1">

        <div class="card bg-primary" style="width: 100dvh;">
            <img :src="petProp.imgUrl" class="card-img-top" :alt="`An image of an event with the type of`">
        </div>
    </div>
</template>


<style lang="scss" scoped></style>