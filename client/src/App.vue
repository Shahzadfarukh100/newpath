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
    <div v-if="['home'].indexOf($route.name) > -1" style="width: 100%; display:block; position: absolute; top: 3px; text-align: center; margin: 0;" id="profile-link">
      <div class="profile-button" style="width: 80px; height: 80px; color: #54AD62; background: #ffffff; display:block; text-align: center; border-radius: 50px; border: 3px solid #54AD62; margin: 0 auto; opacity: .75; ">
        <span style="display: inline-block; margin: 4px auto 0; text-align: center; font-size: 10px; font-weight: bold; position: relative; top: 10px;"><router-link to="/profile">
<strong>{{ user.fName }}<br>{{ user.lName }}</strong><br>{{ user.mbtiType }}</router-link>
</span>
      </div>
    </div>
    <v-toolbar-items class="" v-if="!loggedIn">
    </v-toolbar-items>
    <v-toolbar-items class="" v-else>
      <v-tooltip bottom v-if="['destination', 'fuel', 'journey', 'guardrails', 'admin', 'users', 'profile'].indexOf($route.name) > -1">
        <v-btn slot="activator" flat class="back-btn" @click="nav('/')">
          <router-link to="/">
            <v-icon>home</v-icon>
          </router-link>
        </v-btn>
        <span>Home</span>
      </v-tooltip>
      <v-btn flat @click="nav('/admin')" v-if="isAdmin">
        <router-link to="/admin">
          Admin
        </router-link>
      </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items class="" v-if="!loggedIn">
        <v-tooltip bottom>
          <v-btn slot="activator" flat @click="nav('/login')">
            <router-link to="/login">
              Login
            </router-link>
          </v-btn>
          <span>Login</span>
        </v-tooltip>
        <v-tooltip bottom>
          <v-btn slot="activator" flat @click="nav('/signup')">
            <router-link to="/signup">
              Signup
            </router-link>
          </v-btn>
          <span>Sign Up</span>
        </v-tooltip>
      </v-toolbar-items>
      <v-toolbar-items class="" v-else>
        <v-tooltip bottom>
          <v-btn slot="activator" flat @click="nav('/logout')">
            <router-link to="/logout">
              <v-icon>exit_to_app</v-icon>
            </router-link>
          </v-btn>
          <span>Logout</span>
        </v-tooltip>

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
      user: {}
    }),
    props: {
      source: String,
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
  button.primary {
  background-color: #06B7DF !important;
  border-color: #06B7DF !important;
  }
  .profile-button {
  -webkit-box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
  box-shadow:  0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
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
    color: #54AD62;
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
   color: #54AD62;
   }
   .card.home-card {
    height: 295px !important;
    padding: 15px !important;
   }
   .card.home-card:after {
    content: "...";
    color: #06B7DF;
   }
   .buttonTagline {
     color: #54AD62;
     font-size: 1.3rem;
   }
   .buttonTitle {
     color: #06B7DF;
     font-size: 2rem;
     font-weight: bolder;
   }
   .buttonDesc {
     color: #06B7DF;
     font-style: italic;
   }

   .buttonDesc[data-v-2f29c300] {
   height: 60px;
   overflow: hidden;
   }

   h3.faith {
    background: url(/img/icons/MyNewPath_AppIcons_Faith.png) no-repeat center left;
    background-size: 30px;
    padding: 15px 40px 10px;
   }

   h3.relationships {
    background: url(/img/icons/MyNewPath_AppIcons_Relationships.png) no-repeat center left;
    background-size: 30px;
    padding: 15px 40px 10px;
    margin-top: 15px;
   }

   h3.character {
    background: url(/img/icons/MyNewPath_AppIcons_MyCharacter.png) no-repeat center left;
    background-size: 30px;
    padding: 15px 40px 10px;
    margin-top: 15px;
   }

   h3.health {
    background: url(/img/icons/MyNewPath_AppIcons_Health.png) no-repeat center left;
    background-size: 30px;
    padding: 15px 40px 10px;
    margin-top: 15px;
   }

   h3.finances {
    background: url(/img/icons/MyNewPath_AppIcons_Finances.png) no-repeat center left;
    background-size: 30px;
    padding: 15px 40px 10px;
    margin-top: 15px;
   }

   h3.vocation {
    background: url(/img/icons/MyNewPath_AppIcons_Work.png) no-repeat center left;
    background-size: 30px;
    padding: 15px 40px 10px;
    margin-top: 15px;
   }

   .form-view {
   font-style: italic;
   }

   .form-view .form-card {
   font-style: normal;
   }

   .form-view h2 {
   margin-top: 24px;
   font-style: normal;
   }

   .form-view h3 {
   font-style: normal;
   }

   .form-view p {
   margin: 16px 0;
   font-weight: bold;
   font-style: normal;
   }

   .form-view button {
   margin: 24px 0 0;
   font-style: normal;
   }

   .form-card {
   padding: 16px;
   margin-top: 24px;
   }
   
</style>
