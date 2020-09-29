import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as fuck[],
    currentTag: undefined
  } as RootState,

  mutations: {

    initTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      // 保底 | 默认
      if (!state.tagList || state.tagList.length === 0) {
        store.commit('createTag', {id: 201, type: '+', iconName: 'other', text: '其他'});
        store.commit('createTag', {id: 201, type: '+', iconName: 'hongbao', text: '红包'});
      }
    },
    findTag(state, id: number) {
      // tagList 去哪里找呢？  ==>  所以需要初始化！
      state.currentTag = state.tagList.filter(item => item.id === id)[0];
    },
    createTag(state, obj: fuck) {
      console.log('index.ts中的createTag', obj);
      obj && (obj.id = createId());
      state.tagList && state.tagList.push(obj);
      store.commit('saveTags');
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },

    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    createRecord(state, record: RecordItem) {
      const record2 = clone(record);
      state.recordList.push(record2);
      store.commit('saveRecords');
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
  },
  actions: {},
  modules: {}
});


export default store;
