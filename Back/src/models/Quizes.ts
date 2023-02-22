import mongoose, { AnyExpression, AnyObject } from "mongoose";
const Schema = mongoose.Schema;


const Quiz = new Schema(
    {
        name: String,
        questions: [{
            answerTitle: String,
            correct: Boolean
        }],
        popularity: {
            type: Number,
            default: 0,
        },
        private: Boolean,
        image: { type: Schema.Types.ObjectId, ref: 'StorageModel' },
        author: { type: Schema.Types.ObjectId, ref: 'UserModel' },
        points: [{
            user:  { type: Schema.Types.ObjectId, ref: 'StorageModel' },
            points: Number
        }],
    },
    {
        timestamps: true, //Todo CreatedAt, updatedAt,
        versionKey: false
    }
);

export const QuizModel = mongoose.model('QuizModel', Quiz);