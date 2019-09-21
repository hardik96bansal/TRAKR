const Parent = require('../models/parent.model')

exports.createParent = (parentData) => {
    const newParent = new Parent(parentData)
    return newParent.save()
}

exports.deleteById = (parentId) => {
    return new Promise((resolve, reject) => {
        Parent.deleteOne({_id : parentId }, (err) => {
            if(err) reject(err)
            else resolve(err)
        })
    })
}