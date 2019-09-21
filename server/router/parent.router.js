const ParentController = require('../controllers/parent.controller')

exports.routerConfig = (app) => {
    app.post('/parent', [
        ParentController.createParent
    ])
}