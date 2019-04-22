const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/keys").mongoURI;
const passport = require("passport");
const path = require("path");
//importing routes
const posts = require("./routes/posts");
const users = require("./routes/user");
const profile = require("./routes/profile");

const app = express();

//use bodyparser and cors
app.use(bodyParser.json({ limit: "200mb" }));
app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));
app.use(cors());

mongoose
  .connect(db)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(err => console.log(err));
//passport
app.use(passport.initialize());
require("./config/passport")(passport);
//using routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("server is running at port 5000");
});
