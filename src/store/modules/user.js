import axios from 'axios'

export default {
  state: {
    user: {}
  },
  mutations: {},
  actions: {
    getUserById(context, payload) {
      console.log(payload)
      return new Promise((resolve, reject) => {
        axios
          .get(`http://127.0.0.1:3000/user/${payload}`)
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
      })
    }
  },
  getters: {}
}
