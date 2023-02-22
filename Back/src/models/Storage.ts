import mongoose, { AnyExpression, AnyObject } from "mongoose";

const Schema = mongoose.Schema;

const Storage: any = new Schema({
    filename: String,
    url: String,
});

export const StorageModel = mongoose.model('StorageModel', Storage);