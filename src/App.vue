<template>
<v-app>
<!-- NAVIGATION DRAWER -->
    <v-navigation-drawer xs10 temporary fixed app v-model="drawer">
    <v-toolbar flat class="transparent">
      <v-list v-if="loggedIn" class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-list class="pt-0" dense>
      <v-divider></v-divider>
      <v-list-tile>
        <v-list-tile-action>
          <v-btn v-if="loggedIn" dark fab small color="primary" to="/podcasts/favourite">
          <v-icon>favorite</v-icon>
          </v-btn>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>favorite podcasts</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  <!-- /NAVIGATION DRAWER/ -->

  <!-- SEARCH DIALOG -->
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn color="primary" dark slot="activator">Open Dialog</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Advanced Search</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Title" hint="Check if title contains"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Description" hint="Check if description contains"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Search</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  <!-- /DIALOG/ -->

  <!--Top toolbar-->
    <v-toolbar app fixed class="light-blue lighten-4">
      <v-toolbar-side-icon @click.native.stop="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor:pointer;">Podcasts</router-link>
      </v-toolbar-title>
           <v-layout row justify-end>
           <v-menu offset-y>
            <v-btn flat icon  v-show="SearchBox" small color="light-blue darken-1" slot="activator">
            <v-icon color="#01579B" class="hidden-xs-only">search</v-icon>
            </v-btn>
              <v-list>
               <v-list-tile @click="dialog = !dialog">
                <v-list-tile-title>Advanced Search</v-list-tile-title>
               </v-list-tile>
              </v-list>
            </v-menu>
            <v-flex xs12 sm8 md4 lg3>
            <v-text-field class="searchBox"
              ref="searchBox"
              v-show="SearchBox"
              name="Search"
              single-line
              hint="Filter Podcasts"
              transition="slide-transition"
        >
        </v-text-field>  
            </v-flex>
           </v-layout>
            <v-tooltip bottom>
      <v-btn outline  v-show="searchButton" color="light-blue darken-1" icon slot="activator" class="hidden-xs-only" @click="SearchBox = !SearchBox">
        <v-icon color="#01579B" class="hidden-xs-only">search</v-icon>
      </v-btn>
      <span>Filter Podcasts</span>
    </v-tooltip>
        <v-tooltip bottom>
      <v-btn v-if="loggedIn" to="/podcasts/favourite" outline color="red accent-3" icon slot="activator" class="hidden-xs-only">
        <v-icon color="red accent-3" class="hidden-xs-only">favorite</v-icon>
      </v-btn>
      <span>favourite podcasts</span>
    </v-tooltip>
     <v-tooltip bottom>
      <v-btn to="/register" v-if="!loggedIn" outline color="red accent-3" icon slot="activator" class="hidden-xs-only">
        <v-icon color="red accent-3" class="hidden-xs-only">person_add</v-icon>
      </v-btn>
      <span>Sign Up</span>
    </v-tooltip>
    </v-toolbar>
  <!-- /Top toolbar/ -->
  <v-layout wrap>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-layout>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        drawer: false,
        SearchBox: false,
        dialog:false,
        searchButton:true
      }
    },
    computed:{
      loggedIn(){
        return this.$store.getters.getUserState
      }
    },
    methods:{
      checkPath(){
        if(this.$route.path == '/podcasts' || this.$route.path == '/podcasts/favourite'){
          this.searchButton = true
        }
        else this.searchButton = false
      }
    },
    watch:{

     $route(to,from){
       this.checkPath()
     }
    }
  }
</script>
<style scoped>
.searchBox{
  animation: searchIn 4s ease-in-out forwwards;
}
@keyframes searchIn{
  from{width:0;}
  to{width:20%;}
}


</style>
