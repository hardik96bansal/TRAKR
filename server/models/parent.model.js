const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const ParentSchema = new Schema({
    userId : {
        type : ObjectId,
        //required : true,
        ref : 'Users'
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    }
    // ,
    // kids : [{
    //     type : ObjectId,
    //     ref : 'Kids'
    // }]
})

module.exports = mongoose.model('parent', ParentSchema);