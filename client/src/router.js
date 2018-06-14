import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';
import Login from './views/Login.vue';
import Signup from './views/Signup.vue';
import Admin from './views/Admin.vue';
import Destination from './views/forms/Destination.vue';
import * as services from './services';
import wrapper from './modules/asyncWrapper';

Vue.use(Router);

const requiresAdmin = async (to, from, next) => {
  const {err, data} = await wrapper(services.app.authenticate());
  console.log('data', data);
  if (data.user.roles && data.user.roles.includes('admin')) {
    next();
  } else {
    next({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    });
  }
};

const requiresAuth = async (to, from, next) => {
  if (window.localStorage.getItem('feathers-jwt') === null) {
    next({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    });
  } else {
    next();
  }
};

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/signup',
      name: 'signup',
      component: Signup
    }, {
      path: '/admin',
      name: 'admin',
      component: Admin,
      beforeEnter: requiresAdmin
    }, {
      path: '/destination',
      name: 'destination',
      component: Destination,
      beforeEnter: requiresAuth
    }, {
      path: '/logout',
      beforeEnter(to, from, next) {
        services.app.logout();
        next('/login');
      }
    }
  ]
});
