import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { PetSchema } from '../models/Pet.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Pets = mongoose.model('Pet', PetSchema)
}

export const dbContext = new DbContext()
