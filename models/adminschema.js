const express = require('express')
const mongoose = require('mongoose')

const modelSchema = mongoose.Schema({
    employeeId:{
        type: String,
        require:true,
        unique: true
    },
    employeeName:{
        type:String,
        require:true
    },
    hardware:[{
        hardwareName:{
            type:String
        },
        serialNumberOfHardware:{
            type:String,
            require:true,
            unique: true
        },
        hardwareCost:{
            type:String,
            require:true
        }
    }],
    hardwareIncurredCost:[{
        incurredCost:{
          
        },
        hardwareName:{
            type:String
        }
    }]
})
    

module.exports=mongoose.model('employeeHardwareDetails', modelSchema)
