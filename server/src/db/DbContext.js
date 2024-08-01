import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { PetSchema } from '../models/Pet.js';
import { PostSchema } from '../models/Post.js';


class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Posts = mongoose.model('Post', PostSchema);
  Pets = mongoose.model('Pet', PetSchema)
}

export const dbContext = new DbContext()
