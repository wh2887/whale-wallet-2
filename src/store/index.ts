import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import tagListDB from '@/dataBase/tagListDB';

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
        state.tagList && state.tagList.push(tag);
        // 可选链语法：  this.tagList?.push(obj);
        store.commit('saveTag');
      }
    },


    updateTag(state, payload: { id: number, iconName: string, text: string, clonedTag: { iconName: string, text: string } }) {
      const id = payload.id;
      const iconName = payload.iconName;
      const text = payload.text;
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const nameList = state.tagList.map(item => item.iconName);
        const hasIconName = nameList.reduce((a, v) => v === iconName ? a + 1 : a, 0);
        const textList = state.tagList.map(item => item.text);
        const hasText = textList.reduce((a, v) => v === text ? a + 2 : a, 0);
        // 取得最开始的 tag ？
        if (iconName !== payload.clonedTag.iconName) {
          // 如果现在选择的图标不是最开始的图标
          if (hasIconName >= 1) {
            console.log('icon duplicated');
            // throw new Error('icon duplicated');
          } else if (hasText >= 1) {
            console.log('text duplicated');
            // throw new Error('text duplicated');
          }
        } else {
          // 现在选择的图标就是最开始的 图标！  ==> 可以修改？就是不变
          // 确认文本后 再保存！
          if (hasText >= 1) {
            throw new Error('text duplicated');
          }
          const tag = state.tagList.filter(item => item.id === id)[0];
          // 这里是可以编辑成功的！
          // id 不变 ， 变 text
          tag.iconName = iconName;
          tag.text = text;
          store.commit('saveTag');
        }
      } else {
        // 这是一个直接篡改原来数据中图标与文本的操作 ！！！
        // 这里 需要编辑成功吗？
        // throw new Error('')
        // 这是 用户 选择了 tagList 中没有的，但是数据库中有的 tag
        // 修改当前 tag 的 id iconName text
        const tag = tagListDB.filter(item => item.id === id)[0];
        // id 要变 ， 变 text
        tag.iconName = iconName;
        tag.text = text;
        store.commit('saveTag');
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
