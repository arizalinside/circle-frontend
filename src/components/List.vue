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
              <b-img
                :src="api_url + '/' + userData.user_image"
              ></b-img>
              <div class="change-profile">
                <!-- <span>Change Photo</span>
                <b-img
                  :src="require('@/assets/image/edit-icon.png')"
                  class="edit-icon"
                ></b-img> -->
              </div>
              <h4 class="profile-name">{{ userData.user_name }}</h4>
              <h6 class="profile-username">{{ userData.user_username }}</h6>
            </div>

            <div class="account-user">
              <h5 class="account-header">Phone Number</h5>
              <p class="account-phnumber">{{ userData.user_phone }}</p>
            </div>

            <hr style="width: 90%;margin:auto;" />

            <div class="bio-user">
              <p class="biodata">{{ userData.user_bio }}</p>
              <p class="bio-text">Bio</p>
            </div>

            <hr style="width: 90%;margin:auto;" />

            <div>
              <b-button
                class="edit-profile"
                variant="outline-primary"
                v-b-modal.edit-user
                @click.prevent="editProfileBtn(userData)"
                >Edit Profile</b-button
              >
            </div>

            <b-modal
              id="edit-user"
              :title="modalTitle"
              hide-footer
              v-model="showModal"
            >
              <b-form>
                <b-form-group
                  label-cols-sm="3"
                  label="Name"
                  label-for="nested-name"
                >
                  <b-form-input
                    id="nested-name"
                    v-model="form.user_name"
                    type="text"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  label-cols-sm="3"
                  label="Username"
                  label-for="nested-username"
                >
                  <b-form-input
                    id="nested-username"
                    v-model="form.user_username"
                    type="text"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  label-cols-sm="3"
                  label="Phone Number"
                  label-for="nested-phone"
                >
                  <b-form-input
                    v-model="form.user_phone"
                    id="nested-product"
                    type="text"
                  >
                  </b-form-input>
                </b-form-group>

                <b-form-group
                  label-cols-sm="3"
                  label="Bio"
                  label-for="nested-bio"
                >
                  <b-form-input
                    v-model="form.user_bio"
                    id="nested-bio"
                    type="text"
                  >
                  </b-form-input>
                </b-form-group>

                <b-form-group
                  label-cols-sm="3"
                  label="Image"
                  label-for="nested-image"
                >
                  <b-form-file
                    id="nested-image"
                    @change="uploadFile"
                    type="file"
                  >
                  </b-form-file>
                  <br />
                  <span style="color: grey">(Max. 2MB)</span>
                </b-form-group>

                <b-button
                  type="submit"
                  variant="primary"
                  @click.prevent="updateProfile()"
                  >Update</b-button
                >
              </b-form>
            </b-modal>

            <div class="user-location">
              <h5 class="location-title">Location</h5>
              <GmapMap
                :center="coordinate"
                :zoom="15"
                map-type-id="terrain"
                style="width: 100%; height: 300px"
              >
                <GmapMarker
                  @click="clickMarker"
                  :position="coordinate"
                  :clickable="true"
                  :draggable="true"
                  icon="https://img.icons8.com/color/48/000000/map-pin.png"
                />
              </GmapMap>
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
            <div
              class="contacts"
              @click="get_friendList"
              v-b-modal.contacts-modal
            >
              <h5 class="popover-text">
                <img src="../assets/image/people.png" class="popover-image" />
                Contacts
              </h5>
            </div>
            <div class="invite-friend" v-b-modal.add-friend-modal>
              <h5 class="popover-text">
                <img
                  src="../assets/image/addfriends.png"
                  class="popover-image"
                  style="margin-right:12px;"
                />
                Invite Friends
              </h5>
            </div>
            <div @click.prevent="isLogout()">
              <h5 class="popover-text">
                <img src="../assets/image/people.png" class="popover-image" />
                Logout
              </h5>
            </div>
          </b-popover>
        </b-col>

        <b-modal
          id="add-friend-modal"
          ref="add-friend-modal"
          header-bg-variant="primary"
          header-text-variant="light"
          centered
          hide-footer
          title="Add Friend"
        >
          <h4>Invite Friends</h4>
          <b-form inline @submit.prevent="addFriend">
            <b-input
              placeholder="Email"
              class="col-8"
              type="email"
              v-model="form.friend_email"
              required
            />
            <b-button type="submit" variant="primary">Add</b-button>
          </b-form>
          <b-alert class="mt-3" variant="danger" :show="isAlert">{{
            alertMsg
          }}</b-alert>
        </b-modal>

        <b-modal
          id="contacts-modal"
          ref="contacts-modal"
          header-bg-variant="primary"
          header-text-variant="light"
          centered
          hide-footer
          title="Contacts"
        >
          <b-row
            v-for="(value, index) in friendList"
            :key="index"
            class="card-friends"
          >
            <b-col cols="2" @click="setFriendProfile(value.friend_id)">
              <img
                :src="api_url + value.friend_image"
                style="width: 50px; border-radius: 10px"
                v-if="value.friend_image !== ''"
              />
              <img
                src="@/assets/image/blank-profile.jpg"
                style="width: 50px; border-radius: 10px"
                v-else
              />
            </b-col>
            <b-col cols="8" @click="setFriendProfile(value.friend_id)"
              ><span>{{ value.friend_name }}</span></b-col
            >
            <b-col cols="2">
              <font-awesome-icon
                :icon="['far', 'paper-plane']"
                @click="create_room(value.friend_id)"
              ></font-awesome-icon>
            </b-col>
          </b-row>
        </b-modal>
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

      <Room />
      <!-- <b-row>
        <b-col sm="4" class="category-1">All</b-col>
        <b-col sm="4" class="category-2">Important</b-col>
        <b-col sm="4" class="category-3">Unread</b-col>
      </b-row> -->
      <!-- <div class="room-chat">
        <b-row class="list-room" v-for="(value, index) in room" :key="index">
          <b-col sm="3">
            <b-img :src="value.img" class="room-pict"></b-img>
          </b-col>
          <b-col sm="6">
            <p class="room-name">{{ value.name }}</p> -->
      <!-- <p class="room-msg" v-if="isSender">Me: {{ value.message }}</p> -->
      <!-- <p class="room-msg">{{ value.message }}</p>
          </b-col>
          <b-col sm="3">
            <p class="room-time">{{ value.time }}</p>
            <div class="room-badge">{{ value.badge }}</div>
          </b-col>
        </b-row>
      </div> -->

      <!-- <div class="room"> -->
    </b-container>
  </div>
