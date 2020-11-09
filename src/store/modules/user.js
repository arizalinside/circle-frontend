import axios from 'axios'

export default {
  state: {
    friendStatus: 0
  },
  mutations: {
    setFriendStatus(state, payload) {
      state.friendStatus = payload
    }
  },
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
  updateStatus(context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .patch(`http://127.0.0.1:3000/user/update-status/${payload}`)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error.response)
        })
    })
  },
  getFriendStatus(context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(`http://127.0.0.1:3000/user/status/${payload}`)
        .then(response => {
          console.log(response)
          context.commit('setFriendStatus', response.data.data.user_status)
          resolve(response.data)
        })
        .catch(error => {
          console.log(error.response)
          reject(error.response)
        })
    })
  },
  getters: {
    getFriendStatus(state) {
      return state.friendStatus
    }
  }
}
