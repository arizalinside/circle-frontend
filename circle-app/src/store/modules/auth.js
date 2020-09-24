import axios from 'axios'

export default {
  state: {
    user: {},
    token: localStorage.getItem('token') || null,
    user_id: ''
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      state.token = payload.token
      state.user_id = payload.user_id
    }
  },
  actions: {
    registerUser(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:3000/user/register', payload)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    loginUser(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:3000/user/login', payload)
          .then(response => {
            // console.log(context)
            // console.log(payload)
            // console.log(response)
            context.commit('setUser', response.data.data)
            localStorage.setItem('token', response.data.data.token)
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    }
  },
  getters: {
    getUser(state) {
      return state.user
    },
    getUserId(state) {
      return state.user_id
    }
  }
}
