<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs6 offset-xs3>
        <h1>
          Login
        </h1>
        <v-text-field
          v-model="email"
          label="Email Address"
        >
        </v-text-field>
        <v-text-field
          v-model="password"
          :type="hidePassword ? 'password' : 'text'"
          label="Password"
          :append-icon="hidePassword ? 'visibility_off': 'visibility'"
          :append-icon-cb="() => (hidePassword = !hidePassword)"
        ></v-text-field>
        <v-btn @click="login()">
          Login
        </v-btn>
        <v-spacer></v-spacer>
        <div class="mt-5">
          <router-link to="/signup" class="signup mt-3">Sign up</router-link>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import * as services from '../services';
  import wrapper from '../modules/asyncWrapper';
  import { EventBus } from '../services/eventBus';

  export default {
    name: "home",
    data() {
      return {
        hidePassword: true,
        email: '',
        password: '',
        color: '',
        message: '',
        show: false
      }
    },
    methods: {
      async login() {
        const user = {
          strategy: 'local',
          email: this.email,
          password: this.password
        };
        const {err, data} = await wrapper(services.app.authenticate(user));
        if (err) {
          EventBus.$emit('showSnackbar', `There was an error logging in: ${err}`, 'bottom', null, 'error');
        } else {
          EventBus.$emit('showSnackbar', 'Successfully logged in', 'bottom', null, 'success');
          this.$router.push({ path: '/' });
        }
      }
    }
  };
</script>

<style scoped>
  .signup {
    font-size: 1.8rem;
    text-decoration: none;
    font-weight: bold;
  }
</style>
