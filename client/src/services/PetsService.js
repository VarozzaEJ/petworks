import { AppState } from "../AppState.js"
import { Pet } from "../models/Pet.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class PetsService {

  async getActiveProfilePets(profileId) {
    AppState.activeProfilePets = null
    const response = await api.get(`api/profiles/${profileId}/pets`)
    const activeProfilePets = response.data.map(petPOJO => new Pet(petPOJO))
    AppState.activeProfilePets = activeProfilePets
  }
  async getActivePetsDetails(petsId) {
    AppState.activePets = null
    //                           path: '/petsDetails/:petsId',
    const response = await api.get(`api/petsDetails/${petsId}`)
    const activePets = response.data.map(petPOJO => new Pet(petPOJO))
    AppState.activePets = activePets
  }
  async createPet(petData) {
    const response = await api.post('api/pets', petData)
    logger.log('🐕', response.data)
    const newPet = new Pet(response.data)
    AppState.pets.unshift(newPet)
    return newPet
  }
  async getPetOfTheDay() {
    AppState.petOfTheDay = null
    const response = await api.get('api/pets/randompet')
    const petOfTheDay = new Pet(response.data)
    AppState.petOfTheDay = petOfTheDay
  }
}

export const petsService = new PetsService()
