import { dbContext } from "../db/DbContext.js"


class LikesService {
    async likePost(likeData) {
        const likedPost = await dbContext.Likes.create(likeData)
        await likedPost.populate('post account')
        await likedPost.save()
        return likedPost
    }
}

export const likesService = new LikesService()