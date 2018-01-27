import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        podcasts:[

        ],
        user:null,
        searchTerm:'Lorem'
    },
    mutations:{

    },
    getters:{
        LoadedPodcasts(state){
            return state.podcasts
        },
        getUserState(state){
            if(state.user == null)
            return false
            else return true
        }
    }
})