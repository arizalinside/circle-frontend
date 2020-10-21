<template>
  <div class="login">
    <b-container class="login-card">
      <p class="login-header">Login</p>
      <b-card-text class="second">Hi, welcome back</b-card-text>
      <b-alert :show="alert" class="danger-alert" variant="danger">{{
        isMsg
      }}</b-alert>
      <b-form @submit.prevent="onSubmit">
        <div class="grey-text">
          <mdb-input label="Email" v-model="form.user_email" type="email" />
          <mdb-input
            label="Password"
            v-model="form.user_password"
            type="password"
          />
        </div>
        <p class="forgot-password">Forgot password?</p>
        <b-button pill type="submit" class="login-button">Login</b-button>
        <p class="sign-up">
          Don't have an account? <span @click="signUp()">Sign Up</span>
        </p>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import { mdbInput } from 'mdbvue'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'loginPage',
  components: {
    mdbInput
  },
  data() {
    return {
      alert: false,
      isMsg: '',
      form: {
        user_email: '',
        user_password: ''
      }
    }
  },
  computed: {
    ...mapGetters({ user_id: 'getUserId' })
  },
  methods: {
    ...mapActions(['loginUser']),
    ...mapMutations(['setUser']),
    onSubmit() {
      this.loginUser(this.form)
        .then(result => {
          this.$bvToast.toast('Login Success!', {
            title: 'Notification',
            autoHideDelay: 1000
          })
          setTimeout(() => {
            this.$router.push('/home')
          }, 2000)
          console.log(result)
          this.getUserById(result.data.user_id)
        })
        .catch(error => {
          if (error.data.msg === 'Email / account is not registered') {
            this.alert = true
            this.isMsg = error.data.msg
            setTimeout(() => {
              this.alert = false
            }, 5000)
          }
        })
    },
    signUp() {
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped src="../assets/css/login.css"></style>
