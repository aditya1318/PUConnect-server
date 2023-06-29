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



schema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, +process.env.BCRYPT_SALT);
    next();
  });
  
  // Instance method to check password
  schema.methods.checkPassword = function (triedPassword) {
    return bcrypt.compare(triedPassword, this.password);
  };
  
  export default mongoose.model('User', UserSchema);
