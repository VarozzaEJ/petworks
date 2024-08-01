<script setup>
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { postsService } from '../services/PostsService.js';

const route = useRoute()
const router = useRouter()

const posts = computed(() => AppState.posts)
const activeProfilePosts = computed(() => AppState.activeProfilePosts)
const activeProfile = computed(() => AppState.activeProfile)

onMounted(() => {
    getActiveProfilePosts()
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
    }
}

</script>


<template>

    <div class="container">
        <div class="row">
            <div class="col-3">
                <img :src="" alt="">
            </div>
            <div class="col-9">
                <div>
                    <p>{{ profile.name }}</p>
                </div>
            </div>
        </div>
        <div class="row">
            <div v-for="post in activeProfilePosts" :key="post.id" class="col-12">
                <PostCard :postProp="post" />
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>