import { dbContext } from "../db/DbContext.js"


class PostsService {
    async createPost(postData) {
        const post = await dbContext.Posts.create(postData)
        await post.populate('creator')
        return post
    }

}

export const postsService = new PostsService()