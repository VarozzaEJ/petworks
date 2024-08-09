

export class Pet {
    constructor(data) {
        this.id = data.id || data._id
        this.name = data.name
        this.ownerId = data.ownerId
        this.bio = data.bio
        this.imgUrl = data.imgUrl
        this.file = data.file
        this.species = data.species
        this.breed = data.breed
        this.petStats = data.petStats
        this.birthday = new Date(data.birthday)
        this.owner = data.owner
        this.createdAt = new Date(data.createdAt)
        this.updatedAt = new Date(data.updatedAt)
    }

    get petFileBackgroundImage() {
        return `url(${this.file})`
    }
    get petBackgroundImage() {
        return `url(${this.imgUrl})`
    }

}