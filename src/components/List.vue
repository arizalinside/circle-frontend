<template>
  <div class="list">
    <b-container>
      <b-row class="header-row">
        <div class="sidebar-user">
          <b-sidebar
            id="sidebar-backdrop"
            title="Settings"
            backdrop-variant="dark"
            backdrop
            shadow
          >
            <div class="profile-user">
              <b-img :src="require('@/assets/image/dummy1.png')"></b-img>
              <div class="change-profile">
                <!-- <span>Change Photo</span>
                <b-img
                  :src="require('@/assets/image/edit-icon.png')"
                  class="edit-icon"
                ></b-img> -->
              </div>
              <h4 class="profile-name">{{ name }}</h4>
              <h6 class="profile-username">{{ username }}</h6>
            </div>

            <div class="account-user">
              <h5 class="account-header">Phone Number</h5>
              <p class="account-phnumber">{{ phoneNumber }}</p>
            </div>

            <hr style="width: 90%;margin:auto;" />

            <div class="bio-user">
              <p class="biodata">{{ bio }}</p>
              <p class="bio-text">Bio</p>
            </div>

            <hr style="width: 90%;margin:auto;" />

            <div>
              <b-button class="edit-profile" variant="outline-primary"
                >Edit Profile</b-button
              >
            </div>
          </b-sidebar>
        </div>
        <b-col sm="10" class="logo-text">
          <p>Circle</p>
        </b-col>
        <b-col sm="2" class="hamburger">
          <img
            src="@/assets/image/menu.png"
            tabindex="0"
            id="set-popover"
            style="cursor:pointer;"
          />
          <b-popover
            placement="bottomleft"
            target="set-popover"
            triggers="focus"
            variant="primary"
          >
            <h5 class="popover-text" v-b-toggle.sidebar-backdrop>
              <img src="../assets/image/gear.png" class="popover-image" />
              Setting
            </h5>
            <h5 class="popover-text">
              <img src="../assets/image/people.png" class="popover-image" />
              Contacts
            </h5>
            <h5 class="popover-text">
              <img
                src="../assets/image/addfriends.png"
                class="popover-image"
                style="margin-right:12px;"
              />
              Invite Friends
            </h5>
            <h5 class="popover-text">
              <img src="../assets/image/people.png" class="popover-image" />
              Logout
            </h5>
          </b-popover>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="10">
          <b-form-input class="search-box" placeholder="Search"></b-form-input>
        </b-col>
        <b-col sm="2">
          <img src="@/assets/image/plus.png" class="plus-btn" />
        </b-col>
      </b-row>

      <br />
      <hr />

      <!-- <b-row>
        <b-col sm="4" class="category-1">All</b-col>
        <b-col sm="4" class="category-2">Important</b-col>
        <b-col sm="4" class="category-3">Unread</b-col>
      </b-row> -->
      <div class="room-chat">
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
            <div class="room-badge">{{ value.badge }}</div>
          </b-col>
        </b-row>
      </div>

      <!-- <div class="room"> -->
    </b-container>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'List',
  data() {
    return {
      name: 'Gloria McKinney',
      username: '@gloriamckinney',
      phoneNumber: '+6281310918549',
      bio: "I'm Senior Developer from Microsoft and then im like culinary",
      user: {},
      room: [
        {
          img: require('@/assets/image/dummy2.png'),
          name: 'Theresa Webb',
          message: 'Why did you do that?',
          time: '15:20',
          status: '',
          isSender: false
        },
        {
          img: require('@/assets/image/dummy3.png'),
          name: 'Calvin Flores',
          message: 'Hi, bro! Come to my house!',
          time: '15:13',
          status: '',
          isSender: false
        },
        {
          img: require('@/assets/image/dummy4.png'),
          name: 'Gregory Bell',
          message: 'Will you stop ignoring me?',
          time: '15:13',
          status: '',
          isSender: false
        },
        {
          img: require('@/assets/image/dummy5.png'),
          name: 'Soham Henry',
          message: 'Me: Bro, just fuck off',
          time: '8:30',
          status: '',
          isSender: true
        },
        {
          img: require('@/assets/image/dummy6.png'),
          name: 'Mother ❤',
          message: 'Me: Yes, of course come, ...',
          time: '7:20',
          status: '',
          isSender: true
        },
        {
          img: require('@/assets/image/dummy7.png'),
          name: 'Brother',
          message: 'Ok, Good Bye!',
          time: 'Yesterday',
          status: '',
          isSender: true
        }
      ]
      //     urlApiHome: 'http://localhost:3000/home'
    }
  }
  // created() {
  //   this.getUser()
  // },
  // methods: {
  //   getUser() {
  //     axios
  //       .get('http://127.0.0.1:3000/user/')
  //       .then(response => {
  //         console.log(response)
  //       })
  //       .catch(error => {
  //         console.log(error)
  //       })
  //   }
  // }
}
</script>

<style scoped src="../assets/css/home.css"></style>
