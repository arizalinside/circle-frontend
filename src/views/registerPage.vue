<template>
  <div class="register">
    <b-container class="register-card">
      <b-row class="header-1">
        <b-col sm="2">
          <img
            class="back-btn"
            @click="toLogin()"
            src="@/assets/image/back.png"
          />
        </b-col>
        <b-col sm="10">
          <p class="register-header">Register</p>
        </b-col>
      </b-row>
      <b-card-text class="second">Let's create your account!</b-card-text>
      <b-alert :show="alert" class="danger-alert" variant="danger">{{
        isMsg
      }}</b-alert>
      <b-form @submit.prevent="onSubmit">
        <div class="grey-text">
          <b-form-input
            class="input-name"
            placeholder="Name"
            v-model="form.user_name"
            type="text"
          ></b-form-input>
          <b-form-input
            class="input-email"
            placeholder="Email"
            v-model="form.user_email"
            type="email"
          ></b-form-input>
          <b-form-input
            class="input-username"
            placeholder="Username"
            v-model="form.user_username"
            type="text"
          ></b-form-input>
          <b-form-input
            class="input-number"
            placeholder="Phone number"
            v-model="form.user_phone"
            type="text"
          ></b-form-input>
          <b-form-input
            class="input-password"
            placeholder="Password"
            v-model="form.user_password"
            type="password"
          ></b-form-input>
        </div>
        <b-button pill type="submit" class="register-button">Register</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'registerPage',
  data() {
    return {
      alert: false,
      isMsg: '',
      form: {
        user_name: '',
        user_email: '',
        user_username: '',
        user_phone: '',
        user_password: ''
      }
    }
  },
  methods: {
    ...mapActions(['registerUser']),
    onSubmit() {
      // console.log(this.form)
      if (this.form.user_name === '') {
        this.alert = true
        this.isMsg = "Your name can't be empty"
        setTimeout(() => {
          this.alert = false
        }, 5000000)
      } else if (this.form.user_email === '') {
        this.alert = true
        this.isMsg = "Email can't be empty"
        setTimeout(() => {
          this.alert = false
        }, 5000)
      } else if (this.form.user_username === '') {
        this.alert = true
        this.isMsg = "Username can't be empty"
        setTimeout(() => {
          this.alert = false
        }, 5000)
      } else if (this.form.user_phone === '') {
        this.alert = true
        this.isMsg = "Phone number can't be empty"
        setTimeout(() => {
          this.alert = false
        }, 5000)
      } else if (this.form.user_phone.length > 15) {
        this.alert = true
        this.isMsg = 'Phone number cannot be more than 15 digits'
        setTimeout(() => {
          this.alert = false
        }, 5000)
      } else if (this.form.user_password === '') {
        this.alert = true
        this.isMsg = "Password can't be empty"
        setTimeout(() => {
          this.alert = false
        }, 5000)
      } else if (
        this.form.user_password.length < 8 ||
        this.form.user_password.length > 16
      ) {
        this.alert = true
        this.isMsg = 'Password must be 8-16 characters'
        setTimeout(() => {
          this.alert = false
        }, 5000)
      } else {
        this.registerUser(this.form)
          .then(result => {
            this.$bvToast.toast('Register Success!', {
              title: 'Notification',
              autoHideDelay: 1000
            })
            setTimeout(() => {
              this.$router.push('/login')
            }, 2000)
          })
          .catch(error => {
            if (error.data.msg === 'Email has been registered') {
              this.alert = true
              this.isMsg = error.data.msg
              setTimeout(() => {
                this.alert = false
              }, 100000)
            }
          })
      }
    },
    toLogin() {
      this.$router.push('/login')
    }
    // makeToast() {
    //   if ()
    //   this.$bvToast.toast('Register Success!', {
    //     title: 'Notification',
    //     autoHideDelay: 5000
    //   })
  }
}
</script>

<style scoped src="../assets/css/register.css"></style>
