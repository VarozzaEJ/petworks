import { dbContext } from "../db/DbContext.js"
import { logger } from "../utils/Logger.js"


class LikesService {
  async unlikePost(likeData) {
    const likeToDelete = await dbContext.Likes.findByIdAndDelete(likeData.likeId)
    logger.log(likeToDelete)
    return likeToDelete
  }
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
