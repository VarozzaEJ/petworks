import { Account } from "./Account.js"


export class Post {
    constructor(data) {
        this.id = data.id || data._id
        this.body = data.body
        this.creatorId = data.creatorId
        this.imgUrl = data.imgUrl
        this.petTags = data.petTags
        this.creator = data.creator ? new Account(data.creator) : null
        this.createdAt = data.createdAt
        this.updatedAt = data.updatedAt
        this.pet = data.pet
    }
}