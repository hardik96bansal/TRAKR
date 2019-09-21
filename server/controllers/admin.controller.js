const crypto = require('crypto')

const UserType = require('../enums/userType.enum')
const Config = require('../common/config')
const UserDbOpers = require('../dbOpers/user.dbOpers')
const ParentDbOpers = require('../dbOpers/parent.dbOpers')

const jwtKey = Config.jwtKey

exports.adminCheck = (req,res,next) => {
    const bearer = req.headers['authorization'].split('Bearer ');
    const userDetails = jwt.verify(bearer[1], jwtKey);
    if(userDetails.userType == UserType.ADMIN){
        next();
    }
    else{
        res.status(403).send('Access Denied')
    }
}

exports.createParent = (req,res) => {
    if(req.body.password === undefined){
        req.body.password = req.body.firstName.substr(0,3).toLowerCase() + req.body.lastName.substr(0,3).toLowerCase() + req.body.mobileNumber.substr(7,10);
    }
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');
    req.body.password = salt + '$' + hash;
    const newUser = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        password : req.body.password,
        mobileNumber : req.body.mobileNumber,
        userType : UserType.PARENT
    }

    var tempUser, tempParent;

    UserDbOpers.createUser(newUser)
        .then((createdUser) => {
            tempUser = createdUser;
            const newParent = {
                userId : createdUser._id,
                firstName : createdUser.firstName,
                lastName : createdUser.lastName,
                associationId : ''
            }
            return ParentDbOpers.createParent(newParent)    
        })
        .then((createdParent) => {
            tempParent = createdParent
            return UserDbOpers.updateAssociationId(tempUser._id, createdParent._id)
        })
        .then(() => {
            res.status(201).send('Parent Created')
        })
        .catch((err) => {
            if(tempUser != undefined){
                UserDbOpers.deleteById(tempUser._id)
            }
            if(tempParent != undefined){
                ParentDbOpers.deleteById(this.createParent._id)
            }
            console.log('err',err)
            res.status(500).send('Unable to create Parent')
        })


}