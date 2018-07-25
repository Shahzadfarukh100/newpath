<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <h1 class="text-xs-center">
          {{ user.fName }} {{ user.lName }}
        </h1>
        <v-expansion-panel>
          <v-expansion-panel-content :value="true">
            <div slot="header">
              Destination
            </div>
            <destination :user="user" :admin="true"></destination>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <div slot="header">
              Journey
            </div>
            <journey :user="user" :admin="true"></journey>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <div slot="header">
              Fuel
            </div>
            <fuel :user="user" :admin="true"></fuel>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <div slot="header">
              Guardrails
            </div>
            <guardrail :user="user" :admin="true"></guardrail>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Destination from './forms/Destination.vue';
  import Fuel from './forms/Fuel.vue';
  import Guardrail from './forms/Guardrails.vue';
  import Journey from './forms/Journey.vue';
  import wrapper from '../modules/asyncWrapper';
  import * as services from '../services';

  export default {
    name: 'user',
    components: {
      Destination,
      Fuel,
      Guardrail,
      Journey
    },
    data() {
      return {
        user: {}
      };
    },
    methods: {
      async getUser() {
        const query = {
          query: {
            _id: this.$route.params.id
          }
        };
        const { error, data } = await wrapper(services.userService.find(query));
        if (error) {
          console.log('error', error);
          EventBus.$emit('showSnackbar', `There was an error fetching users: ${error}`, 'bottom', null, 'error');
        }
        this.user = data.data[0];
        console.log('data', data.data[0]);
      }
    },
    mounted() {
      this.getUser();
    }
  }
</script>

<style scoped>

</style>
