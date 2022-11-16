module.exports = app => {
    const students = require("../controllers/student.controller.js");
  
    const router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", students.create);
  
    // Retrieve all students
    router.get("/", students.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", students.findById);
  
    // Update a Tutorial with id
    router.put("/:id", students.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", students.delete);
  
    app.use('/api/students', router);
  };