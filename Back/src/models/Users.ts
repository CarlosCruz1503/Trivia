import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true // `email` must be unique
    },
    password: { type: String, select: false },
    image: { type: Schema.Types.ObjectId, ref: 'StorageModel' },
});


export const UserModel = mongoose.model('UserModel', User);
