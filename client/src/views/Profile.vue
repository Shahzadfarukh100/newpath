<template>
  <v-layout row wrap justify-center>
    <v-flex xs12 md6 row>
      <br>
      <v-form
        name="profile"
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          label="First Name"
          v-model="user.fName"
        ></v-text-field>
        <v-text-field
          label="Last Name"
          v-model="user.lName"
        ></v-text-field>
        <v-text-field
          label="Email"
          v-model="user.email"
        ></v-text-field>
        <v-text-field
          label="To change your password, enter a new one here"
          type="password"
          v-model="user.password"
        ></v-text-field>
        <v-text-field
          label="Title"
          v-model="user.title"
        ></v-text-field>
        <v-text-field
          label="Personality Type"
          v-model="user.mbtiType"
        ></v-text-field>
        <v-btn color="primary" large @click="submit()">
          Save
        </v-btn>
        <v-btn flat @click="clear()">
          Cancel
        </v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
  import topnav from '../components/GlobalNav';
  import * as services from '../services';
  import wrapper from '../modules/asyncWrapper';
  import { EventBus } from '../services/eventBus';

  export default {
    name: 'profile',
    props: ['user'],
    components: {
      topnav
    },
    data() {
      return {
        user: {
          hidePassword: false,
          email: '',
          password: '',
          title: '',
          fName: '',
          lName: '',
          mbtiType: ''
        },
        valid: true,
        requiredRule: [
          (v) => !!v || 'This field is required'
        ]
      }
    },
    methods: {
      async fetch() {
        console.log('user', this.user);
        const {error, data} = await wrapper(services.userService.find({query: {userId: this.user._id}}));
        if (data && data.data.length > 0 && data.data[0]) {
          console.log('data', data);
          this.item = data.data[0];
        }
      },
      async submit() {
        if (!this.user.password) {
          delete this.user.password;
        }
        if (this.$refs.form.validate()) {
          const {error, data} = await wrapper(services.userService.patch(this.user._id, this.user));
          if (error) {
            EventBus.$emit('showSnackbar', `There was an error saving your data: ${error}`, 'bottom', null, 'error');
          } else {
            console.log('It is all there');
            EventBus.$emit('showSnackbar', `Your answers have been successfully saved!`, 'bottom', null, 'success');
          }
        }
      },
      clear() {
        this.$refs.form.reset();
      }
    },
    mounted() {
      if (!this.user || !this.user._id) {
        services.app.authenticate()
          .then(res => {
            console.log('res', res);
            this.user = res.user;
          })
          .then(() => {
            this.fetch();
          })
      } else {
        this.fetch();
      }
    }
  }
</script>

<style>

.toolbar__content {
display:none;
}

nav.toolbar {
height: 64px;
box-shadow: none;
}

button.back-btn {
display:block;
}

</style>
