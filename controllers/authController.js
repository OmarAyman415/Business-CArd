const User = require('../models/userSchema');
const Admin = require('../models/adminSchema');
const jwt = require('jsonwebtoken');

//handle Error
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { emailAddress: '', password: '' };

  // Incorrect Email
  if (err.message === 'Incorrect Email') {
    errors.emailAddress = 'That email not registered';
  }
  // Incorrect password
  if (err.message === 'Incorrect Password') {
    errors.password = 'The password is incorrect';
  }

  // Duplicate Error
  if (err.code === 11000) {
    errors.emailAddress = 'This Email Address already exists';
    return errors;
  }

  //Validation Errors

  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const handleAdminError = (err) => {
  console.log(err.message, err.code);
  let errors = { username: '', password: '' };

  // Incorrect Email
  if (err.message === 'Incorrect Username') {
    errors.username = 'That email not registered';
  }
  // Incorrect password
  if (err.message === 'Incorrect Password') {
    errors.password = 'The password is incorrect';
  }

  //Validation Errors

  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

//Create Token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.MY_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signupGet = (req, res, next) => {
  res.render('signup');
};

module.exports.loginGet = (req, res, next) => {
  res.render('login');
};

module.exports.signupPost = async (req, res, next) => {
  let { name, password, emailAddress } = req.body;
  try {
    //Create user in Database
    const user = await User.create({ name, emailAddress, password });

    //Create User Token for 3 days
    const token = createToken(user._id);

    //Send The User his token
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.loginPost = async (req, res, next) => {
  let { emailAddress, password } = req.body;
  try {
    const user = await User.login(emailAddress, password);

    //Create User Token for 3 days
    const token = createToken(user._id);

    //Send The User his token
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(200).json({ user: user._id });
  } catch (err) {
    let errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.logoutGet = (req, res, next) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};

// Admin Requests

module.exports.adminLoginGet = (req, res, next) => {
  res.render('adminLogin');
};
module.exports.adminLoginPost = async (req, res, next) => {
  let { username, password } = req.body;
  try {
    const admin = await Admin.login(username, password);

    //Create Admin Token for 3 days
    const token = createToken(admin._id);

    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

    let users;
    User.find()
      .then((result) => {
        users = result;
        res.status(200).json({ admin: admin._id, lol: 'ahmed', users: result });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    let errors = handleAdminError(error);
    res.status(400).json({ errors });
  }
};

module.exports.adminSignupPost = async (req, res, next) => {
  let { username, password } = req.body;
  try {
    //Create user in Database
    const admin = await Admin.create({ username, password });
    res.status(201).json({ admin: admin._id });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports.signupUser = async (req, res) => {
  let { name, password, emailAddress } = req.body;

  //Create user in Database
  const user = await User.create({ name, emailAddress, password });
  User.find()
    .then((result) => {
      res.render('admin', { User: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.adminDeleteUser = async (req, res) => {
  console.log(req.body.userId)
  userId = req.body.userId;
  User.findByIdAndDelete(userId)
    .then((result) => {
      User.find()
        .then((result) => {
          res.render('admin', { User: result });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });

};

module.exports.adminEditUser = async (req, res) => {
  let { name, phone, userId } = req.body
  let userData = {name, phone}
  console.log(userData)/
  User.findByIdAndUpdate(userId, userData)
  .then((result) => {
    User.find()
        .then((result) => {
          res.render('admin', { User: result });
        })
        .catch((err) => {
          console.log(err);
        });
  })
  .catch((err) => {
    console.log(err);
  });
 }
