<template>
    <v-layout row wrap justify-center>
    <topnav class="hidden-sm-and-down" v-if="!admin"></topnav>
      <v-flex xs12 md6 row form-view>
          <v-form
            name="destination"
            ref="form"
            v-model="valid"
            lazy-validation
          >
          <v-card class="form-card" v-if="!admin">
            <v-card-text class="text-xs-center">
              <h1 class="buttonTitle">
                JOURNEY
              </h1>
            </v-card-text>
            <v-flex xs6 md4 offset-xs3 offset-md4>
              <v-card-media
              height="200"
              width="100%"
              src="/img/journey.svg"
              contain
              >
              </v-card-media>
            </v-flex>
            <v-card-text class="text-xs-center">
              <div class="text-xs-center card-title buttonTagline">
              How I'm going to do it...
              </div>
              <div class="text-xs-center buttonDesc">
                <v-text-field
                  label="What I accomplish in a day. How my daily lifestyle impacts my future and my goals."
                  v-model="item.keyStatement"
                  required
                  :rules="requiredRule"
                  v-if="type === 'edit'"
                ></v-text-field>
                <div v-else>
                  {{ item.keyStatement }}
                </div>
              </div>
            </v-card-text>
          </v-card>
            <br>
            <div class="text-xs-center">
              <h2>Life Criticals</h2>
            </div>
            <h3 class="faith">Faith</h3>
            <p>How do I daily build my faith?</p>
            <v-text-field
              label=""
              v-model="item.faith"
              required
              :rules="requiredRule"
              v-if="type === 'edit'"
            ></v-text-field>
            <div v-else>
              {{ item.faith }}
            </div>

            <h3 class="relationships">Relationships</h3>
            <p>How do I strengthen my important relationships each day?</p>
            <v-text-field
              label=""
              v-model="item.relationships"
              required
              :rules="requiredRule"
              v-if="type === 'edit'"
            ></v-text-field>
            <div v-else>
              {{ item.relationships }}
            </div>

            <h3 class="character">Character</h3>
            <p>What areas of my character need to be improved, and how do I work on them daily?</p>
            <v-text-field
              label=""
              v-model="item.character"
              required
              :rules="requiredRule"
              v-if="type === 'edit'"
            ></v-text-field>
            <div v-else>
              {{ item.character }}
            </div>

            <h3 class="health">Health</h3>
            <p>What are my daily habit that produce a physically healthy lifestyle?</p>
            <v-text-field
              label=""
              v-model="item.health"
              required
              :rules="requiredRule"
              v-if="type === 'edit'"
            ></v-text-field>
            <div v-else>
              {{ item.health }}
            </div>

            <div class="text-xs-center">
              <h2>Life Aides</h2>
            </div>
            <h3 class="finances">Finances</h3>
            <p>How does my daily/ monthly spending and saving support my financial Destination goals?</p>
            <v-text-field
              label=""
              v-model="item.finances"
              required
              :rules="requiredRule"
              v-if="type === 'edit'"
            ></v-text-field>
            <div v-else>
              {{ item.finances }}
            </div>

            <h3 class="vocation">Vocation</h3>
            <p>What do activities do I complete daily or regularly to improve my skills for my vocation?</p>
            <v-text-field
              label=""
              v-model="item.vocation"
              required
              :rules="requiredRule"
              v-if="type === 'edit'"
            ></v-text-field>
            <div v-else>
              {{ item.vocation }}
            </div>

            <div class="text-xs-center">
              <h2>Optional Additional Help</h2>
            </div>
            <div class="text-xs-center">
              <p>
                If you are still struggling to answer these questions, try this project.
              </p>
            </div>
            <p>What does a perfect day look like for you?</p>
            <v-text-field
              label=""
              v-model="item.perfectDay"
              hint="This should not be a vacation day, holiday, or 'day at the beach.' This should be a regular day in your vocation."
              v-if="type === 'edit'"
            ></v-text-field>
            <div v-else>
              {{ item.perfectDay }}
            </div>

            <p>
              What are some things that you need to add in your regular
              habits that could produce your "perfect day" more frequently?
            </p>
            <v-text-field
              label=""
              v-model="item.addHabits"
              v-if="type === 'edit'"
            ></v-text-field>
            <div v-else>
              {{ item.addHabits }}
            </div>

            <p>What are some things that you need to change?</p>
            <v-text-field
              label=""
              v-model="item.changeHabits"
              v-if="type === 'edit'"
            ></v-text-field>
            <div v-else>
              {{ item.changeHabits }}
            </div>

            <p>Ask a friend what strengths and habits support your goals for 5 years from now.</p>
            <v-text-field
              label=""
              v-model="item.strengths"
              v-if="type === 'edit'"
            ></v-text-field>
            <div v-else>
              {{ item.strengths }}
            </div>

            <p>What habits are positive for your lifestyle and Destination?</p>
            <v-text-field
              label=""
              required
              v-model="item.positiveHabits"
              :rules="requiredRule"
              v-if="type === 'edit'"
            ></v-text-field>
            <div v-else>
              {{ item.positiveHabits }}
            </div>

            <p>What habits could hold you back, and how can you eliminate or minimize them?</p>
            <v-text-field
              label=""
              required
              v-model="item.negativeHabits"
              :rules="requiredRule"
              v-if="type === 'edit'"
            ></v-text-field>
            <div v-else>
              {{ item.negativeHabits }}
            </div>
            <div class="text-xs-center">
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
