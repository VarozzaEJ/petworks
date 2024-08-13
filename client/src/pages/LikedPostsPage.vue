<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';


onMounted(() => {
    // getAllPosts()
})

const likedPosts = computed(() => AppState.posts.find(post => post.likes.find(like => like.accountId == AppState.account?.id)))
const account = computed(() => AppState.account)


async function getLikedPosts() {
    try {
        await postsService.getLikedPosts()
    }
    catch (error) {
        Pop.error('Error getting posts');
    }
}

</script>


<template>
    <div class="container-fluid d-flex justify-content-center">
        <div class="row">
            <div class="col-12">
                <h1 class="fw-bold">🚧 Coming Soon 🚧</h1>
            </div>
        </div>
        <!-- <div class="row">
            <div v-for="post in likedPosts" :key="post" class="col-12  mx-0 px-0">
                 <PostCard :postProp="post" /> -->
        <!-- {{ likedPosts.body }} -->
        <!-- </div> -->
        <!-- <div v-if="AppState.posts" class="justify-content-center d-flex mb-3 mt-1">
                <div class="card bg-primary shadow" style="width: 100dvh;">
                    <div class="card-title bg-primary">
                        <div class="">
                            <div class="d-flex align-items-center d-col ">
                                <router-link :to="{ name: 'Profile', params: { profileId: likedPosts.creatorId } }">
                                    <img :src="likedPosts.creator.picture" class="account-img m-2" alt="">
                                </router-link>
                                <p class="mb-0 text-dark fs-5">
                                    {{ likedPosts.creator.name }}
                                </p>
                                <div v-if="account?.id == likedPosts.creator.id"
                                    class="dropdown m-3 flex-grow-1 d-flex justify-content-end">
                                    <p href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        ...
                                    </p>
                                    <div class="dropdown-menu bg-danger">
                                        <div class="bg-danger d-flex justify-content-center">
                                            <button @click="deletePost(likedPosts.id)" class="btn btn-danger"><i
                                                    class="mdi mdi-delete-forever">Delete</i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class=" d-flex justify-content-center">
                                <p class="card-title mx-3">{{ likedPosts.body }}</p>
                            </div>
                        </div>
                    </div>

                    <div @click="setActiveProject()" data-bs-toggle="modal" data-bs-target="#postFocusModal">
                        <img :src="likedPosts.imgUrl || likedPosts.file" class="post-img img-fluid"
                            :alt="`An image of an event with the type of`">
                    </div>
                    <div class="card-body bg-primary d-flex align-items-center justify-content-between">
                        <p class="mb-0 fs-5">{{ likedPosts?.commentCount }} <i class="mdi mdi-comment-outline"></i></p>
                        <p v-if="!props.likedPosts.likes.find(like => like.accountId == account?.id)"
                            class=" mb-0 fs-5">
                            <i @click="likePost()" class="mdi mdi-heart-outline"></i>{{
                                foundPost?.likes.length }}
                        </p>
                        <p v-else-if="props.likedPosts.likes.find(like => like.accountId === account?.id)"
                            class="mb-0 fs-5"><i @click="unlikePost()" class="mdi text-info mdi-heart"></i>{{
                                foundPost?.likes.length }}
                        </p>



                    </div>
                </div>
            </div> 
        </div> -->
    </div>
</template>


<style lang="scss" scoped></style>