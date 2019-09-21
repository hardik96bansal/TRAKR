const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const UserSchema = new Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    mobileNumber : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String
    },
    associationId : {
        type : ObjectId
    },
    userType : {
        type : String
    }
})

module.exports = mongoose.model('User', UserSchema)