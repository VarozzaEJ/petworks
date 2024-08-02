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

}

export const petsService = new PetsService()