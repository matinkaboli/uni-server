const { JwtSrv } = require("../services");
const { Course } = require("../models/course");
const { Teacher } = require("../models/teacher");

class AdminCtrl {
  static async login(req, res) {
    const { username, password } = req.body;

    if (username === "admin" && password === "admin") {
      const jwt = JwtSrv.sign("adminadmin");

      res.json({
        jwt,
      });
    }

    res.status(400).json({
      error: "Wrong credentials",
    });
  }

  static async addTeacher(req, res) {
    const auth = req.header("Authorization");

    if (JwtSrv.verify(auth) !== "adminadmin") {
      return res.status(403).json({
        error: "Forbidden. Key is incorrect.",
      });
    }

    const { body } = req;

    if (!body.teacherName) {
      return res.status(400).json({
        error: "needs teacherName",
      });
    }

    const teacher = await Teacher.create({
      name: body.teacherName,
    });

    return res.json({
      teacher,
    });
  }

  static async getTeachers(req, res) {
    const auth = req.header("Authorization");

    if (JwtSrv.verify(auth) !== "adminadmin") {
      return res.status(403).json({
        error: "Forbidden. Key is incorrect.",
      });
    }

    const teachers = await Teacher.find();

    return res.json({
      teachers,
    });
  }

  static async removeTeacher(req, res) {
    const auth = req.header("Authorization");

    if (JwtSrv.verify(auth) !== "adminadmin") {
      return res.status(403).json({
        error: "Forbidden. Key is incorrect.",
      });
    }

    const { _id } = req.params;

    const { deletedCount } = await Teacher.deleteOne({ _id });

    if (deletedCount === 0) {
      return res.status(400).json({
        error: "Teacher was not deleted.",
      });
    }

    return res.json({
      message: "Teacher deleted",
    });
  }

  static async addCourse(req, res) {
    const auth = req.header("Authorization");

    if (JwtSrv.verify(auth) !== "adminadmin") {
      return res.status(403).json({
        error: "Forbidden. Key is incorrect.",
      });
    }

    const { vahed, name, teacherId } = req.body;

    if (!vahed || !name || !teacherId) {
      return res.status(400).json({
        error: "API needs name, teacherId and, vahed",
      });
    }

    const course = await Course.create({
      name,
      vahed,
      teacher: teacherId,
    });

    return res.json({
      course,
    });
  }

  static async getCourses(req, res) {
    const auth = req.header("Authorization");

    if (JwtSrv.verify(auth) !== "adminadmin") {
      return res.status(403).json({
        error: "Forbidden. Key is incorrect.",
      });
    }

    const courses = await Course.find();

    return res.json({
      courses,
    });
  }

  static async removeCourse(req, res) {
    const auth = req.header("Authorization");

    if (JwtSrv.verify(auth) !== "adminadmin") {
      return res.status(403).json({
        error: "Forbidden. Key is incorrect.",
      });
    }

    const { _id } = req.params;

    const { deletedCount } = await Course.deleteOne({ _id });

    if (deletedCount === 0) {
      return res.status(400).json({
        error: "Course was not deleted.",
      });
    }

    return res.json({
      message: "Course deleted",
    });
  }
}

module.exports = {
  AdminCtrl,
};
