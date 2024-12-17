let Express = require('express');
let Router = Express.Router();
let User = require('../models/userSchema');
let { requireAuth, checkSameUser } = require('../middleware/authMiddleware');

Router.get('/userProfile/:id', requireAuth, checkSameUser, (req, res) => {
  let userId = req.params.id;
  req.body.userId = userId;

  User.findById(userId)
    .then((user) => {
      res.render('userProfile', { user: user });
    })
    .catch((err) => {
      console.log(err);
    });
});

Router.put('/userProfile/edit/:id', (req, res) => {
  let userId = req.params.id;

  let profileImageName;
  let coverImageName;
  console.log(req.files)
  // Save Images on the Server
  if (req.files) {
    let files = req.files;
    console.log(files)
    if (files.profileImage) {

      profileImage = files.profileImage;
      
      profileImageType = profileImage.name.split('.').slice(-1);
      profileImage.mv(
        `./public/uploads/profile/${userId}.${profileImageType}`,
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
      
      profileImageName = `${userId}.${profileImageType}`;

      req.body.profileImage = profileImageName;
    }
    if (files.coverImage) {
      coverImage = files.coverImage;
      coverImageType = coverImage.name.split('.').slice(-1);
      coverImage.mv(
        `./public/uploads/cover/${userId}.${coverImageType}`,
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
      coverImageName = `${userId}.${coverImageType}`;
      req.body.coverImage = coverImageName;
    }
  }


  let user = new User(req.body);
  

  User.findByIdAndUpdate(userId, req.body)
    .then((result) => {
      res.redirect(`/userProfile/${userId}`);
    })
    .catch((err) => {
      console.log(err);
    });
});



module.exports = Router;
