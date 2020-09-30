import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as myTag[],
  } as RootState,

  mutations: {
    initTag(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      if (!state.tagList || state.tagList.length === 0) {
        // 如果没有 标签，那么需要我给你们创造初始化的标签！
        // TODO
        // store.commit('createTag',{id: ,type: ,iconName: ,text: ,})
      }
    },
    createTag(state, tag: myTag) {
      const {id, type, iconName, text} = tag;
      // 需要检查重复等！
      state.tagList && state.tagList.push(tag);
      store.commit('saveTag');
    },
    saveTag(state) {
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
