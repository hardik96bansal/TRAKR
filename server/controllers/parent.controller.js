const ParentDbOpers = require('../dbOpers/parent.dbOpers')

exports.createParent = (req, res) => {
    const newParent = {
        firstName : req.body.firstName,
        lastName : req.body.lastName
    }

    ParentDbOpers.createParent(newParent)
        .then((result) => {
            res.status(200).send(result)
        })
        .catch((err) => {
            res.status(400).send({err})
        })
    



}