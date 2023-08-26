import mongoose from 'mongoose';

const { Schema } = mongoose;

const CommentSchema = new Schema({
    content: String,
    author: { type: mongoose.Schema.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

const QuestionPostSchema = new Schema({
    title: String,
    content: String,
    subContentOptional: String,
    tags:  String,
    author: { type: mongoose.Schema.ObjectId, ref: 'User' },
    comments: [CommentSchema],
    createdAt: { type: Date, default: Date.now }
});

const QuestionPost = mongoose.model('QuestionPost', QuestionPostSchema);

export default QuestionPost;
