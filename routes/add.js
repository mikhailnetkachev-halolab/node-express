const { Router } = require("express");
const router = Router();
const Course = require("../models/course");

router.get("/", (request, response) => {
  response.render("add", {
    title: "Add Course",
    isAdd: true,
  });
});

router.post("/", async (request, response) => {
  const course = new Course({
    title: request.body.title,
    price: request.body.price,
    image: request.body.image,
  });
  await course.save();

  response.redirect("/courses");
});

module.exports = router;
