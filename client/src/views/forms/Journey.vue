<template>
  <v-container>
    <v-layout row wrap justify-center>
      <topnav v-if="!admin"></topnav>
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
              v-if="type === 'edit'"
            ></v-text-field>
            <div v-else>
              What do I accomplish in a day? How does my daily lifestyle impact my future and achieve my goals?<br/>
              {{ item.keyStatement }}
            </div>

            <v-text-field
              label="How do I daily build my faith?"
              v-model="item.faith"
              required
              :rules="requiredRule"
              v-if="type === 'edit'"
            ></v-text-field>
            <div v-else>
              How do I daily build my faith?<br/>
              {{ item.faith }}
            </div>

            <v-text-field
              label="How do I strengthen my important relationships each day?"
              v-model="item.relationships"
              required
              :rules="requiredRule"
              v-if="type === 'edit'"
            ></v-text-field>
            <div v-else>
              How do I strengthen my important relationships each day?<br/>
              {{ item.relationships }}
            </div>

            <v-text-field
              label="What areas of my character need to be improved, and how do I work on them daily?"
              v-model="item.character"
              required
              :rules="requiredRule"
              v-if="type === 'edit'"
            ></v-text-field>
            <div v-else>
              What areas of my character need to be improved, and how do I work on them daily?<br/>
              {{ item.character }}
            </div>

            <v-text-field
              label="What are my daily habit that produce a physically healthy lifestyle?"
              v-model="item.health"
              required
              :rules="requiredRule"
              v-if="type === 'edit'"
            ></v-text-field>
            <div v-else>
              What are my daily habit that produce a physically healthy lifestyle?<br/>
              {{ item.health }}
            </div>

            <v-text-field
              label="How does my daily/ monthly spending and saving support my financial Destination goals?"
              v-model="item.finances"
              required
              :rules="requiredRule"
              v-if="type === 'edit'"
            ></v-text-field>
            <div v-else>
              How does my daily/ monthly spending and saving support my financial Destination goals?<br/>
              {{ item.finances }}
            </div>

            <v-text-field
              label="What do activities do I complete daily or regularly to improve my skills for my vocation?"
              v-model="item.vocation"
              required
              :rules="requiredRule"
              v-if="type === 'edit'"
            ></v-text-field>
            <div v-else>
              What do activities do I complete daily or regularly to improve my skills for my vocation?<br/>
              {{ item.vocation }}
            </div>

            <p>
              If you are still struggling to answer these questions to create your LifeMap&copy; destination, try this project.
            </p>
            <v-text-field
              label="What does a perfect day look like for you?"
              v-model="item.perfectDay"
              hint="This should not be a vacation day, holiday, or 'day at the beach.' This should be a regular day in your vocation."
              v-if="type === 'edit'"
            ></v-text-field>
            <div v-else>
              What does a perfect day look like for you?<br/>
              {{ item.perfectDay }}
            </div>

            <p>
              What are some things that you need to add or change in your regular
              habits that could produce your "perfect day" more frequently?
            </p>
            <v-text-field
              label="Things to add"
              v-model="item.addHabits"
              v-if="type === 'edit'"
            ></v-text-field>
            <div v-else>
              Things to add<br/>
              {{ item.addHabits }}
            </div>

            <v-text-field
              label="Things to change"
              v-model="item.changeHabits"
              v-if="type === 'edit'"
            ></v-text-field>
            <div v-else>
              Things to change<br/>
              {{ item.changeHabits }}
            </div>

            <p>
              Ask your friends these questions to understand yourself better. You can
              also ask them where they see you in these 6 realms in 5 years. You can
              also ask a friend these questions to help answer the above questions.
            </p>
            <v-text-field
              label="Ask a friend what strengths and habits support your goals for 5 years from now."
              v-model="item.strengths"
              v-if="type === 'edit'"
            ></v-text-field>
            <div v-else>
              Ask a friend what strengths and habits support your goals for 5 years from now.<br/>
              {{ item.strengths }}
            </div>

            <v-text-field
              label="What habits are positive for your lifestyle and Destination?"
              required
              v-model="item.positiveHabits"
              :rules="requiredRule"
              v-if="type === 'edit'"
            ></v-text-field>
            <div v-else>
              What habits are positive for your lifestyle and Destination?<br/>
              {{ item.positiveHabits }}
            </div>

            <v-text-field
              label="What habits could hold you back, and how can you eliminate or minimalize them?"
              required
              v-model="item.negativeHabits"
              :rules="requiredRule"
              v-if="type === 'edit'"
            ></v-text-field>
            <div v-else>
              What habits could hold you back, and how can you eliminate or minimalize them?<br/>
              {{ item.negativeHabits }}
            </div>

            <div v-if="!admin">
              <div v-if="type === 'edit'">
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
        </v-card>
      </v-flex>
      <v-flex xs12 row v-if="!admin">
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
          perfectDay: '',
          addHabits: '',
          changeHabits: '',
          strengths: '',
          positiveHabits: '',
          negativeHabits: ''
        },
        type: 'edit',
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
          this.type = 'view';
        }
      },
      async submit() {
        console.log('item', this.item);
        this.item.userId = this.user._id;
        this.item.status = 'Complete';
        if (this.$refs.form.validate()) {
          if (this.item._id) {
            const {error, data} = await wrapper(services.destinationService.patch(this.item._id, this.item));
            if (error) {
              EventBus.$emit('showSnackbar', `There was an error updating your data: ${error}`, 'bottom', null, 'error');
            } else {
              console.log('It is all there');
              EventBus.$emit('showSnackbar', `Your answers have been successfully updated!`, 'bottom', null, 'success');
              this.type = 'view';
            }
          } else {
            const {error, data} = await wrapper(services.destinationService.create(this.item));
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
