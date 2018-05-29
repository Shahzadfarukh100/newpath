<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs6 offset-xs3>
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
        <v-text-field
          v-model="title"
          label="Title"
        ></v-text-field>
        <v-text-field
          v-model="fName"
          label="First Name"
        ></v-text-field>
        <v-text-field
          v-model="lName"
          label="Last Name"
        ></v-text-field>
        <v-btn large @click.native="signup()" color="primary">
          Create an Account
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import * as services from '../services';

  export default {
    name: 'signup',
    data() {
      return {
        hidePassword: true,
        email: '',
        password: '',
        title: '',
        fName: '',
        lName: ''
      }
    },
    methods: {
      async signup() {
        const user = {
          email: this.email,
          password: this.password,
          title: this.title,
          fName: this.fName,
          lName: this.lName
        };
        let request = await services.userService.create(user);
        console.log('request', request);
      }
    }
  }
</script>
