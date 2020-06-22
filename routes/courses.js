const { Router } = require("express");
const router = Router();
const Course = require("../models/course");

router.get("/", async (request, response) => {
  const courses = await Course.getAll();

  response.render("courses", {
    title: "Courses",
    isCourses: true,
    courses,
  });
});

router.get("/:id", async (request, response) => {
  const course = await Course.getById(request.params.id);

  response.render("course", {
    layout: "empty",
    title: `Course | ${course.title}`,
    course,
  });
});

router.get("/:id/edit", async (request, response) => {
  if (!request.query.allow) {
    response.redirect("/");
    return;
  }

  const course = await Course.getById(request.params.id);

  response.render("course-edit", {
    title: `Edit ${course.title}`,
    course,
  });
});

router.post("/edit", async (request, response) => {
  await Course.update(request.body);
  response.redirect("/courses");
});

module.exports = router;
