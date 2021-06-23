const home = {
  template: '#home',
  data() {
    return {
      menNum: 0,
      womenNum: 0,
      diseaseType: [],
      editPatient: {}
    }
  },
  methods: {
    sexVD() {
      this.$http.get("/getMenNum").then(res => {
        this.menNum = res.body.menNum

        this.$http.get("/getWomenNum").then(res => {
          this.womenNum = res.body.womenNum
          var sexChart = echarts.init(document.getElementById('pie1'), 'light'); // dark 可尝试修改为 light
          sexChart.setOption({
            title: {
              text: '患者性别比例',
              left: 'center'
            },
            tooltip: {
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              bottom: 0,
              left: 'center',
              data: ['男', '女']
            },
            series: [
              {
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                data: [
                  { value: this.menNum, name: '男' },
                  { value: this.womenNum, name: '女' }
                ],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          })
        })

      })
    },
    typeVD() {
      const that = this

      function showTypes() {
        var oldChart = echarts.init(document.getElementById('pie2'), 'light'); // dark 可尝试修改为 light
        oldChart.setOption({
          title: {
            text: '各科比例',
            left: 'center'
          },
          tooltip: { formatter: '{a} <br/>{b} : {c} ({d}%)' },

          legend: {
            bottom: 0,
            left: 'center',
            data: ['外科', '内科', '妇科', '口腔科']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [
                { value: that.diseaseType[0], name: '外科' },
                { value: that.diseaseType[1], name: '内科' },
                { value: that.diseaseType[2], name: '妇科' },
                { value: that.diseaseType[3], name: '口腔科' },
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
      }
      function getOlds(path) {
        return new Promise((resolve, reject) => {
          that.$http.get(path).then(res => {
            resolve(res.body.num)
          })
        })
      }
      getOlds('/outside')
        .then(data => {
          this.diseaseType.push(data)
          return getOlds('/inside')
        })
        .then(data => {
          this.diseaseType.push(data)
          return getOlds('/women')
        })
        .then(data => {
          this.diseaseType.push(data)
          return getOlds('/mouth')
        })
        .then(data => {
          this.diseaseType.push(data)
          showTypes()
        })
    },

  },

  mounted() {
    this.sexVD()
    this.typeVD()
  },

}

const patients = {
  template: '#patients',
  data() {
    return {
      patients: [],
      editPatient: {}
    }
  },
  methods: {
    getPatients() {
      this.$http.get('/getStu').then(res => {
        this.patients = res.body
      })
    },
    getBingLi(id) {
      this.$http.get('/bingLi?id=' + id)
        .then(res => {
          this.$router.push({
            name: 'bingLi',
            params: { patient: res.body }
          })
        })
    },
    edit(id) {
      this.$http.get('/index/edit?id=' + id)
        .then(res => {
          this.$router.push({
            name: 'editPage',
            params: { patient: res.body }
          })
        })
    },
    del(id) {
      this.$http.post('/del', { id: id }).then(res => {
        if (res.body.success) {
          alert('删除成功')
          this.getPatients()
        }
      })
    },

  },

  mounted() {
    this.getPatients()
  },

}

const doctors = {
  template: '#doctors',
  data() {
    return {
      doctors: [],
      editDoctor: {}
    }
  },
  methods: {
    getDoctors() {
      this.$http.get('/getDct').then(res => {
        this.doctors = res.body
      })
    },
    edit(id) {
      this.$http.get('/index/editDct?id=' + id).then(res => {
        this.editDoctor = res.body

        this.$router.push({
          name: 'editDoctor',
          params: { doctors: this.editDoctor }
        })
      })
    },
    del(id) {
      this.$http.post('/delDct', { id: id }).then(res => {
        if (res.body.success) {
          alert('删除成功')
          this.getDoctors()
        }
      })
    },
  },
  mounted() {
    this.getDoctors()
  }
}

const editPage = {
  template: '#editPage',

  data() {
    return {
      patient: {}
    }
  },

  methods: {
    back() {
      if (this.patient.name && this.patient.idNumber && this.patient.age
        && this.patient.diseaseType && this.patient.disease) {
        window.location.href = "/docIndex#/patients"
      }
    }
  },

  mounted() {
    this.patient = this.$route.params.patient
  },
}

const create = {
  template: '#create',

  data() {
    return {
      patient: {}
    }
  },

  methods: {
    back() {
      if (this.patient.name && this.patient.idNumber && this.patient.age
        && this.patient.diseaseType && this.patient.disease) {
        window.location.href = "/docIndex#/patients"
      }
    }
  }
}

const bingLi = {
  template: '#bingLi',
  data() {
    return {
      patient: {}
    }
  },

  methods: {
    editBingLi() {
      this.$router.push({
        name: 'editBingLi',
        params: { patient: this.patient }
      })
    },
  },

  created() {
    this.patient = this.$route.params.patient
  }
}

const editBingLi = {
  template: '#editBingLi',
  data() {
    return {
      patient: {}
    }
  },

  methods: {
    cancel() {
      this.$router.push({
        name: 'bingLi',
        params: { patient: this.patient }
      })
    }
  },

  created() {
    this.patient = this.$route.params.patient
  }
}

const help = {
  template: "#help"
}

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: home },
    { path: '/patients', component: patients },
    { path: '/doctors', component: doctors },
    { path: '/create', component: create },
    { path: '/editPage/', name: 'editPage', component: editPage },
    { path: '/bingLi', name: 'bingLi', component: bingLi },
    { path: '/editBingLi', name: 'editBingLi', component: editBingLi },
    { path: '/help', component: help }
  ],
  linkActiveClass: 'active active1'
})

const vm = new Vue({
  el: '#app',
  data() {
    return {
      user: {},
      searchData: ''
    }
  },
  methods: {
    getUser() {
      this.$http.get("/getUser").then(res => {
        this.user = res.body
        if (!this.user) {
          window.location.href = "/"
        }
      })
    },
    search() {
      this.$http.post('/search', { searchData: this.searchData })
        .then(res => {
          if (res.body.idNumber == undefined)
            return alert('没有这个病人')
          alert('姓名: ' + res.body.name + '\n年龄: ' + res.body.age +
            '\n性别: ' + res.body.sex + '\n病名: ' + res.body.disease)
        })
    },


  },
  mounted() {
    this.getUser()
  },
  router
})