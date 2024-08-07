import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { petTagsService } from "../services/PetTagsService";


export class PetTagsController extends BaseController {
  constructor() {
    super('api/petTags')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createPetTag)
  }

  async createPetTag(request, response, next) {
    try {
      const user = request.userInfo
      const petTagData = request.body
      petTagData.creatorId = user.id
      const petTag = await petTagsService.createPetTag(petTagData)
    } catch (error) {
      next(error)
    }
  }
}