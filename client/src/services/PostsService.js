import { AppState } from "../AppState.js"
import { Like } from "../models/Like.js"
import { Post } from "../models/Post.js"
import { Profile } from "../models/Profile.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class PostsService {
  async unlikePost(likeId) {
    const likeToDelete = await api.delete(`api/comments/${likeId}`)
    return likeToDelete
  }
  async getFileUrl(file) {
    const payload = new FormData()
    payload.append('image', file)
    const response = await api.post('api/upload', payload)
    return response.data
  }
  async likePost(postId) {
    const response = await api.post('api/likes', postId)
    const newLike = new Like(response.data)
    const foundPost = AppState.posts.find((post) => post.id == postId.postId)
    foundPost.likes.push(newLike)
  }
  setActiveProject(postProp) {
    AppState.activePost = postProp
  }
  async getAllPosts() {
    // AppState.posts = null
    const response = await api.get('api/posts')
    logger.log('GOT POSTS', response.data)
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

  async createPost(postData) {
    const response = await api.post('api/posts', postData)
    const newPost = new Post(response.data)
    AppState.posts.unshift(newPost)
    return newPost
  }
}

export const postsService = new PostsService()
