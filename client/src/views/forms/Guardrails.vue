<template>
  <v-container>
    <v-layout row wrap justify-center>
      <topnav></topnav>
      <v-flex xs12 row>
        <v-card class="pa-5">
          <div class="text-xs-center">
            <h1>
              GUARDRAILS
            </h1>
          </div>
          <v-form
            name="destination"
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              label="What does my life need to focus on?"
              v-model="item.keyStatement"
              required
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="Do you have any threats to your Faith that could pull you away from your goal Destination?"
              v-model="item.faith"
              required
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="Do you have any current Relationships that do not align with or may pull you off track from you relationship goals?"
              v-model="item.relationships"
              required
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="Character increases our capacity and enables us to strive for goals. What area of your character needs to be strengthened?"
              v-model="item.character"
              required
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="What could hinder you to achieve your Health goals?"
              v-model="item.health"
              required
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="In your Finances, what are some things that you tend to purchase without budgeting?"
              v-model="item.finances"
              required
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="Do you have a clear goal for your Vocation in 5 years? If so, what is it?"
              v-model="item.vocation"
              required
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="What are some 'threats' that pull you off track or lead you away from accomplishing goals?"
              required
              v-model="item.goalThreats"
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="What are things that help you stay focused?"
              required
              v-model="item.focusItems"
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="Do you have a pitfall that you may struggle with?"
              required
              v-model="item.pitfalls"
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="What are the things that really encourage me to 'do what is right'?"
              required
              v-model="item.encouragement"
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="Do I have any consistent tendencies or choices that cause me problems (blind spots)?"
              required
              v-model="item.tendencies"
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="Do you agree with the answers and would you add anything else?"
              required
              v-model="item.agreements"
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="What principles protect most of your LifeCriticals?"
              required
              v-model="item.principles"
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="What do you expect the outcome to be with this guardrail?"
              required
              v-model="item.expectedOutcome"
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
    name: 'guardrails',
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
          goalThreats: '',
          focusItems: '',
          encouragement: '',
          pitfalls: '',
          tendencies: '',
          agreements: '',
          principles: '',
          expectedOutcome: ''
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
        const {error, data} = await wrapper(services.guardrailsService.find({query: {userId: this.user._id}}));
        if (data && data.data.length > 0 && data.data[0]) {
          console.log('data', data);
          this.item = data.data[0];
        }
      },
      async submit() {
        console.log('item', this.item);
        this.item.userId = this.user._id;
        if (this.$refs.form.validate()) {
          const {error, data} = await wrapper(services.guardrailsService.create(this.item));
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
  .input-group label {
    text-overflow: unset !important;
    overflow: visible !important;
  }
</style>
