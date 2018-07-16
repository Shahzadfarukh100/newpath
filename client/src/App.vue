<template>
  <v-app id="inspire">
    <!--
    <transition name="slide-fade" appear>
    -->
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      fixed
    >
    <div v-if="['home'].indexOf($route.name) > -1" style="width: 100%; display:block; position: absolute; top: 35px; text-align: center; margin: 0;">
      <div style="width: 60px; height: 60px; color: #8FC186; background: #ebf3e9; display:block; text-align: center; border-radius: 30px; border: 3px solid #8FC186; margin: 0 auto; ">
        <span style="display: inline-block; margin: 4px auto 0; text-align: center; font-size: 32px; font-weight: bold;">HP</span>
      </div>
    </div>
      <v-btn flat class="back-btn" @click="nav('/')" v-if="['destination', 'fuel', 'journey', 'guardrails', 'admin', 'users'].indexOf($route.name) > -1">
        <router-link to="/">
          <v-icon>keyboard_arrow_left</v-icon>
        </router-link>
      </v-btn>
      <v-btn flat @click="nav('/admin')" v-if="isAdmin">
        <router-link to="/admin">
          Admin
        </router-link>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down" v-if="!loggedIn">
        <v-btn flat @click="nav('/login')">
          <router-link to="/login">
            Login
          </router-link>
        </v-btn>
        <v-btn flat @click="nav('/signup')">
          <router-link to="/signup">
            Signup
          </router-link>
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-sm-and-down" v-else>
        <v-btn flat @click="nav('/')">
          <router-link to="/">
            <v-icon>get_app</v-icon>
          </router-link>
        </v-btn>
        <v-btn flat @click="nav('/logout')">
          <router-link to="/logout">
            <v-icon>exit_to_app</v-icon>
          </router-link>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height main-container>
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
    </transition>
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
      },
      isAdmin() {
        return (this.user && this.user.roles.includes('admin'));
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
  body {
  background: #ebf3e9 !important;
  }
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
  .container.main-container {
    padding: 0 16px 16px !important;
  }
  .mountains {
    margin-left: -16px;
    margin-right: -16px;
    box-shadow: none !important;
    -webkit-box-shadow: none !important;
    border-radius: 0 !important;
  }
  h2 {
    font-weight:normal;
    color: #96c58d;
  }
  .slide-fade-enter-active {
   transition: all .3s ease;
  }
  .slide-fade-leave-active {
     transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to {
     transform: translateX(10px);
     opacity: 0;
   }
   button.back-btn {
   display:none;
   }
   nav.toolbar a {
   text-decoration: none;
   color: #8FC186;
   }
   .card.home-card {
    height: 275px !important;
   }
</style>
