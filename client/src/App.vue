<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex xs12>
            <router-view :user="user"></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-snackbar
      :text="message"
      :top="y === 'top'"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :right="x === 'right'"
      :color="color"
      v-model="snackbar"
    >
      {{ message }}
      <v-btn flat dark @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
  import { EventBus } from './services/eventBus';
  import * as services from './services';
  import wrapper from './modules/asyncWrapper';

  export default {
    data: () => ({
      dialog: false,
      drawer: null,
      items: [
        { icon: 'account_circle', text: 'Login', link: '/login' },
        { icon: 'format_align_left', text: 'Form' }
      ],
      loggedIn: !!window.localStorage.getItem('feathers-jwt'),
      snackbar: false,
      message: '',
      y: 'bottom',
      x: null,
      color: '',
      user: null
    }),
    props: {
      source: String
    },
    methods: {
      nav(page) {
        this.$router.push(page);
        if (page === '/logout') {
          this.showSnackbar('You have been logged out', 'bottom', null, 'success');
        }
      },
      showSnackbar(text, yPos = 'bottom', xPos, color) {
        this.message = text;
        this.y = yPos;
        this.x = xPos;
        this.color = color;
        this.snackbar = true;
      },
      checkAuth() {
        this.loggedIn = !!window.localStorage.getItem('feathers-jwt');
      },
      async authenticate() {
        const {error, data} = await wrapper(services.app.authenticate());
        if (error) {
          this.$router.push('/login');
        }
        if (data) {
          this.user = data.user;
        }
      }
    },
    mounted() {
      EventBus.$on('showSnackbar', (text, yPos, xPos, color) => {
        this.showSnackbar(text, yPos, xPos, color);
      });
      this.authenticate();
    },
    watch: {
      '$route': 'checkAuth'
    }
  }
</script>

<style>
  .application.theme--light {
    background: #ebf3e9 !important;
  }
  .application .theme--light.toolbar, .theme--light .toolbar {
    background-color: #ebf3e9 !important;
  }
  .container {
    padding: 0 !important;
    max-width: 100% !important;
  }
</style>
