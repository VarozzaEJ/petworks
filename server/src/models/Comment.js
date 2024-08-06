import { Schema } from "mongoose";


export const CommentSchema = new Schema({
    creatorId: { type: Schema.ObjectId, ref: 'Account', required: true },
    postId: { type: Schema.ObjectId, ref: 'Post' },
    body: { type: String, minlength: 1, maxlength: 300, required: true },

}, { timestamps: true, toJSON: { virtuals: true } })

CommentSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true,
})


// CommentSchema.virtual('likeCount', {
//     localField: '_id',
//     ref: 'Post',
//     count: true,
//     foreignField: 'commentId'
// })

// CommentSchema.virtual('postId', {
//     localField: 'postId',
//     ref: 'Post',
//     foreignField: '_id',
//     justOne: true,
// })