<script setup>
import { computed, watch } from 'vue';
import PostCard from './PostCard.vue';
import { Post } from '../models/Post.js';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop.js';
import { commentsService } from '../services/CommentsService.js';

// defineProps({ postProp: { type: Post, required: true } })
const post = computed(() => AppState.activePost)
const comments = computed(() => AppState.activePostComments)

watch(() => AppState.activePost, () => {
    try {
        commentsService.getCommentsByPostId(post.value.id)
    } catch (error) {
        Pop.error('Could not get post comments')
    }
})

</script>


<template>
    <div class="modal fade" id="postFocusModal" tabindex="-1" :aria-labelledby="`SpotlightPostLabel`"
        aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <!-- <div class="modal-header">
                    <h1 class="modal-title fs-5" id=""></h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div> -->
                <div v-if="post" class="modal-body p-0">
                    <div class="justify-content-center d-flex mb-3 mt-1">
                        <div class="card bg-primary" style="width: 100dvh;">
                            <div class="card-title bg-primary">
                                <div class="">
                                    <div class="d-flex align-items-center">
                                        <img :src="post.creator.picture" class="account-img m-2" alt="">

                                        <p class="mb-0 text-dark fs-5">
                                            {{ post.creator.name }}
                                        </p>
                                    </div>
                                    <div class="d-flex justify-content-center">
                                        <h5 class="card-title">{{ post.body }}</h5>
                                    </div>
                                </div>
                            </div>
                            <div data-bs-toggle="modal" data-bs-target="#postFocusModal">

                                <img :src="post.imgUrl" class="card-img-top"
                                    :alt="`An image of an event with the type of`">
                                <div class="card-body bg-primary d-flex align-items-center justify-content-between">
                                    <p class="mb-0 fs-5">12 <i class="mdi mdi-comment-outline"></i></p>
                                    <p class="mb-0 fs-5"><i class="mdi mdi-heart-outline"></i>15</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="row">
                        <div v-for="comment in comments" :key="comment.id" class="col-12">
                            <div class="row">
                                <div class="col-12">
                                    {{ comment.body }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>