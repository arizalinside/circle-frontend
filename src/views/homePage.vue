<template>
  <div class="home">
    <b-container fluid class="bv-example-row">
      <b-row>
        <List />
        <!-- <b-col sm="4">
          <b-col sm="10" class="logo-text">Circle</b-col>
          <b-col sm="2" class="hamburger">
            <img src="@/assets/image/menu.png" />
          </b-col>
        </b-col> -->
        <Room />
      </b-row>
    </b-container>
  </div>
</template>

<script>
import List from '../components/List'
import Room from '../components/Room'

export default {
  name: 'homePage',
  components: {
    List,
    Room
  }
}
</script>
