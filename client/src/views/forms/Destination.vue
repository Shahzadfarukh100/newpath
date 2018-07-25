<template>
  <v-layout row wrap justify-center>
    <v-flex xs12 md6 row>
      <v-card style="padding: 16px;" v-if="!admin">
        <div class="text-xs-center card-title buttonTagline">
          Where I want to go...
        </div>
        <v-flex xs6 md4 offset-xs3 offset-md4>
          <v-card-media
            height="200"
            width="100%"
            src="/img/destination.svg"
            contain
          >
          </v-card-media>
        </v-flex>
        <v-card-text class="text-xs-center">
          <h1 class="buttonTitle">
            DESTINATION
          </h1>
        </v-card-text>
      </v-card>
      <br>
      <v-form
        name="destination"
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <div class="text-xs-center">
          <h2>Goal Statement</h2>
        </div>
        <div class="text-xs-center">
          <p>What do you want to have accomplished in the next 5 years?</p>
        </div>
        <v-text-field
          label=""
          v-model="item.keyStatement"
          required
          :rules="requiredRule"
          v-if="this.type === 'edit'"
        ></v-text-field>
        <div v-else>
          {{ item.keyStatement }}
        </div>

        <div class="text-xs-center">
          <h2>Life Criticals</h2>
        </div>
        <h3>Faith</h3>
        <p>In five years, what do you want your Faith, relationship with God, to look like (i.e. Devotions, beliefs, prayer, church community, etc.)?</p>
        <v-text-field
          label=""
          v-model="item.faith"
          required
          :rules="requiredRule"
          v-if="this.type === 'edit'"
        ></v-text-field>
        <div v-else>
          {{ item.faith }}
        </div>

        <h3>Relationships</h3>
        <p>In five years, what relationships do you have or hope to have? Who are they?</p>
        <v-text-field
          label=""
          v-model="item.relationships"
          required
          hint="These relationships can include boss, family, friends, etc. This statement needs to be a positive statement to guide these relationships."
          :rules="requiredRule"
          v-if="this.type === 'edit'"
        ></v-text-field>
        <div v-else>
          {{ item.relationships }}
        </div>

        <h3>Character</h3>
        <p>In five years, what do you want your reputation to be. How have you conducted yourself? What do you want people to say about you?</p>
        <v-text-field
          label=""
          v-model="item.character"
          required
          :rules="requiredRule"
          v-if="this.type === 'edit'"
        ></v-text-field>
        <div v-else>
          {{ item.character }}
        </div>

        <h3>Health</h3>
        <p>In five years, describe your health you desire to have?</p>
        <v-text-field
          label=""
          v-model="item.health"
          required
          :rules="requiredRule"
          v-if="this.type === 'edit'"
        ></v-text-field>
        <div v-else>
          {{ item.health }}
        </div>

        <div class="text-xs-center">
          <h2>Life Aides</h2>
        </div>
        <h3>Finances</h3>
        <p>In five years, where do you want your finances to be in a general sense (savings, debt, income, student loans, etc)?</p>
        <v-text-field
          label=""
          v-model="item.finances"
          required
          :rules="requiredRule"
          v-if="this.type === 'edit'"
        ></v-text-field>
        <div v-else>
          {{ item.finances }}
        </div>

        <h3>Vocation</h3>
        <p>In five years, what do you hope to have accomplished for your career or job? What do you hope to be doing as your career or job?</p>
        <v-text-field
          label=""
          v-model="item.vocation"
          required
          :rules="requiredRule"
          v-if="this.type === 'edit'"
        ></v-text-field>
        <div v-else>
          {{ item.vocation }}
        </div>

        <div class="text-xs-center">
          <h2>Optional Additional Help</h2>
        </div>
        <p>
          Ask your friends these questions to understand yourself better. You can
          also ask them where they see you in these 6 realms in 5 years. You can
          also ask a friend these questions to help answer the above questions.
        </p>
        <p>Ask a friend what traits you have that they believe would lead you to success in five years.</p>
        <v-text-field
          label=""
          v-model="item.traitsFriends"
          v-if="this.type === 'edit'"
        ></v-text-field>
        <div v-else>
          {{ item.traitsFriends }}
        </div>

        <p>What traits did you agree with?</p>
        <v-text-field
          label=""
          v-model="item.traitsAgree"
          v-if="this.type === 'edit'"
        ></v-text-field>
        <div v-else>
          {{ item.traitsAgree }}
        </div>

        <p>Were there any traits that you were surprised to hear? If so, what were they?</p>
        <v-text-field
          label=""
          v-model="item.traitsSurprised"
          v-if="this.type === 'edit'"
        ></v-text-field>
        <div v-else>
          {{ item.traitsSuprised }}
        </div>

        <p>Who are your role models? Is there someone whom you both want to emulate and think you could emulate? Why?</p>
        <v-text-field
          label=""
          required
          v-model="item.roleModels"
          :rules="requiredRule"
          v-if="this.type === 'edit'"
        ></v-text-field>
        <div v-else>
          {{ item.roleModels }}
        </div>

        <p>Is there something that particularly burdens you or that you want to improve about the world?</p>
        <v-text-field
          label=""
          required
          v-model="item.burdens"
          :rules="requiredRule"
          v-if="this.type === 'edit'"
        ></v-text-field>
        <div v-else>
          {{ item.burdens }}
        </div>
        <div v-if="!admin">
          <div v-if="this.type === 'edit'">
            <v-btn color="primary" large @click="submit()">
              Save
            </v-btn>
            <v-btn flat @click="clear()">
              Cancel
            </v-btn>
          </div>
          <div v-else>
            <v-btn color="primary" large @click="type = 'edit'">
              Edit
            </v-btn>
          </div>
        </div>
      </v-form>
    </v-flex>
    <v-flex xs12 row v-if="!admin">
      <pathfooter></pathfooter>
    </v-flex>
  </v-layout>
</template>

<script>
  import topnav from '../../components/GlobalNav';
  import pathfooter from '../../components/GlobalFooter';
  import * as services from '../../services';
  import wrapper from '../../modules/asyncWrapper';
  import { EventBus } from '../../services/eventBus';

  export default {
    name: 'destination',
    props: ['user', 'admin'],
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
        ],
        type: 'edit'
      }
    },
    methods: {
      async fetch() {
        console.log('user', this.user);
        const {error, data} = await wrapper(services.goalsService.find({query: {userId: this.user._id}}));
        if (data && data.data.length > 0 && data.data[0]) {
          console.log('data', data);
          this.item = data.data[0];
          this.type = 'view';
        }
      },
      async submit() {
        console.log('item', this.item);
        this.item.userId = this.user._id;
        this.item.status = 'Complete';
        if (this.$refs.form.validate()) {
          if (this.item._id) {
            console.log('There is an id!');
            const {error, data} = await wrapper(services.goalsService.patch(this.item._id, this.item));
            if (error) {
              EventBus.$emit('showSnackbar', `There was an error updating your data: ${error}`, 'bottom', null, 'error');
            } else {
              console.log('It is all there');
              EventBus.$emit('showSnackbar', `Your answers have been successfully updated!`, 'bottom', null, 'success');
              this.type = 'view';
            }
          } else {
            console.log('Starting fresh');
            const {error, data} = await wrapper(services.goalsService.create(this.item));
            if (error) {
              EventBus.$emit('showSnackbar', `There was an error saving your data: ${error}`, 'bottom', null, 'error');
            } else {
              console.log('It is all there');
              EventBus.$emit('showSnackbar', `Your answers have been successfully saved!`, 'bottom', null, 'success');
              this.type = 'view';
            }
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
