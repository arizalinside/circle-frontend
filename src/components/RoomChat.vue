<template>
  <div>
    <div class="empty-room" v-if="!isChat">
      <span>Please select your friends to start messaging</span>
    </div>
    <div class="room-chat"  v-else>
      <div class="room-navbar">
        <b-row class="container">
          <b-col class="room-desc">
            <div class="nav-back" @click="closeRoom">
              <font-awesome-icon
                icon="chevron-left"
                class="icon-back text-link primary"
              />
            </div>
            <div
              class="room-image-profile"
              @click="set_friendProfile(roomChat.getter_id)"
            >
              <img
                :src="URL_API + '/' + roomChat.room_image"
                v-if="roomChat.room_image !== ''"
              />
              <img src="../assets/image/blank-profile.jpg" v-else />
            </div>
            <div class="room-name">
              <span>{{ roomChat.room_name }}</span
              ><br />
              <small v-if="typing"
                ><em>{{ typing }} is typing...</em></small
              >
              <small v-else>{{
                friendStatus === '1' ? 'Online' : 'Offline'
              }}</small>
            </div>
          </b-col>
        </b-row>
      </div>
      <div class="room-body">
        <b-container>
          <div class="chat-collection">
            <div v-for="(value, index) in roomChat.room_message" :key="index">
              <div v-if="value.sender_id == user.user_id">
                <div class="chat-item">
                  <div class="chat-text own">
                    <span>{{ value.message_text }}</span>
                  </div>
                  <div class="clearfix"></div>
                </div>
              </div>
              <div v-else>
                <div class="chat-item">
                  <div class="chat-text">
                    <span>{{ value.message_text }}</span>
                  </div>
                </div>
                <div class="clearfix"></div>
              </div>
            </div>
          </div>
        </b-container>
      </div>
      <div class="room-footer">
        <form @submit.prevent="onSubmit">
          <input
            placeholder="Type your message..."
            v-model="message_text"
            required
          />
          <button type="submit">
            <font-awesome-icon class="primary send-button" :icon="['far', 'paper-plane']" />
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  data() {
    return {
      roomchat_id: '',
      message_text: '',
      typing: false,
      URL_API: process.env.VUE_APP_URL
    }
  },
  watch: {
    message_text(value) {
      value ? this.socket.emit('typing', {
        user_name: this.userData.user_name,
        roomchat_id: this.roomChat.roomchat_id
      }) : this.socket.emit('typing', false)
    }
  },
  mounted() {
    this.socket.on('typingMessage', data => {
      console.log(data)
      this.typing = data
    })
  },
  computed: {
    ...mapGetters({
      isChat: 'getIsChat',
      roomChat: 'getRoomChat',
      user: 'getUser',
      userData: 'setUserData',
      socket: 'getSocket',
      friendStatus: 'getFriendStatus'
    })
  },
  created() {
    console.log(this.user)
  },
  methods: {
    ...mapActions(['sendMessage']),
    ...mapMutations(['setFriendProfile', 'setRoomChat']),
    async onSubmit() {
      const setData = {
        sender_id: this.user.user_id,
        sender_name: this.userData_name,
        roomchat_id: this.roomChat.roomchat_id,
        sender_image: this.userData.user_image,
        message_text: this.message_text,
        getter_id: this.roomChat.getter_id
      }
      await this.socket.emit('roomMessage', setData)
      await this.socket.emit('notif', setData)
      this.sendMessage(setData)
        .then(() => {
          this.message_text = ''
        })
        .catch(error => {
          console.log(error)
          this.$bvToast.toast(`${error.data.msg}`, {
            title: 'Notification',
            variant: 'danger',
            solid: true
          })
        })
    },
    set_FriendProfile(data) {
      this.setFriendProfile(data)
    },
    closeRoom() {
      this.setRoomChat({
        roomchat_id: '',
        room_message: []
      })
    }
  }
}
</script>

<style scoped src="../assets/css/home.css"></style>
