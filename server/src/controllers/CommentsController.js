import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentsService } from "../services/CommentsService.js";


export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .get('', this.getAllComments)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createComment)
    }

    async createComment(request, response, next) {
        try {
            const user = request.userInfo
            const commentData = request.body
            commentData.creatorId = user.id
            const newComment = await commentsService.createComment(commentData)
            response.send(newComment)
        } catch (error) {
            next(error)
        }
    }

    async getAllComments(request, response, next) {
        try {
            const comments = await commentsService.getAllComments()
            response.send(comments)
        } catch (error) {
            next(error)
        }
    }

    async getCommentsByPostId(request, response, next) {
        try {
            const postId = request.params.postId
            const comments = await commentsService.getCommentsByPostId(postId)
            response.send(comments)
        } catch (error) {
            next(error)
        }
    }
}