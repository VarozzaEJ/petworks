import { Post } from "./Post"

export class PetTag {
  constructor(data) {
    this.id = data.id || data._id
    this.petId = data.petId
    this.postId = data.postId
    this.creatorId = data.creatorId
  }
}

export class PetPost extends PetTag {
  constructor(data) {
    super(data)
    this.post = new Post(data.post)
  }
}

export class TaggedPet extends PetTag {
  constructor(data) {
    super(data)
    this.pet = data.pet
  }
}
