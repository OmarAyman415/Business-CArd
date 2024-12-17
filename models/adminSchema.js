const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
        required: [true, 'Please provide us your name'],
        unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide us your password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
});

//Fire a function after doc saved to database
AdminSchema.post('save', (doc, next) => {
  console.log('New User was Created', doc);
  next();
});

//Fire a function Before doc saved to database
AdminSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login Admin
AdminSchema.statics.login = async function (username, password) {
  const admin = await this.findOne({ username: username });
  if (admin) {
    //after the user has been found in database check the password
    const auth = await bcrypt.compare(password, admin.password);
    if (auth) {
      return admin;
    }
    throw Error('Incorrect Password');
  }
  throw Error('Incorrect username');
};

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
