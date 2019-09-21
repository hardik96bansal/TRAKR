const User = require('../models/user.model')

exports.createUser = (userData) => {
    const newUser = new User(userData)
    return newUser.save()    
}

exports.updateUserType = (userId, userType) => {
    return new Promise((resolve, reject) => {
        User.findById(userId, (err, user) => {
            if(err) reject(err);
            user[userType] = userType
            user.save((err, updatedUser) => {
                if(err) reject(err);
                resolve(updatedUser)
            })
        })
    })
}

exports.updateAssociationId = (userId, associationId) => {
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(userId, {associationId : associationId}, (err,updatedUser) => {
            if(err) reject(err);
            console.log('updatedUser ', updatedUser)
            resolve(updatedUser);
        })
    })
}

exports.deleteById = (userId) => {
    return new Promise((resolve, reject) => {
        User.deleteOne({_id: userId}, (err) => {
            if(err) reject(err)
            resolve(err)
        })
    })
}