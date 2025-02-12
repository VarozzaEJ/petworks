import { AppState } from "../AppState.js"
import { Pet } from "../models/Pet.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"


class PetsService {
  async deletePet(petId) {
    const response = await api.delete(`api/pets/${petId}`)
    Pop.success(response.data)
    history.back()
  }
  async getFileUrl(file) {
    const payload = new FormData()
    payload.append('image', file)
    logger.log('🎆', payload)
    const response = await api.post('api/upload/sharp', payload)
    return response.data
  }

  async getActiveProfilePets(profileId) {
    AppState.activeProfilePets = null
    const response = await api.get(`api/profiles/${profileId}/pets`)
    const activeProfilePets = response.data.map(petPOJO => new Pet(petPOJO))
    AppState.activeProfilePets = activeProfilePets
  }
  async getActivePetsDetails(petId) {
    AppState.activePets = null
    const response = await api.get(`api/pets/${petId}`)
    const newPet = new Pet(response.data)
    AppState.activePets = newPet
    logger.log('🐶🐶🐶🐶', newPet)
    return newPet
  }
  async createPet(petData) {
    const response = await api.post('api/pets', petData)
    logger.log('🐕', response.data)
    // const newPet = new Pet(response.data)
    // AppState.pets.unshift(newPet)
    // return newPet
  }
  async getPetOfTheDay() {
    AppState.petOfTheDay = null
    const response = await api.get('api/pets/randompet')
    const petOfTheDay = new Pet(response.data)
    AppState.petOfTheDay = petOfTheDay
  }
}

export const petsService = new PetsService()
