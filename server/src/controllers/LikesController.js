import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { likesService } from "../services/LikesService.js";


export class LikesController extends BaseController {
  constructor() {
    super('api/likes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.likePost)
  }

  async likePost(request, response, next) {
    try {
      const user = request.userInfo
      const likeData = request.body
      // logger.log(likeData)
      likeData.accountId = user.id
      const newTicket = await likesService.likePost(likeData)
      response.send(newTicket)
    } catch (error) {
      next(error)
    }
  }
}
