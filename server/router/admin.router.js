const AdminController = require('../controllers/admin.controller')

exports.routerConfig = (app) => {
    app.post('/parent', [
        AdminController.createParent
    ])
}