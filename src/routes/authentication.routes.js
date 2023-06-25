import express from 'express';
import * as authController from '../controllers/auth.controller.js';
import passport from 'passport';

const router = express.Router();

router.get('/login/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/login/google/callback', authController.googleLogin);

router.get('/logout', authController.logout);

router.get('/current-user', authController.getCurrentUser);

export default router;