import mongoose from 'mongoose';

const { Schema } = mongoose;

const InterestSchema = new Schema({
    tag: {
        type: String,
        enum: ['Programming', 'UI/UX', 'Machine Learning', 'Artificial Intelligence', 'Data Science', 'Web Development', 'Mobile Development', 'Cloud Computing', 'Cybersecurity', 'DevOps'],
        required: true
    },
    expertise: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
});

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String, // Make sure to hash passwords before storing them
    interests: [InterestSchema], // An array of interests
    // Other fields as necessary...
});

const User = mongoose.model('User', UserSchema);

export default User;
