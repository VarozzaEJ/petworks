import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class CommentsService {
    async createComment(commentData) {
        const response = await api.post(`api/comments`, commentData)
        const comment = await new Comment(response.data)
        AppState.activePostComments.unshift(comment)
    }
    async getCommentsByPostId(postId) {
        AppState.activePostComments = []
        const response = await api.get(`api/posts/${postId}/comments`)
        logger.log('📈📈📈📈', response.data)
        const activePostComments = response.data.map(commentPOJO => new Comment(commentPOJO))
        AppState.activePostComments = activePostComments
    }

}

export const commentsService = new CommentsService()