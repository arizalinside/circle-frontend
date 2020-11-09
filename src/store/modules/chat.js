import axios from 'axios'
import io from 'socket.io-client'

export default {
  state: {
    isChat: false,
    roomChat: '',
    socket: io('http://127.0.0.1:3000/')
  },
  mutations: {
    setIsChat(state, payload) {
      state.isChat = payload
    },
    setRoomChat(state, payload) {
      state.roomChat = payload
    },
    setMessage(state, payload) {
      state.roomChat.message.push(payload)
    }
  },
  actions: {
    createRoom(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:3000/chat/create', payload)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    getRoomById(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `http://127.0.0.1:3000/chat/room/${payload.user_id}/${payload.roomchat_id}`
          )
          .then(response => {
            console.log(response.data)
            context.commit('setRoomChat', response.data.data[0])
            context.commit('setIsChat', true)
            resolve(response.data)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    sendMessage(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:3000/chat/send-message', payload)
          .then(response => {
            console.log(response)
            resolve(response.data)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    }
  },
  getters: {
    getIsChat(state) {
      return state.isChat
    },
    getRoomChat(state) {
      return state.roomChat
    },
    getSocket(state) {
      return state.socket
    }
  }
}
