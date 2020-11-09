<template>
  <div class="room">
    <b-container>
      <div class="card-chat">
        <div
          class="card-chat-items"
          v-for="(value, index) in roomChatList"
          :key="index"
          @click="setRoom(value.roomchat_id)"
        >
          <div class="card-chat-image">
            <img
              :src="URL_API + value.room_image"
              v-if="value.room_image !== ''"
            />
            <img src="../assets/image/blank-profile.jpg" v-else />
          </div>
          <div class="card-chat-wrapper">
            <div class="card-chat-top">
              <span class="card-chat-time" v-if="value.room_message.length > 0">
                <timeago
                  :datetime="value.room_message[0].message_created_at"
                  :auto-update="1"
                ></timeago>
              </span>
              <div class="card-chat-name">{{ value.room_name }}</div>
            </div>
            <div class="card-chat-bottom">
              <div class="card-chat-text" v-if="value.room_message.length > 0">
                <span>{{ value.room_message[0].message_text }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <b-row class="header-room">
        <b-col sm="2" class="profile-chat">
          <b-img :src="require('@/assets/image/dummy6.png')"></b-img>
        </b-col>

        <b-col sm="8" class="receiver-chat">
          <p class="name-chat">Mother ❤</p>
          <p class="status-chat">online</p>
        </b-col>

        <b-col sm="2" class="menu-chat">
          <b-img
            :src="require('@/assets/image/profile-menu.png')"
            style="cursor:pointer;"
          ></b-img>
        </b-col>
      </b-row>

      <b-row class="chat-field">
        <b-col sm="12" class="column-chat">
          <p class="chat-1">
            Hi, son. How are you doing? Today, my father and i want to buy a
            car, bought a cool car.
          </p>
          <p class="chat-2">
            Oh, cool! Send me a photo.
          </p>
          <p class="chat-3">
            Ok😉
          </p>
          <b-img
            :src="require('@/assets/image/ferrari.jpg')"
            class="chat-4"
          ></b-img>
          <p class="chat-5">Will we arrive tomorrow?</p>
          <p class="chat-6">Yeah, sure.</p>
        </b-col>
      </b-row>

      <b-row class="footer-room">
        <b-form-input
          class="form-chat"
          placeholder="Type your message..."
        ></b-form-input>
        <div class="plus-chat">
          <b-img
            :src="require('@/assets/image/plus.png')"
            class="plus-btn-chat"
          ></b-img>
        </div>
      </b-row> -->
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      roomChatList: [],
      URL_API: 'http://127.0.0.1:3000/',
      oldRoom: ''
    }
  },
  created() {
    this.get_roomList()
    this.getUserById(this.user.user_id)
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
      userData: 'setUserData',
      roomChat: 'getRoomChat',
      socket: 'getSocket',
      friendStatus: 'getFriendStatus'
    })
  },
  methods: {
    ...mapActions(['getRoomById', 'getUserById', 'getFriendStatus']),
    setRoom(data) {
      const roomData = {
        user_id: this.user.user_id,
        roomchat_id: data
      }
      if (this.oldRoom) {
        this.socket.emit('changeRoom', { oldRoom: this.oldRoom, newRoom: data })
        this.oldRoom = data
      } else {
        this.socket.emit('selectRoom', { roomchat_id: data })
        this.oldRoom = data
      }
      this.getRoomById(roomData).then(response => {
        this.getFriendStatus(response.data[0].getter_id)
      })
    },
    get_roomList() {
      axios
        .get(`http://127.0.0.1:3000/chat/room/${this.user.user_id}`)
        .then(response => {
          // console.log(response)
          this.roomChatList = response.data.data
        })
    }
  }
}
</script>

<style scoped src="../assets/css/home.css"></style>
