import { dbContext } from "../db/DbContext.js"


class CommentsService {
    async createComment(commentData) {
        const comment = await dbContext.Comments.create(commentData)
        await comment.populate('creator likeCount')
        return comment
    }
    async getCommentsByPostId(postId) {
        const postComments = await dbContext.Comments.find({ postId: postId }).populate('creator likeCount')
        return postComments
    }

    async getAllComments() {
        const comments = await dbContext.Comments.find().populate('creator likeCount')
        return comments
    }
}

export const commentsService = new CommentsService()