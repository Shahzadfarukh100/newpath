<template>
  <v-app id="inspire">
    <!--
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-layout
            v-if="item.heading"
            :key="item.heading"
            row
            align-center
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              @click=""
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text" :to="item.link">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    -->
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">My New Path</span>
      </v-toolbar-title>
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
        <v-btn flat @click="nav('/admin')" v-if="isAdmin">
          <router-link to="/admin">
            Admin
          </router-link>
        </v-btn>
        <v-btn flat @click="nav('/logout')">
          <router-link to="/logout">
            Logout
          </router-link>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
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
  .application.theme--light {
    background: #ebf3e9 !important;
  }
  .application .theme--light.toolbar, .theme--light .toolbar {
    background-color: #ebf3e9 !important;
  }
  .container {
    padding-top: 0 !important;
  }
</style>
