<template>
  <div class="list">
    <b-container>
      <b-row>
        <b-col sm="10" class="logo-text">
          <a :href="urlApiHome">Circle</a>
        </b-col>
        <b-col sm="2" class="hamburger">
          <img src="@/assets/image/menu.png" />
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="10">
          <b-form-input
            class="search-box"
            placeholder="Type your message..."
            v-model="search"
          ></b-form-input>
        </b-col>
        <b-col sm="2">
          <img src="@/assets/image/plus.png" class="plus-btn" />
        </b-col>
      </b-row>

      <b-row>
        <b-col sm="4" class="category-1">All</b-col>
        <b-col sm="4" class="category-2">Important</b-col>
        <b-col sm="4" class="category-3">Unread</b-col>
      </b-row>

      <b-row class="list-room" v-for="(value, index) in room" :key="index">
        <b-col sm="3">
          <b-img :src="value.img" class="room-pict"></b-img>
        </b-col>
        <b-col sm="6">
          <p class="room-name">{{ value.name }}</p>
          <p class="room-msg" v-if="isSender">Me: {{ value.message }}</p>
          <p class="room-msg" v-else>{{ value.message }}</p>
        </b-col>
        <b-col sm="3">
          <p class="room-time">{{ value.time }}</p>
          <b-badge pill variant="primary" class="room-status">
            {{ value.status }}
          </b-badge>
        </b-col>
      </b-row>

      <div class="room"></div>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'List',
  data() {
    return {
      room: [
        {
          img: '',
          name: '',
          message: '',
          time: '',
          status: '',
          isSender: false
        }
      ],
      urlApiHome: 'http://localhost:3000/home'
    }
  }
}
</script>

<style scoped src="../assets/css/home.css"></style>
