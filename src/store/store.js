import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        podcasts:[

        ],
        user:{username:'Joao',favourite:[1,2,3]},
        searchTerm:'',
        description:'',
        toolbarColor:'orange lighten-2',
        colorChanged:false,
        animation:false
    },
    getters:{
        LoadedPodcasts(state){
            return state.podcasts
        },
        toolbarColor(state){
            return state.toolbarColor
        },
        getUserState(state){
            if(state.user == null)
            return false
            else return true
        },
        getFilteredPodcasts: (state) =>  {
            return state.podcasts.filter(podcast => podcast.title.match(state.searchTerm))
          },
          loginUser(state,payload){
              state.user = payload
          }
    },
    actions:{
        registerUser({commit},payload){
            //post to API
        },
        loginUser({commit},payload){
            //request to API, if request is ok then
            //commit('loginUser',payload)
        }
    }
})