import { dbContext } from "../db/DbContext"


class PetTagsService {


  async createPetTag(petTagData) {
    const petTag = await dbContext.PetTags.create(petTagData)
    return petTag
  }


  async getPetTagsByPetId(petId) {
    const petPosts = await dbContext.PetTags.find({ petId }).populate({ path: 'posts', populate: { path: 'likeCount commentCount' } })
    return petPosts
  }
}

export const petTagsService = new PetTagsService