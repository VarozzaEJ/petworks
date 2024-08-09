import { Account } from "./Account.js"
import { Post } from "./Post.js"



export class Like {
    constructor(data) {
        this.id = data.id || data._id
        this.accountId = data.accountId
        this.postId = data.postId

    }
}

export class PostLikerProfile extends Like {
    constructor(data) {
        super(data)
        this.account = new Account(data.account)
    }
}

export class LikedPost extends Like {
    constructor(data) {
        super(data)
        this.post = new Post(data.post)
    }
}