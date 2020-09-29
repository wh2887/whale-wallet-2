import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Details from '@/views/Details.vue';
import Statistic from '@/views/Statistic.vue';
import Money from '@/views/Money.vue';
import More from '@/views/More.vue';
import TagsManage from '@/views/TagsManage.vue';
import TagEdit from '@/views/TagEdit.vue';

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
    path: '/tagsmanage/:recordType',
    name: 'tagsmanage',
    component: TagsManage,
  },
  {
    path: '/tagsmanage/:recordType/tagedit/:id',
    component: TagEdit
  },
  {
    path: '/tagsmanage/:recordType/tagedit/:noId',
    component: TagEdit
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
