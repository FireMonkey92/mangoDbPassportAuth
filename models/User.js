const mongoose =  require('mongoose');
//Schema Skelton
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
//create a model
const User = mongoose.model('User', UserSchema);
//export the model to use
module.exports= User;
