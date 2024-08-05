<script setup>
import { computed, ref, watch } from 'vue';
import PostCard from './PostCard.vue';
import { Post } from '../models/Post.js';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop.js';
import { commentsService } from '../services/CommentsService.js';
import { logger } from '../utils/Logger.js';
import { useRoute, useRouter } from 'vue-router';

// defineProps({ postProp: { type: Post, required: true } })
const post = computed(() => AppState.activePost)
const comments = computed(() => AppState.activePostComments)
const route = useRoute()
const router = useRouter()

watch(() => AppState.activePost, () => {
    try {
        const postId = route.query.postId
        commentsService.getCommentsByPostId(postId)
        // logger.log('ROUTE.QUERY.POSTID', postId)
        // route.query = post.value.id
    } catch (error) {
        Pop.error('Could not get post comments')
        logger.error(error)
    }
})

const commentData = ref({
    body: '',
    postId: route.query.postId
})

async function createComment() {
    try {
        await commentsService.createComment(commentData.value)
        Pop.success(`Successfully created comment`)
        resetForm()
        //TODO reset form on submit once comments are finished
    }
    catch (error) {
        Pop.error('Could not create comment', 'error');
    }
}

function resetForm() {
    commentData.value = {
        body: '',
        postId: route.query.postId
    }
}

</script>


<template>
    <div class="modal fade" id="postFocusModal" tabindex="-1" :aria-labelledby="`SpotlightPostLabel`"
        aria-hidden="true">
        <div class="modal-dialog modal-fullscreen modal-lg">
            <div class="modal-content">
                <!-- <div class="modal-header">
                    <h1 class="modal-title fs-5" id=""></h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div> -->
                <div v-if="post" class="bg-primary flex-column d-flex modal-body p-0">
                    <div class="justify-content-center d-flex mb-3">
                        <div class="card border-none bg-primary" style="width: 100dvh;">
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
                            <form @submit.prevent="createComment()">
                                <div class="mb-3">
                                    <label for="comment" class="form-label"></label>
                                    <textarea v-model="commentData.body" placeholder="Tell the people..."
                                        class="form-control" id="comment" rows="3" name="comment"></textarea>
                                </div>
                                <div class="d-flex mb-2 justify-content-end">
                                    <button role="button" title="create comment" type="submit"
                                        class="btn btn-secondary text-end">Submit</button>
                                </div>
                            </form>
                            <div v-for="comment in comments" :key="comment.id" class="">
                                <div class=" bg-light mb-3 mx-3">
                                    <span class="d-flex align-items-center "><img class="creator-img"
                                            :src="comment.creator.picture" :alt="`${comment.creator.name}'s picture'`">
                                        <p class="fs-2 mb-0 ms-2">{{ comment.creator.name }}</p>
                                    </span>
                                    <p class="fs-5 fw-bold text-dark">{{ comment.body }}</p>
                                </div>
                            </div>
                        </div>




                    </div>
                </div>
                <div class="bg-primary modal-footer">

                </div>
                <footer class="bg-primary">
                    <!-- <button class="fab btn shadow btn-secondary justify-content-end" title="New Comment">
                        <i class="mdi mdi-pen fs-1"></i>
                    </button> -->
                </footer>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.fab {
    border-radius: 50%;
    position: fixed;
    bottom: 1em;
    right: 1em;
    padding: .75em;
    border: none;
    box-shadow: var(--shadow);
    z-index: 999;
    outline: none;
    // text-shadow: 1px 1px black;
}

.border-none {
    border: none;
    border-radius: 0;
}

.creator-img {
    aspect-ratio: 1/1;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
}
</style>