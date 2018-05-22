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
          v-model="fName"
          label="First Name"
        ></v-text-field>
        <v-text-field
          v-model="lName"
          label="Last Name"
        ></v-text-field>
        <v-btn large @click="signup()" color="primary">
          Create an Account
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'signup',
    data() {
      return {
        hidePassword: true,
        email: '',
        password: '',
        fName: '',
        lName: ''
      }
    },
    methods: {
      
    }
  }
</script>