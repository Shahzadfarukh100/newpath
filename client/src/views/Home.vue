<template>
  <v-container>
    <v-layout row wrap justify-center>
      <topnav></topnav>
      <v-flex xs12 row v-if="loggedIn">
        <pathfooter></pathfooter>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import topnav from '../components/GlobalNav';
  import pathfooter from '../components/GlobalFooter';

  export default {
    components: {
      topnav,
      pathfooter
    },
    props: ['user'],
    data() {
      return {
        loggedIn: !!window.localStorage.getItem('feathers-jwt'),
      }
    },
    mounted() {
      console.log('user', this.user);
    }
  }
</script>

<style scoped>
  .mountains {
    background-image: url('../assets/mountains-bg.png');
    background-size: cover;
    min-height: 200px;
  }
  .button-row {
    z-index: 2;
    background-color: #FFF;
    margin: -70px 10px 0 10px;
    padding: 5px;
  }
  .buttonTagline {
    color: #96c58d;
    font-size: 1.3rem;
    font-weight: bold;
  }
  .buttonTitle {
    color: #99e1f1;
    font-size: 2rem;
    font-weight: bolder;
  }
  .buttonDesc {
    color: #99e1f1;
    font-style: italic;
    font-weight: bold;
  }
  a {
    text-decoration: none;
  }
</style>
