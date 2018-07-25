<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs12 md12 v-if="!loggedIn">

        <v-card class="text-xs-center pa-5 mountains">
        </v-card>
        <v-flex xs12 md6 offset-md3>
          <v-card class="text-xs-center pa-5" style="position: relative; top: -125px;">
            <h1>
              My New Path
            </h1>
            <p>
              To continue, please <a href="/login">login</a> or <a href="/signup">Signup</a> first.
            </p>
          </v-card>
        </v-flex>
      </v-flex>
      <v-flex xs12 v-else>
        <v-card class="text-xs-center pa-5 mountains">
        </v-card>
        <v-container grid-list-md>

        <v-layout row wrap>

        <v-flex md3 v-for="button in buttonItems" :key="button.tagline">
            <v-card class="button-row text-xs-center home-card">
              <router-link :to="button.link" :user="user">
                <div class="buttonTagline">{{ button.tagline }}</div>
                <div class="pt-2"><img :src="button.image"></div>
                <div class="buttonTitle">{{ button.title }}</div>
                <div class="buttonDesc" v-if="button.title === 'DESTINATION'">{{ destinationTag }}</div>
                <div class="buttonDesc" v-else-if="button.title === 'JOURNEY'">{{ journeyTag }}</div>
                <div class="buttonDesc" v-else-if="button.title === 'FUEL'">{{ fuelTag }}</div>
                <div class="buttonDesc" v-else-if="button.title === 'GUARD RAILS'">{{ guardrailTag }}</div>
              </router-link>
            </v-card>
        </v-flex>
        </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import * as services from '../services';
  import wrapper from '../modules/asyncWrapper';

  export default {
    name: 'topnav',
    props: ['user'],
    data() {
      return {
        loggedIn: !!window.localStorage.getItem('feathers-jwt'),
        tagLines: {},
        destinationTag: '',
        journeyTag: '',
        guardrailTag: '',
        fuelTag: '',
        buttonItems: [
          {
            link: '/destination',
            tagline: 'Where I want to go...',
            image: '/img/destination.svg',
            title: 'DESTINATION',
            description: 'In 5 years, I want to be in charge of a non-profit organization that improves the lives of children in third-world countries.'
          }, {
            link: '/fuel',
            tagline: 'Why I want to do it...',
            image: '/img/fuel.svg',
            title: 'FUEL',
            description: 'Seeing other children in need makes me think of my own kids and how I would feel if I were the parent of a child...'
          }, {
            link: '/journey',
            tagline: 'How I\'m going to do it...',
            image: '/img/journey.svg',
            title: 'JOURNEY',
            description: 'TODAY, I will set daily reminders to lorem ipsum dolor sit amet, consecteur adiipiscing elit.'
          }, {
            link: '/guardrails',
            tagline: 'What will keep me on track...',
            image: '/img/guardrails.svg',
            title: 'GUARD RAILS',
            description: 'Lorem ipsum dolor sit amet, consecteur adiipiscing elit.'
          }
        ]
      }
    },
    methods: {
      async getTaglines() {
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
                  from: 'goals',
                  localField: '_id',
                  foreignField: 'userId',
                  as: 'goal'
                }
              }, {
                $unwind: {
                  path: '$goal',
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
                  journey: '$journey.keyStatement',
                  destination: '$goal.keyStatement',
                  fuel: '$fuel.keyStatement',
                  guardrail: '$guardrail.keyStatement'
                }
              }
            ]
          }
        };
        const { error, data } = await wrapper(services.userService.find(query));
        if (data) {
          this.tagLines = data[0];
          console.log('data', data[0]);
          this.destinationTag = this.tagLines.destination;
          this.journeyTag = this.tagLines.journey;
          this.fuelTag = this.tagLines.fuel;
          this.guardrailTag = this.tagLines.guardrail;
        }
      }
    },
    mounted() {
      this.getTaglines();
    }
  }
</script>

<style scoped>
  .mountains {
    background-image: url('../assets/mountains-bg.png');
    background-size: cover;
    min-height: 250px;
    position: absolute;
    width: 100%;
  }
  .button-row {
    z-index: 2;
    background-color: #FFF;
    margin: 50px 10px 0 10px;
    padding: 5px;
  }
  .buttonTagline {
    color: #8FC186;
    font-size: 1.3rem;
    font-weight: bold;
  }
  .buttonTitle {
    color: #8FC186;
    font-size: 2rem;
    font-weight: bolder;
  }
  .buttonDesc {
    color: #06B7DF;
    font-style: italic;
    font-weight: bold;
  }
  a {
    text-decoration: none;
  }
  nav.toolbar {
  height: 50px !important;
  }
  .toolbar__content {
  height: 50px !important;
  }
  main.content {
  padding: 50px 0px 0px !important;
  }
</style>
