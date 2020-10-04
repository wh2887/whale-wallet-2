import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import tagListDB from '@/dataBase/tagListDB';
import createId from '@/lib/createId';

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
      const iconNameList = state.tagList.map(item => item.iconName);
      const textList = state.tagList.map(item => item.text);
      if (iconNameList.indexOf(iconName) >= 0) {
        throw new Error('icon duplicated');
      } else if (textList.indexOf(text) >= 0) {
        throw new Error('text duplicated');
      } else {
        tag.id = createId();
        state.tagList && state.tagList.push(tag);
        // 可选链语法：  this.tagList?.push(obj);
        store.commit('saveTag');
      }
    },
    updateTag(state, payload: { id: number, iconName: string, text: string, clonedTag: { id: number, iconName: string, text: string } }) {
      const id = payload.id;
      const iconName = payload.iconName;
      const text = payload.text;
      const idList = state.tagList.map(item => item.id);
      const nameList = state.tagList.map(item => item.iconName);
      if (text === ''){
        throw new Error('text empty')
      }
      if (nameList.indexOf(iconName) >= 0) {
        const hasIconName = nameList.reduce((a, v) => v === iconName ? a + 1 : a, 0);
        const textList = state.tagList.map(item => item.text);
        const hasText = textList.reduce((a, v) => v === text ? a + 2 : a, 0);
        if (iconName !== payload.clonedTag.iconName) {
          if (hasIconName >= 1) {
            throw new Error('icon duplicated')
          } else if (hasText >= 1) {
            throw new Error('text duplicated')
          }
        } else {
          if (hasText >= 1) {
            throw new Error('text duplicated')
          }
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.iconName = iconName;
          tag.text = text;
          store.commit('saveTag');
        }
      } else {
        const tag = state.tagList.filter(item => item.id === payload.clonedTag.id)[0];
        tag.iconName = iconName;
        tag.id = payload.clonedTag.id;
        tag.text = text;
        store.commit('saveTag');
      }
    },
    removeTag(state, id: number) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit('saveTags');
        window.alert('删除成功！');
      } else {
        window.alert('删除失败！');
      }
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