</template>

<script>
// import axios from 'axios'
import Room from './Room'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'List',
  components: {
    Room
  },
  data() {
    return {
      form: {
        user_name: '',
        user_username: '',
        user_phone: '',
        user_bio: '',
        user_image: ''
      },
      modalTitle: '',
      userId: '',
      isMsg: '',
      showModal: false,
      coordinate: {
        lat: 0,
        lng: 0
      },
      isAlert: false,
      alertMsg: '',
      api_url: process.env.VUE_APP_URL
      // username: '@gloriamckinney',
      // phoneNumber: '+6281310918549',
      // bio: "I'm Senior Developer from Microsoft and then im like culinary",
      // user: {},
      // room: [
      //   {
      //     img: require('@/assets/image/dummy2.png'),
      //     name: 'Theresa Webb',
      //     message: 'Why did you do that?',
      //     time: '15:20',
      //     status: '',
      //     isSender: false
      //   },
      //   {
      //     img: require('@/assets/image/dummy3.png'),
      //     name: 'Calvin Flores',
      //     message: 'Hi, bro! Come to my house!',
      //     time: '15:13',
      //     status: '',
      //     isSender: false
      //   },
      //   {
      //     img: require('@/assets/image/dummy4.png'),
      //     name: 'Gregory Bell',
      //     message: 'Will you stop ignoring me?',
      //     time: '15:13',
      //     status: '',
      //     isSender: false
      //   },
      //   {
      //     img: require('@/assets/image/dummy5.png'),
      //     name: 'Soham Henry',
      //     message: 'Me: Bro, just fuck off',
      //     time: '8:30',
      //     status: '',
      //     isSender: true
      //   },
      //   {
      //     img: require('@/assets/image/dummy6.png'),
      //     name: 'Mother ❤',
      //     message: 'Me: Yes, of course come, ...',
      //     time: '7:20',
      //     status: '',
      //     isSender: true
      //   },
      //   {
      //     img: require('@/assets/image/dummy7.png'),
      //     name: 'Brother',
      //     message: 'Ok, Good Bye!',
      //     time: 'Yesterday',
      //     status: '',
      //     isSender: true
      //   }
      // ]
      //     urlApiHome: 'http://localhost:3000/home'
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
      userData: 'setUserData',
      friendList: 'getFriendList'
      // user_id: 'setUserId'
    })
  },
  created() {
    // console.log(this.user)
    this.getUserById(this.user.user_id)
    this.$getLocation()
      .then(coordinates => {
        this.coordinate = {
          lat: coordinates.lat,
          lng: coordinates.lng
        }
      })
      .catch(error => {
        console.log(error)
        // this.$bvToast.toast('Cannot get location', {
        //   title: 'Notification',
        //   variant: 'danger',
        //   solid: true
        // })
      })
    //   // this.getAllUser()
  },
  methods: {
    ...mapActions(['getFriendByUser', 'getUserById', 'updateUser', 'addFriends', 'logout', 'createRoom', 'getRoomById']),
    // created() {
    //   this.getUser(this.user.user_id)
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
    get_friendList() {
      this.getFriendByUser(this.user.user_id)
    },
    create_room(data) {
      const setData = {
        sender_id: this.user.user_id,
        getter_id: data
      }
      this.createRoom(setData)
        .then(response => {
          if (response.status === 200) {
            const setData = {
              user_id: this.user.user_id,
              roomchat_id: response.data.roomchat_id
            }
            this.getRoomById(setData)
            this.closeModal('contacts-modal')
          } else {
            const setData = {
              user_id: this.user.user_id,
              roomchat_id: response.data.result_a.roomchat_id
            }
            this.getRoomById(setData)
            this.closeModal('contacts-modal')
          }
        }).catch(error => {
          console.log(error)
          this.$bvToast.toast(`${error.data.msg}`, {
            title: 'Notification',
            variant: 'danger',
            solid: true
          })
        })
    },
    clickMarker(position) {
      console.log('clicked')
      console.log(position)
      console.log(position.latLng.lat())
      console.log(position.latLng.lng())
      this.coordinate = {
        lat: position.latLng.lat(),
        lng: position.latLng.lng()
      }
    },
    editProfileBtn(data) {
      this.showModal = true
      this.modalTitle = 'Edit Profile'
      this.form = {
        user_name: data.user_name,
        user_username: data.user_username,
        user_phone: data.user_phone,
        user_bio: data.user_bio,
        user_image: data.user_image
      }
      this.userId = data.user_id
    },
    updateProfile() {
      const data = new FormData()
      data.append('user_name', this.form.user_name)
      data.append('user_username', this.form.user_username)
      data.append('user_phone', this.form.user_phone)
      data.append('user_bio', this.form.user_bio)
      data.append('user_image', this.form.user_image)
      const setData = {
        user_id: this.user.user_id,
        form: data
      }
      this.updateUser(setData)
        .then(response => {
          // this.isMsg = response.data.msg
          this.$bvToast.toast(`${response.data.msg}`, {
            title: 'Notification',
            variant: 'success',
            solid: true
          })
          // this.closeModal()
          this.showModal = false
          this.getUserById(this.user.user_id)
        })
        .catch(error => {
          console.log(error)
          // this.isMsg = error.response.data.msg
          // this.makeToast = (this.isMsg, 'danger')
          this.$bvToast.toast(`${error.msg}`, {
            title: 'Notification',
            variant: 'danger',
            solid: true
          })
        })
    },
    uploadFile(event) {
      this.form.user_image = event.target.files[0]
    },
    addFriend() {
      this.form.user_id = this.user.user_id
      this.addFriends(this.form)
        .then(response => {
          // console.log(response)
          this.$bvToast.toast(`${response.msg}`, {
            title: 'Notification',
            variant: 'success',
            solid: true
          })
          this.form = {
            friend_email: ''
          }
        })
        .catch(error => {
          // console.log(error)
          this.$bvToast.toast(`${error.data.msg}`, {
            title: 'Notification',
            variant: 'danger',
            solid: true
          })
          // this.closeModal('add-friend-modal')
        })
    },
    makeToast(msg, variant, append) {
      this.$bvToast(`${msg}`, {
        title: 'Notification',
        autoHideDelay: 5000,
        appendToast: append,
        variant: variant,
        solid: true
      })
    },
    closeModal(modalId) {
      this.$refs.[modalId].hide()
    },
    isLogout() {
      this.$bvModal
        .msgBoxConfirm('Do you want to exit?', {
          title: 'Please Confirm',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'Yes',
          cancelTitle: 'No',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          const setData = {
            form: {
              user_status: '0'
            }
          }
          value ? this.logout(setData) : this.getUserById(this.user.user_id)
        })
        .catch(error => {
          this.$bvToast.toast(`${error.data.msg}`, {
            title: 'Notification',
            variant: 'danger',
            solid: true
          })
        })
    }
  }
}
</script>

<style scoped src="../assets/css/home.css"></style>
