import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { PetSchema } from '../models/Pet.js';
import { PostSchema } from '../models/Post.js';
import { CommentSchema } from '../models/Comment.js';
import { likeSchema } from '../models/Like.js';


class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Posts = mongoose.model('Post', PostSchema);
  Pets = mongoose.model('Pet', PetSchema)

  Comments = mongoose.model('Comment', CommentSchema)

  Likes = mongoose.model('Like', likeSchema)
}

export const dbContext = new DbContext()
