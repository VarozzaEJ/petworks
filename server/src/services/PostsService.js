import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"


class PostsService {
  async getLikedPosts(userId) {
    const likedPosts = await dbContext.Posts.find({})
  }
  async createPost(postData) {
    const post = await dbContext.Posts.create(postData)
    await post.populate('creator comments')
    return post
  }
  async getAllPosts() {
    const posts = await dbContext.Posts.find().sort('-createdAt').populate('creator likes commentCount')
    return posts
  }
  async getProfilePosts(postProfileId) {
    const profile = await dbContext.Posts.find({ creatorId: postProfileId }).populate('creator pets likes')
    //TODO turn the pets virtual into its own seperate request.
    return profile
  }
  async deletePost(postId, userId) {
    const postToDestroy = await dbContext.Posts.findById(postId)
    if (userId != postToDestroy.creatorId) throw new Forbidden("NOPE! You can not destroy what you did not create")
    await postToDestroy.deleteOne()
    return `whoop whoop`
  }

}

export const postsService = new PostsService()
