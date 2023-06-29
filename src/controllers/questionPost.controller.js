import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import { createOne, getAll, getOne, updateOne, deleteOne } from '../utils/handlerFactory.js';
import QuestionPost from '../models/questionsPost.models.js'; // Assuming you have a questionPostModel.js file

export const createQuestionPost = createOne(QuestionPost);

export const getAllQuestionPosts = getAll(QuestionPost,  { path: 'comments' });

export const getQuestionPost = getOne(QuestionPost, { path: 'comments' }); // This will populate the comments

export const updateQuestionPost = updateOne(QuestionPost);

export const deleteQuestionPost = deleteOne(QuestionPost);

export const addCommentToQuestionPost = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { content, author } = req.body;

    const questionPost = await QuestionPost.findById(id);
    if (!questionPost) {
        return next(new AppError('No document found with that ID', 404));
    }

    const comment = { content, author };
    questionPost.comments.push(comment);

    await questionPost.save();

    res.status(200).json({
        status: 'success',
        data: {
            questionPost
        }
    });
});

