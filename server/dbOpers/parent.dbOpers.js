const Parent = require('../models/parent.model')

exports.createParent = (parentData) => {
    const newParent = new Parent(parentData)
    return newParent.save()
}