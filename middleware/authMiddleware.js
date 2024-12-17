const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const Admin = require('../models/adminSchema');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // Check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.MY_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

const requireAdminAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // Check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.MY_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/adminLogin');
      } else {
        next();
      }
    });
  } else {
    res.redirect('/adminLogin');
  }
};

//Check Same User
const checkSameUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.MY_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        let requestedId = req.params.id;
        let user = await User.findById(decodedToken.id);

        if (user._id != requestedId) {
          res.locals.user = null;
          res.redirect('/login');
        } else {
          res.locals.user = user;
          next();
        }
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

//Check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.MY_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};
//Check current admin
const checkAdmin = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.MY_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.admin = null;
        next();
      } else {
        let admin = await Admin.findById(decodedToken.id);
        if (!admin  || (admin._id != decodedToken.id)) {
          res.locals.user = null;
          res.redirect('/login');
        } else {
          res.locals.admin = admin;
          next();
        }
      }
    });
  } else {
    res.locals.admin = null;
    next();
  }
};

module.exports = {
  requireAuth,
  checkUser,
  checkSameUser,
  checkAdmin,
  requireAdminAuth,
};
