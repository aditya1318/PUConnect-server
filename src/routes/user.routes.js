import express from 'express';
import * as userController from '../controllers/user.controller.js';

const router = express.Router();

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);

router.route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

router.route('/:id/interests').post(userController.addInterestToUser);

export default router;
