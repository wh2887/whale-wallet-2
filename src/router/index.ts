import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Details from '@/views/Details.vue';
import Statistic from '@/views/Statistic.vue';
import Money from '@/views/Money.vue';
import More from '@/views/More.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: 'details'
  },
  {
    path: '/details',
    name: 'details',
    component: Details
  },
  {
    path: '/statistic',
    name: 'statistic',
    component: Statistic
  },
  {
    path: '/money',
    name: 'money',
    component: Money
  },
  {
    path: '/more',
    name: 'more',
    component: More
  },

];

const router = new VueRouter({
  routes
});

export default router;
