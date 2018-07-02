<template>
  <v-container class="mt-3">
    <v-layout>
      <v-flex xs3>
        <router-link class="mb-3" to="/admin/users">
          User Results
        </router-link><br>
        <router-link to="/admin/blog">
          Blogs
        </router-link><br>
      </v-flex>
      <v-flex xs9>
        <v-card class="text-xs-center pa-4 mb-3">
          <h1>
            Admin
          </h1>
          <div>
            Welcome to the admin section! Here you can see user and blog counts
            in addition to adding new blogs and seeing user form results.
          </div>
        </v-card>
        <v-container>
          <v-layout>
            <v-flex xs6 class="mr-2">
              <v-card class="text-xs-center pa-4">
                <h1>
                  Users<br>
                  {{ userCount }}
                </h1>
              </v-card>
            </v-flex>
            <v-flex xs6>
              <v-card class="text-xs-center pa-4">
                <h1>
                  Blogs<br>
                  {{ blogCount }}
                </h1>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import * as services from '../services';
  import wrapper from '../modules/asyncWrapper';
  import { EventBus } from '../services/eventBus';

  export default {
    name: 'admin',
    data() {
      return {
        userCount: 0,
        blogCount: 0
      }
    },
    methods: {
      async countUsers() {
        const {error, data} = await wrapper(services.userService.find());
        if (error) {
          EventBus.$emit('showSnackbar', 'bottom', null, `There was an issue loading users: ${err}`, 'error');
        }
        this.userCount = data.data.length;
        console.log('users', this.userCount);
      },
      async countBlogs() {
        const {error, data} = await wrapper(services.blogService.find());
        if (error) {
          EventBus.$emit('showSnackbar', 'bottom', null, `There was an issue loading users: ${err}`, 'error');
        }
        this.blogCount = data.data.length;
        console.log('blogs', this.blogCount);
      }
    },
    mounted() {
      this.countUsers();
      this.countBlogs();
    }
  }
</script>

<style scoped>
  a {
    font-size: 1.3rem;
  }
</style>
