export default {
  dbs: 'mongodb://localhost:27017/student',
  redis: {
    get host() {
      return 'localhost'
    },
    get port () {
      return 6379
    }
  },
  smtp: {
    get host() {
      return 'smtp.qq.com'
    },
    get user() {
      return '301059120@qq.com'
    },
    get pass() {
      return 'hknnwlagonupbhfd'
    },
    get code() {
      return () => {
        return Math.random().toString(16).slice(2,6).toUpperCase()
      }
    },
    get expire() {
      return () => {
        return new Date().getTime() + 60*60*1000
      }
    }
  }
}