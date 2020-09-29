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
    currentTagDB: undefined,
    currentTagList: [] as fuck[]
  } as RootState,

  mutations: {
    initTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      if (!state.tagList || state.tagList.length === 0) {
        store.commit('createTag', {id: 200, type: '-', iconName: 'other', text: '其他'});
        store.commit('createTag', {id: 201, type: '+', iconName: 'hongbao', text: '红包'});
      }
    },
    findTag(state, payload:{id: number,recordType: string}) {
      store.commit('selectTagsDataBase',payload.recordType)
      console.log('store中的currentDB：',state.currentTagDB);
      state.currentTag = (state.currentTagDB && state.currentTagDB.filter(item => item.id === payload.id)[0]);
    },
    createTag(state, obj: fuck) {
      const iconTexts = state.tagList.map(item => item.text);
      const iconNames = state.tagList.map(item => item.iconName);
      if (iconNames.indexOf(obj.iconName) >= 0) {
        window.alert('标签图标重复，请重新选择！');
      } else if (iconTexts.indexOf(obj.text) >= 0) {
        window.alert('标签名称重复，请重新选择！');
      } else {
        obj && (obj.id = createId());
        state.tagList && state.tagList.push(obj);
        store.commit('saveTags');
      }
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
        // TODO
        // 弹出提示框， 应该帮忙跳转到 前一页，而不能在当前页！
      }
    },
    filtrateTagList(state, recordType: string) {
      state.currentTagList = [];  // 删除之前计算过的 List
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].type === recordType) {
          state.currentTagList && state.currentTagList.push(state.tagList[i]);
        }
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
