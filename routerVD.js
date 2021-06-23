const express = require('express')
const router = express.Router()   //express包装路由的容器
var Patients = require('./models/patients')
var Doctors = require('./models/doctors')

router.get('/getMenNum', (req, res) => {
    Patients.find({ "sex": "男" }, (err, men) => {
        if (err) {
            return res.send(false)
        }
        res.json({ menNum: men.length })
    })
})
router.get('/getWomenNum', (req, res) => {
    Patients.find({ "sex": "女" }, (err, women) => {
        if (err) {
            return res.send(false)
        }
        res.json({ womenNum: women.length })
    })
})
router.get('/outside', (req, res) => {
    Patients.find({ "diseaseType": '外科' }, (err, data) => {
        if (err) {
            return res.send(false)
        }
        res.json({ num: data.length })
    })
})
router.get('/inside', (req, res) => {
    Patients.find({ "diseaseType": '内科' }, (err, data) => {
        if (err) {
            return res.send(false)
        }
        res.json({ num: data.length })
    })
})
router.get('/women', (req, res) => {
    Patients.find({ "diseaseType": '妇科' }, (err, data) => {
        if (err) {
            return res.send(false)
        }
        res.json({ num: data.length })
    })
})
router.get('/mouth', (req, res) => {
    Patients.find({ "diseaseType": '口腔科' }, (err, data) => {
        if (err) {
            return res.send(false)
        }
        res.json({ num: data.length })
    })
})
router.get('/getPatNum', (req, res) => {
    Patients.find((err, patients) => {
        res.json({ patNum: patients.length })
    })
})
router.get('/getDocNum', (req, res) => {
    Doctors.find((err, doctors) => {
        res.json({ docNum: doctors.length })
    })
})

module.exports = router