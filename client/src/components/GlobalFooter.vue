<template>
    <v-container>
      <v-layout class="mt-5 iconHolder">
        <v-flex xs8 class="text-xs-center">
          <h3 class="bottomTagline">
            Life Criticals
          </h3>
          <v-container>
            <v-layout class="justify-center">
              <v-flex xs2 v-for="crit in criticals" :key="crit.link" class="text-xs-center">
                <div>
                  <router-link :to="crit.link">
                    <img :src="crit.icon">
                    <p>
                      <v-icon :color="crit.color">fiber_manual_record</v-icon>
                    </p>
                  </router-link>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex xs4 class="text-xs-center">
          <h3 class="bottomTagline">
            Life Aides
          </h3>
          <v-container>
            <v-layout class="justify-center">
              <v-flex xs2 v-for="aid in aides" :key="aid.link" class="aidesMargin">
                <div>
                  <router-link :to="aid.link">
                    <img :src="aid.icon">
                    <p>
                      <v-icon :color="aid.color">fiber_manual_record</v-icon>
                    </p>
                  </router-link>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
  export default {
    name: 'pathfooter',
    data() {
      return {
        criticals: [
          {
            link: '/cross',
            icon: 'http://via.placeholder.com/50x100',
            color: 'green'
          }, {
            link: '/chat',
            icon: 'http://via.placeholder.com/50x100',
            color: 'green'
          }, {
            link: '/doctor',
            icon: 'http://via.placeholder.com/50x100',
            color: 'yellow'
          }, {
            link: '/book',
            icon: 'http://via.placeholder.com/50x100',
            color: 'green'
          }
        ],
        aides: [
          {
            link: '/case',
            icon: 'http://via.placeholder.com/50x100',
            color: 'red'
          }, {
            link: '/bank',
            icon: 'http://via.placeholder.com/50x100',
            color: 'red'
          }
        ]
      }
    }
  }
</script>

<style scoped>
  .application .theme--light.footer, .theme--light .footer {
    background-color: #ebf3e9 !important;
  }
  a {
    text-decoration: none;
  }
  .aidesMargin {
    margin: 0 20px;
  }
  .iconHolder {
    border-top: 1px #CCC solid;
    padding-top: 20px;
    margin-top: 125px !important;
  }
  .bottomTagline {
    color: #96c58d;
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 20px;
  }
</style>
