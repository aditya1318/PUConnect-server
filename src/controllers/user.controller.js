import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import { createOne, getAll, getOne, updateOne, deleteOne } from '../utils/handlerFactory.js';
import User from '../models/user.models.js'; 

export const createUser = createOne(User);

export const getAllUsers = getAll(User);

export const getUser = getOne(User, { path: 'interests' }); // This will populate the interests

export const updateUser = updateOne(User);

export const deleteUser = deleteOne(User);

export const addInterestToUser = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { tag, expertise } = req.body;

    const user = await User.findById(id);
    if (!user) {
        return next(new AppError('No document found with that ID', 404));
    }

    const interest = { tag, expertise };
    user.interests.push(interest);

    await user.save();

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});
