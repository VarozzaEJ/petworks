import { dbContext } from "../db/DbContext.js";
import { PetSchema } from "../models/Pet.js";
import { Forbidden, NotFound } from "../utils/Errors.js";

const petOfTheDayCache = {
  pet: null,
  expireAt: 0
}

class PetsService {

  async createPet(petData) {
    const pet = await dbContext.Pets.create(petData)
    await pet.populate('owner')
    return pet
  }

  async getPetsByOwnerId(ownerId) {
    const pets = await dbContext.Pets.find({ ownerId: ownerId })
    if (ownerId == null) throw new NotFound(`The owner with this id ${ownerId} has no pets`)
    return pets
  }

  async getPetOfTheDay() {
    if (petOfTheDayCache.expireAt > Date.now()) return petOfTheDayCache.pet
    const pets = await dbContext.Pets.find().populate('owner')
    const randomPetIndex = Math.floor(Math.random() * pets.length)
    const petOFTheDay = pets[randomPetIndex]
    petOfTheDayCache.pet = petOFTheDay
    const today = new Date(new Date().toDateString())
    const tomorrow = today.getTime() + 86400000
    petOfTheDayCache.expireAt = tomorrow
    return petOFTheDay
  }
}

export const petsService = new PetsService()
