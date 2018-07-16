<template>
    <v-container>
      <v-layout class="mt-5 iconHolder row wrap">
        <v-flex md6 xs12 class="text-xs-center" style="height: auto;">
          <h3 class="bottomTagline">
            Life Criticals
          </h3>
            <v-layout class="justify-center row wrap">
              <v-flex md2 xs6 v-for="crit in criticals" :key="crit.link" class="text-xs-center">
                <div>
                    <img :src="crit.icon" width="40px">
                    <p>{{ crit.label }}</p>
                </div>
              </v-flex>
            </v-layout>
        </v-flex>
        <v-flex md6 xs12 class="text-xs-center" style="height: auto;">
          <h3 class="bottomTagline">
            Life Aides
          </h3>
            <v-layout class="justify-center row wrap">
              <v-flex md2 xs6 v-for="aid in aides" :key="aid.link">
                <div>
                    <img :src="aid.icon" width="40px">
                    <p>{{ aid.label }}</p>
                </div>
              </v-flex>
            </v-layout>
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
    /*border-top: 1px solid #8FC186;*/
    padding-top: 20px;
    margin-top: 125px !important;
  }
  .bottomTagline {
    color: #8FC186;
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .iconHolder a, .iconHolder p {
    color: #8FC186;
  }
</style>
