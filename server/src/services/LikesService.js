import { dbContext } from "../db/DbContext.js"


class LikesService {
  async getLikesByPostId(postId) {
    const postLikes = await dbContext.Likes.find({ postId })
    return postLikes
  }
  async likePost(likeData) {
    const likedPost = await dbContext.Likes.create(likeData)
    await likedPost.populate('post account')
    await likedPost.save()
    return likedPost
  }
}

export const likesService = new LikesService()
