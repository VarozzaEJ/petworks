
export class PetTag {
  constructor(data) {
    this.petId = data.petId
    this.postId = data.postId
    this.creatorId = data.creatorId
  }
}

export class PetPost extends PetTag {
  constructor(data) {
    super()
    this.posts = data.posts
  }
}

export class PostPet extends PetTag {
  constructor(data) {
    super()
    this.pets = data.pets
  }
}
