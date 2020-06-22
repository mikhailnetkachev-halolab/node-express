const { v4: uuid } = require("uuid");
const fs = require("fs");
const path = require("path");
const coursesPath = path.join(__dirname, "..", "data", "courses.json");

class Course {
  constructor({ title, price, image }) {
    this.title = title;
    this.price = price;
    this.image = image;
    this.id = uuid();
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(coursesPath, "utf-8", (error, data) => {
        if (error) reject(error);

        resolve(JSON.parse(data));
      });
    });
  }

  static async getById(id) {
    const courses = await Course.getAll();
    const course = courses.find((item) => item.id === id);

    return course;
  }

  static async update(course) {
    const courses = await Course.getAll();

    const index = courses.findIndex((item) => item.id === course.id);
    courses[index] = course;

    return new Promise((resolve, reject) => {
      fs.writeFile(coursesPath, JSON.stringify(courses), (error) => {
        if (error) reject(error);

        resolve();
      });
    });
  }

  async save() {
    const courses = await Course.getAll();
    courses.push(this.toJSON());

    console.log("courses: ", courses);

    return new Promise((resolve, reject) => {
      fs.writeFile(coursesPath, JSON.stringify(courses), (error) => {
        if (error) reject(error);

        resolve();
      });
    });
  }

  toJSON() {
    return {
      title: this.title,
      price: this.price,
      image: this.image,
      id: this.id,
    };
  }
}

module.exports = Course;
