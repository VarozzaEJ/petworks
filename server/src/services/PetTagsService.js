import { dbContext } from "../db/DbContext"


class PetTagsService {


  async createPetTag(petTagData) {
    const petTag = await dbContext.PetTags.create(petTagData)
    await petTag.populate({ path: 'pet', populate: { path: 'owner' } })
  }
}

export const petTagsService = new PetTagsService