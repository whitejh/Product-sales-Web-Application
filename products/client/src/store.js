/* store.js는 
글로벌로 어떤 컴포넌트에서든 상태관리가 필요한 데이터를 담기 위해 존재
vuex를 이용해서 status를 관리 
유저정보도 이렇게 관리*/

import { createStore } from 'vuex';

import persistedstate from 'vuex-persistedstate';

const store = createStore({
  state() {
    return {
      user: {},
    };
  },
  mutations: {
    user(state, data) {
      state.user = data;
    },
  },
  plugins: [
    persistedstate({
      paths: ['user'],
    }),
  ],
});

export default store;
