const { Router } = require("express");
const router = Router();

router.get("/", (request, response) => {
  response.render("add", {
    title: "Add Course",
    isAdd: true,
  });
});

router.post("/", (request, response) => {
  console.log(request.body);
  response.redirect("/courses");
});

module.exports = router;
