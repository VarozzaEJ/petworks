import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { postsService } from "../services/PostsService.js";
import { logger } from "../utils/Logger.js";
import { commentsService } from "../services/CommentsService.js";
import { petTagsService } from "../services/PetTagsService.js";


export class PostsController extends BaseController {
  constructor() {
    super('api/posts')
    this.router
      .get('', this.getAllPosts)
      // .get('?query=:searchTerm', this.searchPosts)
      //FIXME figure out query for searching post content on the backend.
      .get('/:postId/comments', this.getCommentsByPostId)
      .get('/:postId/petTags', this.getPetTagsByPostId)
      .get('/liked', this.getLikedPosts)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createPost)
      .delete('/:postId', this.deletePost)

  }

  async createPost(request, response, next) {
    try {
      const user = request.userInfo
      const postData = request.body
      postData.creatorId = user.id
      const newPost = await postsService.createPost(postData)
      response.send(newPost)
    }
    catch (error) {
      next(error);
      logger.log('Could not create post', error)
    }
  }

  async getAllPosts(request, response, next) {
    try {
      const posts = await postsService.getAllPosts()
      response.send(posts)
    } catch (error) {
      next(error)
    }
  }

  async getCommentsByPostId(request, response, next) {
    try {
      const postId = request.params.postId
      const comments = await commentsService.getCommentsByPostId(postId)
      response.send(comments)
    } catch (error) {
      next(error)
    }
  }
  async deletePost(request, response, next) {
    try {
      const user = request.userInfo
      const postId = request.params.postId
      const message = await postsService.deletePost(postId, user.id)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }

  async getPetTagsByPostId(request, response, next) {
    try {
      const postId = request.params.postId
      const taggedPets = await petTagsService.getPetTagsByPostId(postId)
      response.send(taggedPets)
    } catch (error) {
      next(error)
    }
  }

  async searchPosts(request, response, next) {
    try {
      const searchTerm = request.query.searchTerm
      logger.log(request)
    } catch (error) {
      next(error)
    }
  }

  async getLikedPosts(request, response, next) {
    try {
      const likedPosts = await postsService.getLikedPosts()
      response.send(likedPosts)
    } catch (error) {
      next(error)
    }
  }

}
