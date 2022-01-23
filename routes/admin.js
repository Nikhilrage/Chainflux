const express = require('express')
const mongoose = require('mongoose')
const { find, db } = require('../models/adminschema.js')
const admin = express.Router()
const document = require("../models/adminschema.js")

// create route
admin.post("/create", async (req, res) => {
    const employeeId = req.body.employeeId

    const validateEmployeeId = await document.find({ "employeeId": employeeId }).count();
    if (validateEmployeeId > 0) {
        res.json(validateEmployeeId)
    }
    else if (validateEmployeeId == 0) {
        const createDocument = new document({
            employeeId: req.body.employeeId,
            employeeName: req.body.employeeName,
            hardware: req.body.hardware.map(function (value) {
                return {
                    hardwareName: value.hardwareName,
                    hardwareCost: value.hardwareCost,
                    serialNumberOfHardware: value.serialNumberOfHardware
                };
            })
        })
        const documentSave = await createDocument.save()
        res.json(validateEmployeeId)
    }
})
//View
admin.post("/view", async (req, res) => {
    const getDocument = await document.findOne({ "employeeId": req.body.employeeId })
    res.json(getDocument)
})

//adding hardware
admin.put("/insert", async (req, res) => {
    const updateDocument = await document.updateOne({ "employeeId": req.body.employeeId }, {
        $push: {
            hardware: req.body.hardware.map(function (value) {
                return {
                    hardwareName: value.hardwareName,
                    hardwareCost: value.hardwareCost,
                    serialNumberOfHardware: value.serialNumberOfHardware,
                    incurredCost: value.incurredCost
                };
            })
        }
    })
    const getDocument = await document.find({ "employeeId": req.body.employeeId })
    res.json(getDocument)
})

//adding incurred cost
admin.put("/incurredcost", async (req, res) => {
  
  //fetching data from body
    const employeeId = req.body.employeeId
    const findHardware = req.body.hardwareIncurredCost.map((value) => {
        return {
            hardwareName:value.hardwareName,
            incurredCost:value.incurredCost
        }
    })
    
    const updateDocument = await document.updateOne({ "employeeId": employeeId }, {
        $push: {
            hardwareIncurredCost:findHardware
        }
    })
    const getDocument = await document.find({ "employeeId": req.body.employeeId })

    res.json(getDocument)
})

// Delete
admin.put('/delete', async (req, res) => {
    const hardware = req.body.hardware.map((value) => {
        return value.hardwareName
    })
    //delete query
    const getDocument = await document.updateOne({ "employeeId": req.body.employeeId }, { $pull: { "hardware": { "hardwareName": hardware } } })

   res.json(getDocument)
})

module.exports = admin


