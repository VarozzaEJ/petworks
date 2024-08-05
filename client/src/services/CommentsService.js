import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"


class CommentsService {
    async getCommentsByPostId(postId) {
        AppState.activePostComments = null
        const response = await api.get(`api/${postId}/comments`)
        const activePostComments = response.data.map(commentPOJO => new Comment(commentPOJO))
        AppState.activePostComments = activePostComments
    }

}

export const commentsService = new CommentsService()