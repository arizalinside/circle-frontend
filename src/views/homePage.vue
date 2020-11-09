<template>
  <div class="home">
    <b-container fluid class="bv-example-row">
      <b-row>
        <b-col sm="4" style="padding:0;">
          <List />
        </b-col>
        <!-- <b-col sm="4">
          <b-col sm="10" class="logo-text">Circle</b-col>
          <b-col sm="2" class="hamburger">
            <img src="@/assets/image/menu.png" />
          </b-col>
        </b-col> -->
        <b-col sm="8" style="padding:0;">
          <RoomChat />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import List from '../components/List'
import RoomChat from '../components/RoomChat'

export default {
  name: 'homePage',
  components: {
    List,
    RoomChat
  }
}
</script>
