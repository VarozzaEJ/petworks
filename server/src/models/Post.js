import { Schema } from "mongoose";

export const PostSchema = new Schema(
  {
    creatorId: { type: Schema.ObjectId, required: true },
    petTags: { type: Schema.ObjectId, },
    body: { type: String, minLength: 1, maxLength: 300 },
    imgUrl: { type: String, minLength: 1, maxLength: 1000 },
  }, { timestamps: true, toJSON: { virtuals: true } })


PostSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true,
})

// PostSchema.virtual('commentCount', {
//   localField: '_id',
//   ref: 'Comment',
//   foreignField: 'postId',
//   count: true,
// })

PostSchema.virtual('pet',
  {
    localField: 'petTags',
    ref: 'Pet',
    foreignField: '_id',
  })

// PostSchema.virtual('likeCount',
//   {
//     localField: '_id',
//     ref: 'Like',
//     foreignField: 'postId',
//   }
// )
