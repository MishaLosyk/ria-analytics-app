import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      name: 'name',
      surname:'surname',
      user_id: 1111,
      token: 'token',
      role: '',
      auth:false, 
      tables:null,
      ip: 'http://localhost', //
    },
  mutations: {
    LOGIN: (state, payload) =>{
      state.name = payload.data.name
      state.surname = payload.data.surname
      state.user_id = payload.data.user_id
      state.token = payload.headers.token
      state.role = payload.data.role
      state.auth = payload.data.auth
      state.tables = payload.data.tables
    },


    // SET_NAME: (state, payload) => {
    //   state.name = payload;
    // },
  },
  actions: {},
  modules: {},
});
