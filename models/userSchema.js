const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide us your name"],
  },
  emailAddress: {
    type: String,
    required: [true, "Please provide your email address"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please provide us your password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },

  phone: String,
  CompanyName: String,
  bio: String,

  facebook: String,
  FBStatus: Boolean,

  instagram: String,
  InstaStatus: Boolean,

  linkedin: String,
  linkedinStatus: Boolean,

  twitter: String,
  twitterstatus: Boolean,

  profileImage: String,
  coverImage: String,
});

//Fire a function after doc saved to database
UserSchema.post("save", (doc, next) => {
  console.log("New User was Created", doc);
  next();
});
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
UserSchema.statics.login = async function (emailAddress, password) {
  const user = await this.findOne({ emailAddress: emailAddress });
  if (user) {
    //after the user has been found in database check the password
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect Password");
  }
  throw Error("Incorrect Email");
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
