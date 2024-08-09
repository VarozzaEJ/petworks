import { dbContext } from "../db/DbContext.js"


class PostsService {
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

}

export const postsService = new PostsService()
