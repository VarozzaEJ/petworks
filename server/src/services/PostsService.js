import { dbContext } from "../db/DbContext.js"


class PostsService {
  async createPost(postData) {
    const post = await dbContext.Posts.create(postData)
    await post.populate('creator')
    return post
  }
  async getAllPosts() {
    const posts = await dbContext.Posts.find().populate('creator')
    return posts
  }
  async getProfilePosts(postProfileId) {
    const profile = await dbContext.Posts.find({ creatorId: postProfileId })
    return profile
  }

}

export const postsService = new PostsService()
