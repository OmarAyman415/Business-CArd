let express = require('express');
let Router = express.Router();
const message = require('../models/messageSchema');
const User = require('../models/userSchema');

Router.get('/message/:id', (req, res) => {
  let userid = req.params.id;
  User.findById(userid)
    .then((user) => {
      res.render('message', { user: user });
    })
    .catch((err) => {
      console.log(err);
    });
});

Router.post('/message/:id', (req, res) => {
  let userid = req.params.id;
  let data = req.body;
  let Message = new message(req.body);
  Message.userid = userid;
  Message.save()
    .then((result) => {
      res.redirect(`/card/${userid}`);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = Router;
