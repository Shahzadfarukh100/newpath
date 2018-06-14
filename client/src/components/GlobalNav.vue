<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs12 v-if="!loggedIn">
        <v-card class="text-xs-center pa-5">
          <h1>
            My New Path
          </h1>
          <img src="http://via.placeholder.com/350x150">
          <p>
            To continue, please <a href="/login">login</a> or <a href="/signup">Signup</a> first.
          </p>
        </v-card>
      </v-flex>
      <v-flex xs12 v-else>
        <v-card class="text-xs-center pa-5 mountains">
          <img src="../assets/profile.png">
        </v-card>
        <v-container>
          <v-layout>
            <v-flex xs3 class="button-row text-xs-center" v-for="button in buttonItems" :key="button.tagline">
              <router-link :to="button.link">
                <div class="buttonTagline">{{ button.tagline }}</div>
                <div class="pt-2"><img :src="button.image"></div>
                <div class="buttonTitle">{{ button.title }}</div>
                <div class="buttonDesc">{{ button.description }}</div>
              </router-link>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'topnav',
    data() {
      return {
        loggedIn: !!window.localStorage.getItem('feathers-jwt'),
        buttonItems: [
          {
            link: '/destination',
            tagline: 'Where I want to go...',
            image: 'http://via.placeholder.com/150',
            title: 'DESTINATION',
            description: 'In 5 years, I want to be in charge of a non-profit organization that improves the lives of children in third-world countries.'
          }, {
            link: '/fuel',
            tagline: 'Why I want to do it...',
            image: 'http://via.placeholder.com/150',
            title: 'FUEL',
            description: 'Seeing other children in need makes me think of my own kids and how I would feel if I were the parent of a child who was suffering.'
          }, {
            link: '/journey',
            tagline: 'How I\'m going to do it...',
            image: 'http://via.placeholder.com/150',
            title: 'JOURNEY',
            description: 'TODAY, I will set daily reminders to lorem ipsum dolor sit amet, consecteur adiipiscing elit.'
          }, {
            link: '/guardrails',
            tagline: 'What will keep me on track...',
            image: 'http://via.placeholder.com/150',
            title: 'GUARD RAILS',
            description: 'Lorem ipsum dolor sit amet, consecteur adiipiscing elit.'
          }
        ]
      }
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
