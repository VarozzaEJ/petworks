import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentsService } from "../services/CommentsService.js";


export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
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
}