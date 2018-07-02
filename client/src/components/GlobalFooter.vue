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
                    <img :src="crit.icon" width="40px">
                    <p>{{ crit.label }}</p>
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
                    <img :src="aid.icon" width="40px">
                    <p>{{ aid.label }}</p>
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
            link: '/faith',
            icon: '/img/icons/MyNewPath_AppIcons_Faith.png',
            label: 'Faith'
          }, {
            link: '/relationships',
            icon: '/img/icons/MyNewPath_AppIcons_Relationships.png',
            label: 'Relationships'
          }, {
            link: '/health',
            icon: '/img/icons/MyNewPath_AppIcons_Health.png',
            label: 'Health'
          }, {
            link: '/character',
            icon: '/img/icons/MyNewPath_AppIcons_MyCharacter.png',
            label: 'Character'
          }
        ],
        aides: [
          {
            link: '/vocation',
            icon: '/img/icons/MyNewPath_AppIcons_Work.png',
            label: 'Vocation'
          }, {
            link: '/finances',
            icon: '/img/icons/MyNewPath_AppIcons_Finances.png',
            label: 'Finances'
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
