import mongoose, { AnyExpression, AnyObject } from "mongoose";
const Schema = mongoose.Schema;

const Quiz = new Schema(
    {
        name: String,
        questions: [{
            questionsTitle: String,
            answers: [{
                answerTitle: String,
                correct: Boolean
            }]
        }],
        popularity: {
            type: Number,
            default: 0,
        },
        private: Boolean,
        image: { type: Schema.Types.ObjectId, ref: 'StorageModel' },
        author: String,
        points: [{
            name: String,
            pointsUser: Number
        }],
    },
    {
        timestamps: true, //Todo CreatedAt, updatedAt,
        versionKey: false
    }
);

export const QuizModel = mongoose.model('QuizModel', Quiz);