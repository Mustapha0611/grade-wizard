import { createStore } from 'vuex'

export default createStore({
    state : {
        courses:[
            //  {
           
            //      title:'Maths101',
            //      creditUnit:3,
            //      grade:'A'
            //  },
            //  {
               
            //      title:'Maths103',
            //      creditUnit:3,
            //     grade:'B'
            //  },
            //  {
             
            //     title:'Maths105',
            //      creditUnit:3,
            //      grade:'B'
            //  },
        ]
   
    },
    mutations: {
        AddACourse(state, formData) {
          state.courses.push(formData);
          localStorage.setItem("courses", JSON.stringify(state.courses));
        },
        loadStorage(state) {
          const storedArray = localStorage.getItem("courses");
          state.courses = storedArray ? JSON.parse(storedArray) : [];
        },
        clearStorage(state) {
          state.courses = [];
          localStorage.removeItem("courses");
        }
      },
      actions: {
        pushFormData({ commit }, formData) {
          commit('AddACourse', formData);
        },
        loadStorage({ commit }) {
          commit("loadStorage");
        },
        clearStorage({ commit }) {
          commit("clearStorage");
        }
    },

    getters: {
      courses: (state) => state.courses
    }
  })