//后端路由模块
const fs = require('fs')
const express = require('express')
const router = express.Router()   //express包装路由的容器
const Patients = require('./models/patients')
const Doctors = require('./models/doctors')
const User = require('./models/user')

// 把路由挂载到router路由容器中
router.get('/index', (req, res) => {   //这个回调函数就是index.js子方法的callback
  res.sendFile(__dirname + '/views/index.html')
})
router.get('/docIndex', (req, res) => {
  res.sendFile(__dirname + '/views/docIndex.html')
})
// 获取数据库中的病人信息
router.get('/getStu', (req, res) => {
  Patients.find((err, patients) => {//这里是readFile的两个参数
    if (err) {
      return res.status(500).send('Server error')
    }
    res.send(patients)
  })
})
router.get('/getDct', (req, res) => {
  Doctors.find((err, doctors) => {
    if (err) {
      return res.status(500).send('Server error')
    }
    res.send(doctors)
  })
})
//添加
router.post('/index/create', (req, res) => {
  new Patients(req.body).save((err) => {
    if (err) {
      return res.status(500).send('添加失败')
    }
  })
})
router.post('/index/createDoctor', (req, res) => {
  new Doctors(req.body).save((err) => {
    if (err) {
      return res.status(500).send('添加失败')
    }

    res.redirect('/index#/doctors')

  })
})

//编辑病人
router.get('/index/edit', (req, res) => {
  Patients.findById(req.query.id, (err, student) => {
    if (err) {
      res.status(500).send('server error')
    }
    res.send(student)
  })
})
router.post('/index/edit', (req, res) => {
  Patients.findByIdAndUpdate(req.body.id, req.body, (err) => {
    if (err) {
      return res.status(500).send('Server error')
    }
  })
})
// 编辑医生
router.get('/index/editDct', (req, res) => {
  Doctors.findById(req.query.id, (err, doctors) => {
    if (err) {
      res.status(500).send('server error')
    }
    res.send(doctors)
  })
})
router.post('/index/editDoctor', (req, res) => {
  Doctors.findByIdAndUpdate(req.body.id, req.body, (err) => {
    if (err) {
      return res.status(500).send('Server error')
    }
    res.redirect('/index#/doctors')
  })
})

//删除
router.post('/del', (req, res) => {
  Patients.findByIdAndDelete(req.body.id, (err) => {
    if (err) {
      return res.status(500).send('Server error')
    }
    res.status(200).json({ success: true })
  })
})
router.post('/delDct', (req, res) => {
  Doctors.findByIdAndDelete(req.body.id, (err) => {
    if (err) {
      return res.status(500).send('Server error')
    }
    res.status(200).json({ success: true })
  })
})

router.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/cover.html')
})

router.post('/login', (req, res) => {
  let body = req.body
  Doctors.findOne({              //查询是否有匹配的用户名和密码
    username: body.username,
    password: body.password
  }, (err, user) => {
    if (err) {
      return res.status(500).send(false)
    }
    if (user) {
      req.session.user = user   //登录成功，通过session记录用户登录状态
      return res.status(200).json({
        err_code: 0,
        message: '登录成功'
      })
    }
    User.findOne({              //查询是否有匹配的用户名和密码
      username: body.username,
      password: body.password
    }, (err, user) => {
      if (user) {
        req.session.user = user   //登录成功，通过session记录用户登录状态
        return res.status(200).json({
          err_code: -1,
          message: '登录成功'
        })
      }
      return res.status(200).json({
        err_code: 1,
        message: '用户名或密码错误'
      })
    })
  })


})
router.post('/register', (req, res) => {
  let body = req.body
  User.findOne({
    username: body.username
  }, (err, user) => {
    if (err) {
      return res.status(500).send(false)
    }
    if (user) {
      return res.status(200).json({
        err_code: 1
      })
    }
    new User(body).save(err => {
      if (err)
        return res.status(500)

      req.session.user = body   //注册成功 把数据作为session中的user
      return res.status(200).json({
        err_code: 0
      })
    })

  })
})

router.get('/getUser', (req, res) => {  //给首页vue文件传session数据
  res.send(req.session.user)
})

router.get('/logout', (req, res) => {
  req.session.user = null
  res.redirect('/')
})

router.post('/search', (req, res) => {
  Patients.findOne({ idNumber: req.body.searchData }, (err, stu) => {
    if (err)
      return res.status(500).send(false)
    res.send(stu)
  })
})

router.get('/bingLi', (req, res) => {
  Patients.findById(req.query.id, (err, patient) => {
    if (err) {
      res.status(500).send('server error')
    }
    res.send(patient)
  })
})
router.post('/bingLi/editBingLi', (req, res) => {
  Patients.findByIdAndUpdate(req.body.id, req.body, (err) => {
    if (err) {
      return res.status(500).send('Server error')
    }
    res.redirect('/docIndex#/patients')
  })
})

module.exports = router