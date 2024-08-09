import { Account } from "./Account.js"
import { Like } from "./Like.js"


export class Post {
  constructor(data) {
    this.id = data.id || data._id
    this.body = data.body
    this.creatorId = data.creatorId
    this.file = data.file
    this.imgUrl = data.imgUrl
    this.petTags = data.petTags
    this.creator = data.creator ? new Account(data.creator) : null
    this.likeCount = data.likeCount
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
    this.pet = data.pet
    /**@type {Like[]} */
    this.likes = data.likes
    this.commentCount = data.commentCount
  }
}
