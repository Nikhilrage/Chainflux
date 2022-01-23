const express = require('express')
const mongoose = require('mongoose')
const search = express.Router()
const document = require("../models/adminschema.js")
//show names
search.get('/names', async (req, res) => {
    const getNames = await document.find({})
    var employeeNames = ''
    for (var i = 0; i < getNames.length; i++) {
        employeeNames += getNames[i].employeeName + ";" + getNames[i].employeeId + ", "
    }
    res.json(employeeNames)
})
//cost of each person hardware
search.post('/costofhardware', async (req, res) => {
    const employeedetails = await document.find({ "employeeId": req.body.employeeId })

    employeedetails.forEach((item) => {
        const hardwareDetials = item.hardware.map((items,length) => {
            return {
                nameOfHardware:items.hardwareName,
                hardwareCost:items.hardwareCost,
                numberOfItems:length+1
            }
        })
        res.json(hardwareDetials)
    })  
})
//showing incurred costs
search.post('/incurredcostdetails', async (req, res) => {
    const employeedetails = await document.find({ "employeeId": req.body.employeeId })
    
    employeedetails.forEach((incurreditem) => {

        const incurredDetials = incurreditem.hardwareIncurredCost.map((items,length) => {
            return {
                IncurredHardwareName:items.hardwareName,
                IncurredHardwareCost:items.incurredCost
            }
        })
        res.json(incurredDetials)
    })  
})

module.exports = search