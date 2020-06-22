const { Router } = require("express");
const router = Router();
const Course = require("../models/course");
const Card = require("../models/card");

router.get("/", async (request, response) => {
  const card = await Card.fetch();

  response.render("card", {
    title: "Card",
    isCard: true,
    courses: card.courses,
    price: card.price,
  });
});

router.post("/add", async (request, response) => {
  const course = await Course.getById(request.body.id);
  await Card.add(course);

  response.redirect("/card");
});

router.delete("/remove/:id", async (request, response) => {
  const card = await Card.remove(request.params.id);
  response.status(200).json(card);
});

module.exports = router;
