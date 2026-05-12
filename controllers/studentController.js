const db = require("../config/db");

exports.getStudents = (req, res) => {
  db.query("SELECT * FROM students", (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};

exports.createStudent = (req, res) => {
  const { fullname, email, course } = req.body;

  const sql =
    "INSERT INTO students(fullname,email,course) VALUES(?,?,?)";

  db.query(sql, [fullname, email, course], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({
      message: "Student added"
    });
  });
};

exports.updateStudent = (req, res) => {
  const { fullname, email, course } = req.body;

  const sql =
    "UPDATE students SET fullname=?, email=?, course=? WHERE id=?";

  db.query(
    sql,
    [fullname, email, course, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Student updated"
      });
    }
  );
};

exports.deleteStudent = (req, res) => {
  db.query(
    "DELETE FROM students WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Student deleted"
      });
    }
  );
};