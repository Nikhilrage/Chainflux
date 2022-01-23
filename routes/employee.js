const express = require('express')
const mongoose = require('mongoose')
const employee = express.Router()
const document = require("../models/adminschema.js")
employee.post("/view", async (req, res) => {
    const getDocument = await document.findOne({ "employeeId": req.body.employeeId })
    res.json(getDocument)
})

module.exports = employee