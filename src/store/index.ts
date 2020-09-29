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
      // if (!state.tagList || state.tagList.length === 0) {
      //   store.commit('createTag', {id: 200, type: '-', iconName: 'other', text: '其他'});
      //   store.commit('createTag', {id: 201, type: '+', iconName: 'hongbao', text: '红包'});
      // }
    },
    findTag(state, payload: { id: number, recordType: string }) {
      store.commit('selectTagsDataBase', payload.recordType);
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
        // obj && (obj.id = createId());
        state.tagList && state.tagList.push(obj);
        store.commit('saveTags');
      }
    },
    updateTag(state, tag: fuck) {
      const {id, type, iconName, text} = tag;
      // 检查 id（忽略） 、 iconName 、 text 是否重复！
      // TODO
      // 发现这个 idList会有重复，但是是因为不同数据库中的图标有相同的 ID 貌似不影响？
      // 如果有影响，可以在数据库中去检查或者保证不重复！
      const idList = state.tagList.map(item => item.id);
      const iconNameList = state.tagList.map(item => item.iconName);
      const hasIconName = iconNameList.reduce((a, v) => v === iconName ? a + 1 : a, 0);
      const textList = state.tagList.map(item => item.text);
      const hasText = textList.reduce((a, v) => v === text ? a + 1 : a, 0);
      if (iconName === '') {
        window.alert('标签图标不能为空，请重新输入！');
      } else if (text === '') {
        window.alert('标签名不能为空，请重新输入！');
      } else {
        if (hasIconName >= 2) {
          window.alert('图标名称重复，请重新输入！');
        } else if (hasText >= 2) {
          window.alert('标签名称重复，请重新输入！');
        }
        console.log('执行了');
        console.log('store得到的ID：', id);
        let tag = state.tagList.filter(item => item.id === id)[0];
        if (!tag) {
          window.alert('当前修改的图标还未出现再您的已有列表中，请添加后再修改！');
        }
        tag && (tag.iconName = iconName);
        tag && (tag.text = text);
        console.log('修改之后的tag', tag);
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
