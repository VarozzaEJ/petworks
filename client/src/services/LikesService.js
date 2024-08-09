import { Like } from "../models/Like"
import { api } from "./AxiosService"

class LikesService {

  async getPostLikes(postId) {
    const response = await api.get('api/likes', postId)
    const postLikes = response.data.map((like) => new Like(like))
    return postLikes
  }
}

export const likesService = new LikesService()