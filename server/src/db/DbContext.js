import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { PetSchema } from '../models/Pet.js';
import { PostSchema } from '../models/Post.js';
import { CommentSchema } from '../models/Comment.js';


class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Posts = mongoose.model('Post', PostSchema);
  Pets = mongoose.model('Pet', PetSchema)

  Comments = mongoose.model('Comment', CommentSchema)
}

export const dbContext = new DbContext()
