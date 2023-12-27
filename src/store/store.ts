// store.ts
import { createStore } from 'vuex';

interface State {
  count: number;
}

export default createStore({
  state: (): State => ({
    count: 0,
  }),
  mutations: {
    increment(state: State) {
      state.count++;
    },
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment');
      }, 1000);
    },
  },
  getters: {
    getCount: (state: State) => state.count,
  },
});
