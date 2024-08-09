import { AppState } from "../AppState.js";
import { Like } from "../models/Like.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";


class LikesService {
    async createLikeRelationship(postId) {
        const response = await api.post('api/likes', postId)
        logger.log(response.data)
        const newLike = new Like(response.data)
        const foundPost = AppState.posts.find(post => post.id == postId.postId)
        foundPost.likeCount++
        foundPost.isLike = true
        return newLike
    }
    async deleteLikeRelationship(postId) {
        throw new Error('Method not implemented.');
    }

}

export const likesService = new LikesService()