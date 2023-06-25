import express from 'express';
import * as questionPostController from '../controllers/questionPost.controller.js';
import * as authController from '../controllers/auth.controller.js'

const router = express.Router();


router.route('/')
    .get(questionPostController.getAllQuestionPosts)
    .post(questionPostController.createQuestionPost);

router.route('/:id')
    .get(questionPostController.getQuestionPost)
    .patch(questionPostController.updateQuestionPost)
    .delete(questionPostController.deleteQuestionPost);


router.route('/:id/comments').post(questionPostController.addCommentToQuestionPost);

export default router;
