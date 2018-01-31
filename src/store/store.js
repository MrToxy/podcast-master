import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
Vue.use(Vuex)
Vue.use(VueResource)
export const store = new Vuex.Store({
    state:{
        podcasts:[

        ],
        user:{username:'MrToxy',favouritePodcasts:[1,2,3,4,5,6],avatar:'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/6f/6fee05345d44210b74726326f8d17f43525b84ae_full.jpg'},
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
        registerUser({commit},payload){
            //post to API
            console.log("Got here")
            console.log(Vue.http.post)
            Vue.http.get('/user/register', {email: payload.email, password:payload.password,avatar:payload.avatar,username:payload.username}).then(response => {
                console.log("and here?")
                if(response.status == "200")
                    {
                        this.state.registrationStatus = true
                    }
                    else this.state.registrationStatus = false
              }, response => {
                this.state.registrationStatus = false
              })
        },
        loginUser({commit},payload){
            //request to API, if request is ok then
            commit('loginUser',payload)

        }
    }
})