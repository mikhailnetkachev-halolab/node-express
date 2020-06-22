const path = require("path");
const fs = require("fs");

const cardPath = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "card.json"
);

class Card {
  static async add(course) {
    const card = await Card.fetch();

    const index = card.courses.findIndex((item) => item.id === course.id);
    const candidate = card.courses[index];

    if (candidate) {
      candidate.count++;
      card.courses[index] = candidate;
    } else {
      course.count = 1;
      card.courses.push(course);
    }

    card.price += +course.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(cardPath, JSON.stringify(card), (error) => {
        if (error) reject(error);

        resolve();
      });
    });
  }

  static async remove(id) {
    const card = await Card.fetch();
    const index = card.courses.findIndex((item) => item.id === id);
    const course = card.courses[index];

    if (course.count === 1) {
      card.courses = card.courses.filter((item) => item.id !== id);
    } else {
      card.courses[index].count--;
    }

    card.price -= course.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(cardPath, JSON.stringify(card), (error) => {
        if (error) reject(error);

        resolve(card);
      });
    });
  }

  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(cardPath, "utf-8", (error, data) => {
        if (error) reject(error);

        resolve(JSON.parse(data));
      });
    });
  }
}

module.exports = Card;
