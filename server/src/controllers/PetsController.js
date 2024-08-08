import { Auth0Provider } from "@bcwdev/auth0provider";
import { petsService } from "../services/PetsService.js";
import BaseController from "../utils/BaseController.js";
import { logger } from "../utils/Logger.js";
import { petTagsService } from "../services/PetTagsService.js";

export class PetsController extends BaseController {
  constructor() {
    super('api/pets')
    this.router
      .get('/randompet', this.getRandomPet)
      .get('/:petId', this.getPetById)
      .get('/:petId/petPosts', this.getPetPosts)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createPet)
  }

  async createPet(request, response, next) {
    try {
      const user = request.userInfo
      const petData = request.body
      petData.ownerId = user.id
      const newPet = await petsService.createPet(petData)
      response.send(newPet)
    }
    catch (error) {
      next(error);
      logger.log('Could not create pet', error)
    }
  }

  async getRandomPet(request, response, next) {
    try {
      const randomPet = await petsService.getPetOfTheDay()
      response.send(randomPet)
    } catch (error) {
      next(error)
    }
  }

  async getPetById(request, response, next) {
    try {
      const petId = request.params.petId
      const foundPet = await petsService.getPetById(petId)
      response.send(foundPet)
    } catch (error) {
      next(error)
    }
  }


  async getPetPosts(request, response, next) {
    try {
      const petId = request.params.petId
      const petPosts = await petTagsService.getPetTagsByPetId(petId)
      response.send(petPosts)
    } catch (error) {
      next(error)
    }
  }

}
