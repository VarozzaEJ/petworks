import { Schema } from "mongoose";

export const PostSchema = new Schema(
  {
    creatorId: { type: Schema.ObjectId, required: true },
    petTags: { type: Schema.ObjectId, required: true },
    body: { type: String, minLength: 1, maxLength: 300 },
    imgUrl: { type: String, minLength: 1, maxLength: 1000 },
  }, { timestamps: true, toJSON: { virtuals: true } })


