import { dbContext } from "../db/DbContext.js";
import { Forbidden } from "../utils/Errors.js";

class PetsService {

  async createPet(petData) {
    const pet = await dbContext.Pets.create(petData)
    // await pet.populate('creator')
    return pet
  }

  async getPetsByOwnerId(ownerId) {
    const pets = await dbContext.Pets.find({ ownerId: ownerId })
    if (ownerId == null) throw new Forbidden(`The owner with this id ${ownerId} has no pets`)
    return pets
  }
}

export const petsService = new PetsService()
