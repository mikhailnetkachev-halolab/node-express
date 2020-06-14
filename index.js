const express = require("express");
const exphb = require("express-handlebars");

const homeRoute = require("./routes/home");
const coursesRoute = require("./routes/courses");
const addRoute = require("./routes/add");

const PORT = process.env.port || 3000;
const URLS = {
  HOME: "/",
  COURSES: "/courses",
  ADD: "/add",
};

const app = express();
const hbs = exphb.create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(URLS.HOME, homeRoute);
app.use(URLS.COURSES, coursesRoute);
app.use(URLS.ADD, addRoute);

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}`);
});
