<template>
  <v-container>
    <v-layout row wrap justify-center>
      <topnav></topnav>
      <v-flex xs12 row>
        <v-card class="pa-5">
          <div class="text-xs-center">
            <h1>
              JOURNEY
            </h1>
          </div>
          <v-form
            name="destination"
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              label="What do I accomplish in a day? How does my daily lifestyle impact my future and achieve my goals?"
              v-model="item.keyStatement"
              required
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="How do I daily build my faith?"
              v-model="item.faith"
              required
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="How do I strengthen my important relationships each day?"
              v-model="item.relationships"
              required
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="What areas of my character need to be improved, and how do I work on them daily?"
              v-model="item.character"
              required
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="What are my daily habit that produce a physically healthy lifestyle?"
              v-model="item.health"
              required
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="How does my daily/ monthly spending and saving support my financial Destination goals?"
              v-model="item.finances"
              required
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="What do activities do I complete daily or regularly to improve my skills for my vocation?"
              v-model="item.vocation"
              required
              :rules="requiredRule"
            ></v-text-field>

            <p>
              If you are still struggling to answer these questions to create your LifeMap&copy; destination, try this project.
            </p>
            <v-text-field
              label="What does a perfect day look like for you?"
              v-model="item.perfectDay"
              hint="This should not be a vacation day, holiday, or 'day at the beach.' This should be a regular day in your vocation."
            ></v-text-field>

            <p>
              What are some things that you need to add or change in your regular
              habits that could produce your "perfect day" more frequently?
            </p>
            <v-text-field
              label="Things to add"
              v-model="item.addHabits"
            ></v-text-field>
            <v-text-field
              label="Things to change"
              v-model="item.changeHabits"
            ></v-text-field>

            <p>
              Ask your friends these questions to understand yourself better. You can
              also ask them where they see you in these 6 realms in 5 years. You can
              also ask a friend these questions to help answer the above questions.
            </p>
            <v-text-field
              label="Ask a friend what strengths and habits support your goals for 5 years from now."
              v-model="item.strengths"
            ></v-text-field>
            <v-text-field
              label="What habits are positive for your lifestyle and Destination?"
              required
              v-model="item.positiveHabits"
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="What habits could hold you back, and how can you eliminate or minimalize them?"
              required
              v-model="item.negativeHabits"
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
          perfectDay: '',
          addHabits: '',
          changeHabits: '',
          strengths: '',
          positiveHabits: '',
          negativeHabits: ''
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
        const {error, data} = await wrapper(services.destinationService.find({query: {userId: this.user._id}}));
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
          const {error, data} = await wrapper(services.destinationService.create(this.item));
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
