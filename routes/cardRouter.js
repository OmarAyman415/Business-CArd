let Express = require("express");
let Router = Express.Router();
let User = require("../models/userSchema");
let vCardsJS = require("vcards-js");
let vCard = vCardsJS();

Router.get("/card/:id", (req, res) => {
  let userId = req.params.id;
  User.findById(userId)
    .then((user) => {
      vCard.firstName = user.name;
      vCard.organization = user.CompanyName;
      vCard.email = user.emailAddress;
      vCard.cellPhone = user.phone;
      vCard.workUrl = user.linkedin;
      vCard.title = user.bio;
      vCard.photo.embedFromFile(
        `./public/uploads/profile/${user.profileImage}`
      );
      vCard.saveToFile(`./public/vcard/${user.id}.vcf`);
      res.render("card", { user: user, vCard: vCard });
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = Router;
