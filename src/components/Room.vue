<template>
  <div class="room">
    <b-container>
      <b-row class="header-room">
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
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'Room'
}
</script>

<style scoped src="../assets/css/home.css"></style>
