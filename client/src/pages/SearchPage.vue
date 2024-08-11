<script setup>
import { computed, ref } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { postsService } from '../services/PostsService.js';

const searchTerm = ref('')


async function searchPosts() {
    try {
        logger.log('searching for 🔎', searchTerm.value)
        await postsService.searchPosts(searchTerm.value)
        searchTerm.value = ''
    }
    catch (error) {
        Pop.error(error);
    }
}
</script>


<template>
    <div class="container-fluid d-flex justify-content-center align-items-center ">
        <!-- <div>

            <form @submit.prevent="searchPosts()" class="d-flex  justify-content-center">
                <div class="input-group rounded-pill my-3  d-flex">

                    <input v-model="searchTerm" type="text" class="form-control " />

                    <button type="submit" :title="`Search For ${searchTerm}`" class="btn btn-info px-3"><i
                            class="mdi mdi-magnify"></i></button>
                </div>
            </form>
        </div> -->
        <div>
            <h1 class="fw-bold">🚧 Coming Soon 🚧</h1>

        </div>
    </div>
</template>


<style lang="scss" scoped>
.footer {
    bottom: 64px;
}
</style>