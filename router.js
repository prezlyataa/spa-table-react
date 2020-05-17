const express = require("express");
const path = require("path");
const Employee = require("./models/employee");
const router = express.Router();
const ObjectId = require('mongodb').ObjectID

router.all('*', (req, res, next) => {
    res
        .header('Access-Control-Allow-Origin', '*')
        .header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
        .header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

router.get('/', (req, res) => res.sendFile(path.join(__dirname + '/client/build/index.html'))); 

router.get("/employees", (req, res, next) => {
    Employee.find((err, employees) => {
        if (err) return next(err);
        res.json(employees);
    });
});

router.get("/employees:id", (req, res, next) => {
    let id = req.params.id.substr(1);
    let o_id = new ObjectId(id);

    Employee.findOne({"_id": o_id}, (err, employee) => {
        if (err) return next(err);
        res.json(employee);
    });
});

router.post("/employees", (req, res, next) => {
    Employee.create(req.body, (err, employee) => {
        if (err) return next(err);
        res.json(employee);
    });
});

router.put("/employees:id", (req, res, next) => {
    Employee.findByIdAndUpdate(req.params.id.substr(1), req.body, (err, employee) => {
        if (err) return next(err);
        res.json(employee);
    });
});
  
router.delete("/employees:id", (req, res, next) => {
    Employee.findByIdAndRemove(req.params.id.substr(1), req.body, (err, employee) => {
        if (err) return next(err);
        res.json(employee);
    });
});

module.exports = router;