import * as mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: {type:String, unique: true},
    password: String,
    age: Number,
    type:String
});

export default mongoose.model('User', userSchema);
