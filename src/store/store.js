import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        podcasts:[

        ],
        user:{
            username:'João Petinga',
            favouritePodcasts:[{
                id:1
            }]
        },
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