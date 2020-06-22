const express = require("express");
const path = require("path");
const exphb = require("express-handlebars");

const homeRoute = require("./routes/home");
const coursesRoute = require("./routes/courses");
const addRoute = require("./routes/add");
const cardRoute = require("./routes/card");

const PORT = process.env.port || 3000;
const URLS = {
  HOME: "/",
  COURSES: "/courses",
  ADD: "/add",
  CARD: "/card",
};

const app = express();
const hbs = exphb.create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(URLS.HOME, homeRoute);
app.use(URLS.COURSES, coursesRoute);
app.use(URLS.ADD, addRoute);
app.use(URLS.CARD, cardRoute);

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}`);
});
