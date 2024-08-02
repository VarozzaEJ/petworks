<script setup>
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { postsService } from '../services/PostsService.js';
import PostCard from '../components/PostCard.vue';
import PetCard from '../components/PetCard.vue';
import { petsService } from '../services/PetsService.js';

const route = useRoute()


const activeProfilePets = computed(() => AppState.activeProfilePets)
const activeProfilePosts = computed(() => AppState.activeProfilePosts)
const activeProfile = computed(() => AppState.activeProfile)

onMounted(() => {
    getActiveProfile()
    getActiveProfilePosts()
    getActiveProfilePets()
})


async function getActiveProfilePosts() {
    try {
        await postsService.getActiveProfilePosts(route.params.profileId)
    }
    catch (error) {
        Pop.error('Could not get specific posts');
        logger.log(error)
    }
}

async function getActiveProfile() {
    try {

        await postsService.getActiveProfile(route.params.profileId)
    }
    catch (error) {
        Pop.error('Could not get profile');
        logger.log(error)
    }
}

async function getActiveProfilePets() {
    try {
        await petsService.getActiveProfilePets(route.params.profileId)
    }
    catch (error) {
        Pop.error("Could not get this profile's pets");
        logger.error(error)
    }
}
</script>


<template>

    <div v-if="activeProfile" class="container">
        <div class="row my-4 justify-content-between">
            <div class="col-3">
                <img class="profilePageImg" :src="activeProfile.picture" alt="">
            </div>
            <div class="col-7">
                <div class="mt-3 fs-4">
                    <p>{{ activeProfile.name }}</p>
                </div>
                <div>
                    <p>{{ activeProfile.tagline }}</p>
                </div>
            </div>
        </div>
        <div class="row">
            <div v-for="pet in activeProfilePets" :key="pet.id" class="col-12 mx-0 px-0">
                <PetCard :petProp="pet" />
            </div>
        </div>
        <div class="row">
            <div v-for="post in activeProfilePosts" :key="post.id" class="col-12 mx-0 px-0">
                <PostCard :postProp="post" />
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.profilePageImg {
    height: 15dvh;
    width: 15dvh;
    aspect-ratio: 1/1;
    border-radius: 30%;
}
</style>