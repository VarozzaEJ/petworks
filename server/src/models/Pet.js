import { Schema } from "mongoose";


export const PetSchema = new Schema({
    ownerId: { type: Schema.ObjectId, ref: 'Account', required: true },
    name: { type: String, minlength: 1, maxlength: 50, required: true },
    bio: { type: String, minlength: 15, maxlength: 500 },
    imgUrl: { type: String, minlength: 1, maxlength: 1000, },
    file: { type: String, minlength: 1, maxlength: 1000 },
    species: { type: String, minlength: 1, maxlength: 50 },
    breed: { type: String, minlength: 1, maxlength: 50 },
    petStats: { type: Object }, //NOTE may need to define that this is an array
    birthday: { type: Date }

}, { timestamps: true, toJSON: { virtuals: true } })

PetSchema.virtual('owner', {
    localField: 'ownerId',
    ref: 'Account',
    foreignField: '_id'
})

