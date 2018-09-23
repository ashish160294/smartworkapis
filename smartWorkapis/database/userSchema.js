import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
    UserName: String,
    admin: Boolean,
    password: String,
    Empid: String,
    Email: String,
    MObile: String
},
{
    versionKey: false
});
var userModel = mongoose.model('User', UserSchema );
export {
    userModel
};