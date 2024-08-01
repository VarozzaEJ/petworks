

export class Profile {
    constructor(data) {
        this.id = data.id || data._id
        this.name = data.name
        this.picture = data.picture
        this.tagline = data.tagline
        // this.petTags = data.petTags || null
        // this.friendCount = data.friendCount
    }
}