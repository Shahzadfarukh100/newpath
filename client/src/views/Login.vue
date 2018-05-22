<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs6 offset-xs3>
        <h1>
          Login
        </h1>
        <v-text-field
          v-model="email"
          :type="email"
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
  export default {
    name: "home",
    data() {
      return {
        hidePassword: true,
        email: '',
        password: ''
      }
    },
    methods: {
      async login() {

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