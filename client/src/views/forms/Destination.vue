<template>
  <v-container>
    <v-layout row wrap justify-center>
      <topnav></topnav>
      <v-flex xs12 row>
        <v-card class="pa-5">
          <div class="text-xs-center">
            <h1>
              DESTINATION
            </h1>
          </div>
          <v-form
            name="destination"
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              label="What do you want to have accomplished in the next 5 years?"
              v-model="item.keyStatement"
              required
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="In five years, what do you want your Faith, relationship with God, to look like (i.e. Devotions, beliefs, prayer, church community, etc.)?"
              v-model="item.faith"
              required
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="In five years, what relationships do you have or hope to have? Who are they?"
              v-model="item.relationships"
              required
              hint="These relationships can include boss, family, friends, etc. This statement needs to be a positive statement to guide these relationships."
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="In five years, what do you want your reputation to be. How have you conducted yourself? What do you want people to say about you?"
              v-model="item.character"
              required
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="In five years, describe your health you desire to have?"
              v-model="item.health"
              required
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="In five years, where do you want your finances to be in a general sense (savings, debt, income, student loans, etc)?"
              v-model="item.finances"
              required
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="In five years, what do you hope to have accomplished for your career or job? What do you hope to be doing as your career or job?"
              v-model="item.vocation"
              required
              :rules="requiredRule"
            ></v-text-field>

            <p>
              Ask your friends these questions to understand yourself better. You can
              also ask them where they see you in these 6 realms in 5 years. You can
              also ask a friend these questions to help answer the above questions.
            </p>
            <v-text-field
              label="Ask a friend what traits you have that they believe would lead you to success in five years."
              v-model="item.traitsFriends"
            ></v-text-field>
            <v-text-field
              label="What traits did you agree with?"
              v-model="item.traitsAgree"
            ></v-text-field>
            <v-text-field
              label="Were there any traits that you were surprised to hear? If so, what were they?"
              v-model="item.traitsSurprised"
            ></v-text-field>
            <v-text-field
              label="Who are your role models? Is there someone whom you both want to emulate and think you could emulate? Why?"
              required
              v-model="item.roleModels"
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="Is there something that particularly burdens you or that you want to improve about the world?"
              required
              v-model="item.burdens"
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
    name: 'destination',
    props: ['user'],
    components: {
      topnav,
      pathfooter
    },
    data() {
      return {
        item: {
          userId: '',
          keyStatement: '',
          faith: '',
          relationships: '',
          character: '',
          health: '',
          finances: '',
          vocation: '',
          traitsAgree: '',
          traitsSuprised: '',
          roleModels: '',
          burdens: ''
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
        const {error, data} = await wrapper(services.goalsService.find({query: {userId: this.user._id}}));
        if (data && data.data.length > 0 && data.data[0]) {
          console.log('data', data);
          this.item = data.data[0];
        }
      },
      async submit() {
        console.log('item', this.item);
        this.item.userId = this.user._id;
        this.item.status = 'Complete';
        if (this.$refs.form.validate()) {
          const {error, data} = await wrapper(services.goalsService.create(this.item));
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

</style>
