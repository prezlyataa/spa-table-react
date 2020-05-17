const express = require("express");
const path = require("path");
const Employee = require("./models/employee");
const router = express.Router();

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

router.post("/employees", (req, res, next) => {
    Employee.create(req.body, (err, employee) => {
        if (err) return next(err);
        res.json(employees);
    });
});

module.exports = router;