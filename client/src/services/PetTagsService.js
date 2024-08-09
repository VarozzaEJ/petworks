import { AppState } from "../AppState"
import { PetPost, TaggedPet } from "../models/PetTag"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PetTagsService {
  async getTaggedPets(postId) {
    const response = await api.get(`api/posts/${postId}/petTags`)
    const taggedPets = response.data.map((petTag) => new TaggedPet(petTag))
    AppState.activePostTaggedPets = taggedPets
  }
  async createPetTags(petTags) {
    const response = await api.post('api/petTags', petTags)
    logger.log(response.data);

  }

  async getPetPosts(petId) {
    AppState.petPosts = []
    const response = await api.get(`api/pets/${petId}/petPosts`,)
    const petPosts = response.data.map(petPost => new PetPost(petPost))
    AppState.petPosts = petPosts
  }
}

export const petTagsService = new PetTagsService()