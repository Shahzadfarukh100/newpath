<template>
  <v-container>
    <v-layout row wrap justify-center>
      <topnav></topnav>
      <v-flex xs12 row>
        <v-card class="pa-5">
          <div class="text-xs-center">
            <h1>
              FUEL
            </h1>
          </div>
          <v-form
            name="destination"
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              label="What motivates you? What gets and keeps you going even in hard times?"
              required
              v-model="item.keyStatement"
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="Why do think God made you with your unique design?"
              v-model="item.uniqueDesign"
              required
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="What do you believe your purpose is on this earth?"
              v-model="item.purpose"
              required
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="What are you passionate about?"
              v-model="item.passions"
              required
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="What causes or issues are you drawn to?"
              v-model="item.causes"
              required
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="Who are the people who inspire you?"
              v-model="item.inspirations"
              required
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="What people in your life bring hope into your life and future?"
              v-model="item.hopes"
              required
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="Ask a friend what or who emotionally stirs you? What puts 'fire' in your soul?"
              v-model="item.stirring"
              required
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="Ask a friend what you talk the most about and 'invest' (time, money, etc) in."
              required
              v-model="item.invest"
              :rules="requiredRule"
            ></v-text-field>
            <v-btn color="primary" large @click="submit()">
              Save
            </v-btn>
            <v-btn flat @click="clear()">
              Cancel
            </v-btn>
          </v-form>
        </v-card>
      </v-flex>
      <v-flex xs12 row>
        <pathfooter></pathfooter>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import topnav from '../../components/GlobalNav';
  import pathfooter from '../../components/GlobalFooter';
  import * as services from '../../services';
  import wrapper from '../../modules/asyncWrapper';
  import { EventBus } from '../../services/eventBus';

  export default {
    name: 'fuel',
    props: ['user'],
    components: {
      topnav,
      pathfooter
    },
    data() {
      return {
        item: {
          userId: '',
          uniqueDesign: '',
          purpose: '',
          passions: '',
          causes: '',
          inspirations: '',
          hopes: '',
          stirring: '',
          invest: '',
          keyStatement: ''
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
        const {error, data} = await wrapper(services.fuelService.find({query: {userId: this.user._id}}));
        if (data && data.data.length > 0 && data.data[0]) {
          console.log('data', data);
          this.item = data.data[0];
        }
      },
      async submit() {
        console.log('item', this.item);
        this.item.userId = this.user._id;
        if (this.$refs.form.validate()) {
          const {error, data} = await wrapper(services.fuelService.create(this.item));
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
      console.log('item', this.item);
      if (!this.user) {
        services.app.authenticate()
          .then(res => {
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

</style>
