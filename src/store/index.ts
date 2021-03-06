import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as myTag[],
    firstTimeFlag: true,
  } as RootState,

  mutations: {
    handleFirst(state) {
      state.firstTimeFlag = true;
    },
    handleNotFirst(state) {
      state.firstTimeFlag = false;
    },
    initTag(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      if (!state.tagList || state.tagList.length === 0) {
        store.commit('createTag', {id: 0, type: '-', iconName: 'shuiguo', text: '水果',});
        store.commit('createTag', {id: 0, type: '+', iconName: 'hongbao', text: '红包',});
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
      if (text === '') {
        throw new Error('text empty');
      }else if(text.length >3){
        throw new Error('text overtop')
      }
      if (nameList.indexOf(iconName) >= 0) {
        const hasIconName = nameList.reduce((a, v) => v === iconName ? a + 1 : a, 0);
        const textList = state.tagList.map(item => item.text);
        const hasText = textList.reduce((a, v) => v === text ? a + 2 : a, 0);
        if (iconName !== payload.clonedTag.iconName) {
          if (hasIconName >= 1) {
            throw new Error('icon duplicated');
          } else if (hasText >= 1) {
            throw new Error('text duplicated');
          }
        } else {
          if (hasText >= 1 && iconName !== payload.clonedTag.iconName) {
            throw new Error('text duplicated');
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
      const record2: RecordItem = clone(record);
      if (record2.tags.iconName === '') {
        throw new Error('icon empty');
      } else {
        state.recordList.push(record2);
      }
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
