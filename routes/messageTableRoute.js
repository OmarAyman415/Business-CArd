const Express = require('express');
const Router = Express.Router();
const message = require('../models/messageSchema');
let {requireAuth,checkUser, checkSameUser} = require('../middleware/authMiddleware')

Router.get('/messageTable/:id',requireAuth,checkSameUser, (req, res) => {
  let id = req.params.id;

  message
    .find({ userid: id })
    .then((result) => {
      res.render('messageTable', { message: result });
      console.log();
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = Router;
