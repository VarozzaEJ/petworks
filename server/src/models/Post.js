import { Schema } from "mongoose";

export const PostSchema = new Schema(
  {
    creatorId: { type: Schema.ObjectId, required: true },
    petTags: { type: Schema.ObjectId, },
    body: { type: String, minLength: 1, maxLength: 300, required: true },
    imgUrl: { type: String, minLength: 1, maxLength: 1000 },
  }, { timestamps: true, toJSON: { virtuals: true } })


PostSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true,
})

PostSchema.virtual('comments', {
  localField: '_id',
  ref: 'Comment',
  foreignField: 'postId',
})

PostSchema.virtual('pets',
  {
    localField: 'petTags',
    ref: 'Pet',
    foreignField: '_id',
  })

PostSchema.virtual('likeCount',
  {
    localField: '_id',
    ref: 'Like',
    foreignField: 'postId',
    count: true,
  }
)

PostSchema.virtual('commentCount', {
  localField: '_id',
  foreignField: 'postId',
  ref: 'Comment',
  count: true,
})
