import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
Vue.use(Vuex)
Vue.use(VueResource)
export const store = new Vuex.Store({
    state:{
        podcasts:[

        ],
        user:null,
        searchTerm:'',
        description:'',
        toolbarColor:'orange lighten-2',
        colorChanged:false,
        animation:false,
        registrationStatus:null
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
        loginUser({commit},payload){
            //request to API, if request is ok then
            commit('loginUser',payload)

        }
    }
})