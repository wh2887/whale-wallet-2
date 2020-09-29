import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';
import payTagList from '@/dataBase/payTagList';
import incomeTagList from '@/dataBase/incomeTagList';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as fuck[],
    currentTag: undefined,
    currentTagDB: undefined
  } as RootState,

  mutations: {

    initTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      if (!state.tagList || state.tagList.length === 0) {
        store.commit('createTag', {id: 201, type: '+', iconName: 'other', text: '其他'});
        store.commit('createTag', {id: 201, type: '+', iconName: 'hongbao', text: '红包'});
      }
    },
    findTag(state, id: number) {
      state.currentTag = state.tagList.filter(item => item.id === id)[0];
    },
    createTag(state, obj: fuck) {
      obj && (obj.id = createId());
      state.tagList && state.tagList.push(obj);
      store.commit('saveTags');
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
    selectTagsDataBase(state, recordType: string) {
      if (recordType === '-') {
        state.currentTagDB = payTagList;
      } else if (recordType === '+') {
        state.currentTagDB = incomeTagList;
      } else {
        window.alert('recordType 属于非法值，只能是 \'-\' 或 \'+\' 其中之一');
      }
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
