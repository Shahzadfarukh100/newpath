<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs6 offset-xs3>
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
  import { wrapper } from '../modules/asyncWrapper';
  import { EventBus } from '../services/eventBus';

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
        const {error, data} = await wrapper(services.userService.create(user));
        if (error) {
          EventBus.$emit('showSnackbar', `There was an error signing up: ${error}`, 'bottom', null, 'error');
        } else {
          EventBus.$emit('showSnackbar', `You have successfully signed up! Please login now.`, 'bottom', null, 'success');
          this.$router.push('/login');
        }
      }
    }
  }
</script>
