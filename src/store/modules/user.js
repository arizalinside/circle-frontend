// import axios from 'axios'

// export default {
//   state: {
//     // user: {},
//     // user_id: ''
//   },
//   mutations: {
//     setUser(state, payload) {
//       console.log(payload)
//       state.profile = payload
//       // console.log(payload)
//     },
//     // setUserId(state, payload) {
//     //   console.log(payload)
//     //   // state.profile = payload
//     //   state.profile = payload
//     // }
//   },
//   actions: {
//     getAllUser(context, payload) {
//       return new Promise((resolve, reject) => {
//         axios
//           .get('http://127.0.0.1:3000/user/')
//           .then(response => {
//             context.commit('setUser', response.data.data)
//             resolve(response.data)
//             // console.log(payload)
//             // context.commit('getProfileId', response)
//           })
//           .catch(error => {
//             console.log(error.response)
//           })
//       })
//     },
//   //   getUserId(context, payload) {
//   //     return new Promise((resolve, reject) => {
//   //       axios
//   //         .get(`http://127.0.0.1:3000/user/${payload}`)
//   //         .then(response => {
//   //           context.commit('setUserId', response.data.data)
//   //           resolve(response.data)
//   //         })
//   //         .catch(error => {
//   //           console.log(error.response)
//   //         })
//   //     })
//   //   }
//   // },
//   getters: {
//     setUser(state) {
//       return state.user
//     },
//     // setUserId(state) {
//     //   return state.user_id
//     // }
//   }
// }
