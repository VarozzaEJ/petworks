import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { Profile } from "../models/Profile.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class PostsService {
    setActiveProject(postProp) {
        AppState.activePost = postProp
    }
    async getAllPosts() {
        // AppState.posts = null

        const response = await api.get('api/posts')
        logger.log(response.data)
        const posts = await response.data.map(postPOJO => new Post(postPOJO))
        AppState.posts = posts
    }
    async getActiveProfile(profileId) {
        AppState.activeProfile = null
        const response = await api.get(`api/profiles/${profileId}`)
        const activeProfile = new Profile(response.data)
        AppState.activeProfile = activeProfile
    }
    async getActiveProfilePosts(profileId) {
        AppState.activeProfilePosts = null
        const response = await api.get(`api/profiles/${profileId}/posts`)
        const activeProfilePosts = response.data.map(postPOJO => new Post(postPOJO))
        AppState.activeProfilePosts = activeProfilePosts
    }

}



export const postsService = new PostsService()