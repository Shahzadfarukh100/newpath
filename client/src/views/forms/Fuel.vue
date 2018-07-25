<template>
  <v-layout row wrap justify-center>
    <v-flex xs12 md6 row>
      <v-card style="padding: 16px;" v-if="!admin">
        <div class="text-xs-center card-title buttonTagline">
          Why I want to do it...
        </div>
        <v-flex xs6 md4 offset-xs3 offset-md4>
          <v-card-media
            height="200"
            width="100%"
            src="/img/fuel.svg"
            contain
          >
          </v-card-media>
        </v-flex>
        <v-card-text class="text-xs-center">
          <h1 class="buttonTitle">
            FUEL
          </h1>
        </v-card-text>
      </v-card>
      <br>
      <v-form
        name="destination"
        ref="form"
        v-model="valid"
        lazy-validation
      >
      <div class="text-xs-center">
        <h2>Main Motivation Statement</h2>
      </div>
      <div class="text-xs-center">
        <p>What motivates you? What gets and keeps you going even in hard times?</p>
      </div>
        <v-text-field
          label=""
          required
          v-model="item.keyStatement"
          :rules="requiredRule"
          v-if="type === 'edit'"
        ></v-text-field>
        <div v-else>
          {{ item.keyStatement }}
        </div>

        <h3>Purpose</h3>
        <p>What do you believe your purpose is on this earth?</p>
        <v-text-field
          label=""
          v-model="item.purpose"
          required
          :rules="requiredRule"
          v-if="type === 'edit'"
        ></v-text-field>
        <div v-else>
          {{ item.purpose }}
        </div>

        <p>Why do think God made you with your unique design?</p>
        <v-text-field
          label=""
          v-model="item.uniqueDesign"
          required
          :rules="requiredRule"
          v-if="type === 'edit'"
        ></v-text-field>
        <div v-else>
          {{ item.uniqueDesign }}
        </div>

        <h3>Passion</h3>
        <p>What are you passionate about?</p>
        <v-text-field
          label=""
          v-model="item.passions"
          required
          :rules="requiredRule"
          v-if="type === 'edit'"
        ></v-text-field>
        <div v-else>
          {{ item.passions }}
        </div>

        <p>What causes or issues are you drawn to?</p>
        <v-text-field
          label=""
          v-model="item.causes"
          required
          :rules="requiredRule"
          v-if="type === 'edit'"
        ></v-text-field>
        <div v-else>
          {{ item.causes }}
        </div>

        <p>Ask a friend what or who emotionally stirs you? What puts 'fire' in your soul?</p>
        <v-text-field
          label=""
          v-model="item.stirring"
          required
          :rules="requiredRule"
          v-if="type === 'edit'"
        ></v-text-field>
        <div v-else>
          {{ item.stirring }}
        </div>

        <p>Ask a friend what you talk the most about and 'invest' (time, money, etc) in.</p>
        <v-text-field
          label=""
          required
          v-model="item.invest"
          :rules="requiredRule"
          v-if="type === 'edit'"
        ></v-text-field>
        <div v-else>
          {{ item.invest }}
        </div>
        <h3>Inspiration</h3>
        <p>Who are the people who inspire you?</p>
        <v-text-field
          label=""
          v-model="item.inspirations"
          required
          :rules="requiredRule"
          v-if="type === 'edit'"
        ></v-text-field>
        <div v-else>
          {{ item.inspirations }}
        </div>

        <p>What people in your life bring hope into your life and future?</p>
        <v-text-field
          label=""
          v-model="item.hopes"
          required
          :rules="requiredRule"
          v-if="type === 'edit'"
        ></v-text-field>
        <div v-else>
          {{ item.hopes }}
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
    name: 'fuel',
    props: ['user', 'admin'],
    components: {
      topnav,
      pathfooter
    },
    data() {
      return {
        item: {
          userId: '',
          uniqueDesign: '',
          purpose: '',
          passions: '',
          causes: '',
          inspirations: '',
          hopes: '',
          stirring: '',
          invest: '',
          keyStatement: ''
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
        const {error, data} = await wrapper(services.fuelService.find({query: {userId: this.user._id}}));
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
            const {error, data} = await wrapper(services.fuelService.patch(this.item._id, this.item));
            if (error) {
              EventBus.$emit('showSnackbar', `There was an error updating your data: ${error}`, 'bottom', null, 'error');
            } else {
              console.log('It is all there');
              EventBus.$emit('showSnackbar', `Your answers have been successfully updated!`, 'bottom', null, 'success');
              this.type = 'view';
            }
          } else {
            const {error, data} = await wrapper(services.fuelService.create(this.item));
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

.toolbar__content {
display:none;
}

nav.toolbar {
height: 64px;
box-shadow: none;
}

</style>
