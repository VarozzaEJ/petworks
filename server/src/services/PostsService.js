import { dbContext } from "../db/DbContext.js"


class PostsService {
    async getAllPosts() {
        const posts = await dbContext.Posts.find().populate('creator')
        return posts
    }
    async createPost(postData) {
        const post = await dbContext.Posts.create(postData)
        await post.populate('creator')
        return post
    }

}

export const postsService = new PostsService()