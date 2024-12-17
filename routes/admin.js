let Express = require('express');
let Router = Express.Router();
let User = require('../models/userSchema');
let { requireAdminAuth, checkAdmin } = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');
Router.get('/admin', requireAdminAuth, checkAdmin, (req, res) => {
  User.find()
    .then((result) => {
      res.render("admin", { User: result });
    })
    .catch((err) => {
      console.log(err);
    });
});
Router.post('/signupUser', requireAdminAuth, checkAdmin, authController.signupUser)
module.exports = Router;
