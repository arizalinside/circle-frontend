import axios from 'axios'

export default {
  state: {
    friendList: [],
    friendId: ''
  },
  mutations: {
    setFriendList(state, payload) {
      state.friendList = payload
    },
    setFriendProfile(state, payload) {
      state.friendId = payload
    }
  },
  actions: {
    getFriendByUser(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`http://127.0.0.1:3000/friend/${payload}`)
          .then(response => {
            context.commit('setFriendList', response.data.data)
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    addFriends(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:3000/friend/add-friend', payload)
          .then(response => {
            context.commit('setFriendList', response.data.data)
            resolve(response.data)
            // console.log(response.data)
          })
          .catch(error => {
            reject(error.response)
            // console.log(error.response)
          })
      })
    }
  },
  getters: {
    getFriendList(state) {
      return state.friendList
    }
  }
}
