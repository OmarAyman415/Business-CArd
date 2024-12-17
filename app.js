const express = require("express");
let bodyParser = require("body-parser");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
let cardRouter = require("./routes/cardRouter");
const methodOverride = require("method-override");
let userProfileRouter = require("./routes/userProfileRoute");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/authRoute");
let messageRoute = require("./routes/messageRoute");
let admin = require("./routes/admin");
let messageTableRoute = require("./routes/messageTableRoute");
require("dotenv").config();
let uploadFiles = require("express-fileupload");
let DBConnection = require("./config/DB")
let {
  requireAuth,
  requireAdminAuth,
  checkUser,
  checkAdmin,
  checkSameUser,
} = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT || 3001;

//Configure LiveReloadServer
const path = require("path");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(connectLivereload());
app.use(cookieParser());
app.use(uploadFiles());

//liveReloadServer
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// Database Connection
DBConnection(app,PORT)

app.get("*", checkUser);

//Login page
app.get("/", (req, res) => {
  res.render("login");
});

// User Profile page
app.get("/profile", (req, res) => {
  res.render("userProfile");
});


app.get("/messageTable", requireAuth, checkSameUser, (req, res) => {
  res.render("messageTable");
});

app.use(authRoute);~
app.use("", userProfileRouter);
app.use("", cardRouter);
app.use(messageRoute);
app.use(messageTableRoute);
app.use(admin);

//Cookies

//Page Not Found
// app.use((req, res) => {
//   res.status(404).send("Sorry can't find That!");
// });
