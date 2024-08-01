import { dbContext } from "../db/DbContext.js"


class PostsService {
    async createPost(postData) {
        const post = await dbContext.
    }

}

export const postsService = new PostsService()