import { dbContext } from "../db/DbContext"


class PetTagsService {


  async createPetTag(petTagData) {
    const petTag = await dbContext.PetTags.create(petTagData)
    return petTag
  }
}

export const petTagsService = new PetTagsService