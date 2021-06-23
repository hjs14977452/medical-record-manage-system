const home = {
  template: '#home'
}

const login = {
  template: '#login',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      if (this.username == '') {
        return alert('请输入用户名')
      }
      if (this.password == '') {
        return alert('请输入密码')
      }
      this.$http.post('/login', this._data).then((res) => {
        switch (res.body.err_code) {
          case 1:
            alert('用户名或密码错误')
            break;
          case -1:
            alert('登录成功！')
            window.location.href = '/index'
            break;
          case 0:
            alert('登录成功！')
            window.location.href = '/docIndex'
            break
          default:
            alert('服务器忙，请稍后重试')
            break;
        }
      })
    }
  },
}

const register = {
  template: '#register',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    register() {
      if (this.username == '')
        return alert('请输入用户名')

      if (this.password == '')
        return alert('请输入密码')

      this.$http.post('/register', this._data).then((res) => {
        switch (res.body.err_code) {
          case 1:
            alert('用户名已存在')
            break;
          case 2:
            alert('注册码错误')
            break;
          case 0:
            alert('注册成功！')
            window.location.href = '/index'
            break;

          default:
            alert('服务器忙，请稍后重试')
            break;
        }
      })
    }
  }
}

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: home },
    { path: '/login', component: login },
    { path: '/register', component: register }
  ],
  linkActiveClass: 'active'
})

new Vue({
  el: '#app',
  methods: {
    getUser() {
      this.$http.get("/getUser").then(res => {
        this.user = res.body
        if (this.user) {
          window.location.href = "/students"
        }
      })
    }
  },
  router,
  mounted() {
    this.getUser()
  },
})