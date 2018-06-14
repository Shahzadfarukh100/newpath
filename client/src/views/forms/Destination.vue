<template>
  <v-container>
    <v-layout row wrap justify-center>
      <topnav></topnav>
      <v-flex xs12 row>
        <v-card class="pa-5">
          <div class="text-xs-center">
            <h1>
              Destination
            </h1>
          </div>
          <v-form
            name="destination"
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              label="Key Statement"
              v-model="keyStatement"
              required
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="Faith"
              v-model="faith"
              required
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="Relationships"
              v-model="relationships"
              required
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="Character"
              v-model="character"
              required
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="Health"
              v-model="health"
              required
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="Finances"
              v-model="finances"
              required
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="Vocation"
              v-model="vocation"
              required
              :rules="requiredRule"
            ></v-text-field>
            <v-text-field
              label="Perfect Day"
              v-model="perfectDay"
            ></v-text-field>
            <v-text-field
              label="Change Habits"
              v-model="changeHabits"
            ></v-text-field>
            <v-text-field
              label="Strengths"
              v-model="strengths"
            ></v-text-field>
            <v-text-field
              label="Positive Habits"
              v-model="positiveHabits"
            ></v-text-field>
            <v-text-field
              label="Negative Habits"
              v-model="negativeHabits"
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
        valid: true,
        keyStatement: '',
        faith: '',
        relationships: '',
        character: '',
        health: '',
        finances: '',
        vocation: '',
        perfectDay: '',
        changeHabits: '',
        strengths: '',
        positiveHabits: '',
        negativeHabits: '',
        requiredRule: [
          (v) => !!v || 'This field is required'
        ]
      }
    },
    methods: {
      async submit() {
        if (this.$refs.form.validate()) {
          const destObj = {
            userId: this.user._id,
            keyStatement: this.keyStatement,
            faith: this.faith,
            relationships: this.relationships,
            character: this.character,
            health: this.health,
            finances: this.finances,
            vocation: this.vocation,
            perfectDay: this.perfectDay,
            changeHabits: this.changeHabits,
            strengths: this.strengths,
            positiveHabits: this.positiveHabits,
            negativeHabits: this.negativeHabits
          };
          const {error, data} = await wrapper(services.destinationService.create(destObj));
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
    mounted() {}
  }
</script>

<style>

</style>
