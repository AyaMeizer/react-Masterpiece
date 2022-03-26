const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema =  Schema({
    name: {type: String , required: true , index: { unique: true }},
    age: {type: Number , required: true , index: { unique: true }},
    email: {type: String , required: true , index: { unique: true }}

});

const User = mongoose.model('User', UserSchema);
module.exports = User;
