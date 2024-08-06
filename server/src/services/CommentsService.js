import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"


class CommentsService {
    async deleteComment(commentId, userId) {
        const commentToDelete = await dbContext.Comments.findById(commentId)
        if (userId != commentToDelete.creatorId) throw new Forbidden("You cannot delete a comment you didn't make")
        await commentToDelete.deleteOne()
        return `Your comment was deleted`
    }
    async createComment(commentData) {
        const comment = await dbContext.Comments.create(commentData)
        await comment.populate('creator likeCount')
        return comment
    }
    async getCommentsByPostId(postId) {
        const postComments = await dbContext.Comments.find({ postId }).populate('creator likeCount')
        return postComments
    }

    async getAllComments() {
        const comments = await dbContext.Comments.find().populate('creator likeCount')
        return comments
    }

}

export const commentsService = new CommentsService()