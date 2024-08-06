import { AppState } from "../AppState.js"
import { Pet } from "../models/Pet.js"
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

  async getPetOfTheDay() {
    const response = await api.get('api/pets/randompet')
    const petOfTheDay = new Pet(response.data)
    AppState.petOfTheDay = petOfTheDay
  }
}

export const petsService = new PetsService()
