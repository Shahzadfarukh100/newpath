<template>
  <v-container class="mt-3">
    <v-layout>
      <v-flex xs4 v-for="user in users" :key="user._id">
        <v-card fluid class="pa-3 text-xs-center">
          <h2>
            {{ user.fName }} {{ user.lName }}
          </h2>
          <div v-if="user.destination">
            Destination: {{ user.destination.status }}
          </div>
          <div v-else>
            Destination: Incomplete
          </div>
          <div v-if="user.journey">
            Journey: {{ user.journey.status }}
          </div>
          <div v-else>
            Journey: Incomplete
          </div>
          <div v-if="user.fuel">
            Fuel: {{ user.fuel.status }}
          </div>
          <div v-else>
            Fuel: Incomplete
          </div>
          <div v-if="user.guardrail">
            Guardrail: {{ user.guardrail.status }}
          </div>
          <div v-else>
            Guardrail: Incomplete
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import * as services from '../services';
  import wrapper from '../modules/asyncWrapper';
  import {EventBus} from '../services/eventBus';

  export default {
    name: 'users',
    data() {
      return {
        users: []
      }
    },

    methods: {
      async getUsers() {
        const query = {
          query: {
            _aggregate: [
              {
                $lookup:
                  {
                    from: 'journeys',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'journey'
                  }
              }, {
                $unwind: {
                  path : '$journey',
                  preserveNullAndEmptyArrays: true
                }
              }, {
                $lookup: {
                  from: 'destinations',
                  localField: '_id',
                  foreignField: 'userId',
                  as: 'destination'
                }
              }, {
                $unwind: {
                  path: '$destination',
                  preserveNullAndEmptyArrays: true
                }
              }, {
                $lookup: {
                  from: 'guardrails',
                  localField: '_id',
                  foreignField: 'userId',
                  as: 'guardrail'
                }
              }, {
                $unwind: {
                  path: '$guardrail',
                  preserveNullAndEmptyArrays: true
                }
              }, {
                $lookup: {
                  from: 'fuels',
                  localField: '_id',
                  foreignField: 'userId',
                  as: 'fuel'
                }
              }, {
                $unwind: {
                  path: '$fuel',
                  preserveNullAndEmptyArrays: true
                }
              }, {
                $project: {
                  fName: 1,
                  lName: 1,
                  email: 1,
                  roles: 1,
                  journey: '$journey',
                  destination: '$destination',
                  fuel: '$fuel',
                  guardrail: '$guardrail'
                }
              }
            ]
          }
        };
        const { error, data } = await wrapper(services.userService.find(query));
        if (error) {
          console.log('error', error);
          EventBus.$emit('showSnackbar', `There was an error fetching users: ${error}`, 'bottom', null, 'error');
        }
        this.users = data;
        console.log('data', data);
      }
    },
    mounted() {
      this.getUsers();
    }
  }
</script>

<style scoped>

</style>
