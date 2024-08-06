import { Schema } from "mongoose";


export const likeSchema = new Schema({

    accountId: { type: Schema.ObjectId, ref: 'Account', required: true },
    postId: { type: Schema.ObjectId, ref: 'Post', required: true },

}, { timestamps: true, toJSON: { virtuals: true } })

likeSchema.virtual('post', {
    localField: 'postId',
    ref: 'Post',
    foreignField: '_id',
    justOne: true
})

likeSchema.virtual('account', {
    localField: 'accountId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true,
})