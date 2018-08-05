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
              GUARDRAILS
            </h1>
          </v-card-text>
          <v-flex xs6 md4 offset-xs3 offset-md4>
            <v-card-media
              height="200"
              width="100%"
              src="/img/guardrails.svg"
              contain
            >
            </v-card-media>
          </v-flex>
          <v-card-text class="text-xs-center">
            <div class="text-xs-center card-title buttonTagline">
              How I will stay on track...
            </div>
            <div class="text-xs-center buttonDesc">
              <v-text-field
                label="What does my life need to focus on"
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
          <h2>Life Aides</h2>
        </div>
            <h3 class="faith">
              Faith
            </h3>
            <p>
              Do you have any threats to your Faith that could pull you away from your goal Destination?
            </p>
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

            <h3 class="relationships">
              Relationships
            </h3>
            <p>
              Do you have any current Relationships that do not align with or may pull you off track from you relationship goals?
            </p>
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

            <h3 class="character">
              Character
            </h3>
            <p>
              Character increases our capacity and enables us to strive for goals. What area of your character needs to be strengthened?
            </p>
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

            <h3 class="health">
              Health
            </h3>
            <p>
              What could hinder you to achieve your Health goals?
            </p>
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
              <h2>Life Criticals</h2>
            </div>
            <h3 class="finances">
              Finances
            </h3>
            <p>
              In your Finances, what are some things that you tend to purchase without budgeting?
            </p>
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

            <h3 class="vocation">
              Vocation
            </h3>
            <p>
              Do you have a clear goal for your Vocation in 5 years? If so, what is it?
            </p>
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
            <p>
              What are some "threats" that pull you off track or lead you away from accomplishing goals?
            </p>
            <v-text-field
              label=""
              required
              v-model="item.goalThreats"
              :rules="requiredRule"
              v-if="type === 'edit'"
            ></v-text-field>
            <div v-else>
              {{ item.goalThreats }}
            </div>

            <p>
              What are things that help you stay focused?
            </p>
            <v-text-field
              label=""
              required
              v-model="item.focusItems"
              :rules="requiredRule"
              v-if="type === 'edit'"
            ></v-text-field>
            <div v-else>
              {{ item.focusItems }}
            </div>

            <p>
              Do you have a pitfall that you may struggle with?
            </p>
            <v-text-field
              label=""
              required
              v-model="item.pitfalls"
              :rules="requiredRule"
              v-if="type === 'edit'"
            ></v-text-field>
            <div v-else>
              {{ item.pitfalls }}
            </div>

            <p>
              What are the things that really encourage me to "do what is right"?
            </p>
            <v-text-field
              label=""
              required
              v-model="item.encouragement"
              :rules="requiredRule"
              v-if="type === 'edit'"
            ></v-text-field>
            <div v-else>
              {{ item.encouragement }}
            </div>

            <p>
              Do I have any consistent tendencies or choices that cause me problems (blind spots)?
            </p>
            <v-text-field
              label=""
              required
              v-model="item.tendencies"
              :rules="requiredRule"
              v-if="type === 'edit'"
            ></v-text-field>
            <div v-else>
              {{ item.tendencies }}
            </div>

            <p>
              Do you agree with the answers and would you add anything else?
            </p>
            <v-text-field
              label=""
              required
              v-model="item.agreements"
              :rules="requiredRule"
              v-if="type === 'edit'"
            ></v-text-field>
            <div v-else>
              {{ item.agreements }}
            </div>

            <p>
              What principles protect most of your Life Criticals?
            </p>
            <v-text-field
              label=""
              required
              v-model="item.principles"
              :rules="requiredRule"
              v-if="type === 'edit'"
            ></v-text-field>
            <div v-else>
              {{ item.principles }}
            </div>

            <p>
              What do you expect the outcome to be with this guardrail?
            </p>
            <v-text-field
              label=""
              required
              v-model="item.expectedOutcome"
              :rules="requiredRule"
              v-if="type === 'edit'"
            ></v-text-field>
            <div v-else>
              {{ item.expectedOutcome }}
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
    name: 'guardrails',
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
        ],
        type: 'edit'
      }
    },
    methods: {
      async fetch() {
        console.log('user', this.user);
        const {error, data} = await wrapper(services.guardrailsService.find({query: {userId: this.user._id}}));
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
            const {error, data} = await wrapper(services.guardrailsService.patch(this.item._id, this.item));
            if (error) {
              EventBus.$emit('showSnackbar', `There was an error updating your data: ${error}`, 'bottom', null, 'error');
            } else {
              console.log('It is all there');
              EventBus.$emit('showSnackbar', `Your answers have been successfully updated!`, 'bottom', null, 'success');
              this.type = 'view';
            }
          } else {
            const {error, data} = await wrapper(services.guardrailsService.create(this.item));
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
