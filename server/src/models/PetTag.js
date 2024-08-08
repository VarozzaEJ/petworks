import { Schema } from "mongoose";


export const PetTagSchema = new Schema({
  petId: { type: Schema.ObjectId, ref: 'Pet', required: true },
  postId: { type: Schema.ObjectId, ref: 'Post', required: true },
  creatorId: { type: Schema.ObjectId, ref: 'Account', required: true }
}, { toJSON: { virtuals: true } })

PetTagSchema.virtual('pets', {
  localField: 'petId',
  ref: 'Pet',
  foreignField: '_id',
  justOne: true
})

PetTagSchema.virtual('posts', {
  localField: 'postId',
  ref: 'Post',
  foreignField: '_id',
  justOne: true
})