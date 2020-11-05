import axios from 'axios'

export default {
  state: {},
  mutations: {},
  actions: {
    updateUser(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `http://127.0.0.1:3000/user/update/${payload.user_id}`,
            payload.form
          )
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    }
  },
  getters: {}
}
