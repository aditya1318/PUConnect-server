import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

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
    email: {
        type: String,
        required: [true, 'Please provide your email address'],
        validate: [validator.isEmail, 'Invalid email address'],
        unique: true
      },
      password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [8, 'Password must be atleast 8 characters long'],
        trim: true,
        select: false
      },// Make sure to hash passwords before storing them
    interests: [InterestSchema], // An array of interests
    // Other fields as necessary...
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
  });



  UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, +process.env.BCRYPT_SALT);
    next();
  });
  
  // Instance method to check password
  UserSchema.methods.checkPassword = function (triedPassword) {
    return bcrypt.compare(triedPassword, this.password);
  };

  export default mongoose.model('User', UserSchema);
