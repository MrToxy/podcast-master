<template>
<v-app>
    <vue-particles
    ref="canvas"
        :color="particlesColor"
        :particleOpacity="0.7"
        :particlesNumber="100"
        shapeType="circle"
        :particleSize="4"
        linesColor="#498fff"
        :linesWidth="1"
        :lineLinked="false"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
        v-if="canvasState"
      >
      </vue-particles>
<!-- NAVIGATION DRAWER -->
    <v-navigation-drawer xs10 fixed app v-model="drawer">
    <v-toolbar :color="toolbarColor" flat class="transparent">
      <v-toolbar-title v-if="!loggedIn" style="width:100%; margin:0">
        <v-flex xs12>
        <h2 class="text-xs-center">Podcast Hub</h2>
        </v-flex>
      </v-toolbar-title>
      <v-list v-if="loggedIn" class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Hello {{getUser.username}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-toolbar>
    <v-list class="pt-0" dense>
      <v-divider></v-divider>
      <v-list-tile style="margin:20px;">
        <v-list-tile-action>
          <v-btn dark fab small color="primary" to="/podcasts">
          <v-icon>home</v-icon>
          </v-btn>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Homepage </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile style="margin:20px;">
        <v-list-tile-action>
          <v-btn v-if="loggedIn" dark fab small color="primary" to="/podcasts/favourite">
          <v-icon v-if="loggedIn">favorite</v-icon>
          </v-btn>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-if="loggedIn">favorite </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile>
        <v-list-tile-action>
        <v-switch
         v-model="switch1"
        ></v-switch>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            background animation {{switch1}}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-action>
        <v-switch
         v-model="switch2"
        ></v-switch>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            cards animation {{switch2}}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

    </v-list>
  </v-navigation-drawer>
  <!-- /NAVIGATION DRAWER/ -->

  <!-- SEARCH DIALOG -->
    <v-dialog v-model="dialog" persistent max-width="600px">
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
              <v-flex xs12 sm6 md4 style="padding-left:10px;">
                <v-menu
                  ref="menu"
                  lazy
                  :close-on-content-click="false"
                  v-model="menu"
                  transition="scale-transition"
                  offset-y
                  full-width
                  :nudge-right="40"
                  min-width="330px"
        :return-value.sync="date"
      >
        <v-text-field
        clearable
          slot="activator"
          label="Select a date"
          v-model="date"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker v-model="date" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
        </v-date-picker>
      </v-menu>
              </v-flex>
            </v-layout>
          </v-container>
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
    <v-toolbar ref="toolbar" app fixed :color="toolbarColor">
      <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon><!-- class="hidden-md-and-up" -->
      <v-toolbar-title style="color:white">
        <router-link to="/podcasts" tag="span" style="cursor:pointer;">Podcast Hub</router-link>
      </v-toolbar-title>
           <v-layout row justify-end>
           <v-menu offset-y>
            <v-btn flat icon  v-show="SearchBox" small color="light-blue darken-1" slot="activator">
            <v-icon color="#01579B" >search</v-icon>
            </v-btn>
              <v-list>
               <v-list-tile @click="dialog = !dialog">
                <v-list-tile-title>Advanced Search</v-list-tile-title>
               </v-list-tile>
              </v-list>
            </v-menu>
            <v-flex xs12 sm8 md4 lg3>
              <transition name="fade">
                <v-text-field class="searchBox"
                clearable
                v-on:blur="hideText"
              ref="searchBox"
              v-show="SearchBox"
              name="Search"
              v-model="searchTerm"
              single-line
              hint="General search"
              transition="slide-transition"
                >
              </v-text-field>  
              </transition>
            </v-flex>
           </v-layout>
            <v-tooltip bottom>
      <v-btn outline  v-show="searchButton" color="light-blue darken-1" icon slot="activator" @click="SearchBox = !SearchBox">
        <v-icon color="#01579B">search</v-icon>
      </v-btn>
      <span>Search </span>
    </v-tooltip>
        <v-tooltip bottom>
      <v-btn v-if="loggedIn" to="/podcasts/favourite" outline color="red accent-3" icon slot="activator" class="hidden-xs-only">
        <v-icon color="red accent-3" class="hidden-xs-only icons">favorite</v-icon>
      </v-btn>
      <span>favourite</span>
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
        searchButton:true,
        searchTerm:'',
        date: null,
        menu: false,
        modal: false,
        switch1:true,
        switch2:false,
        canvasState:true,
        animationState:true,
      }
    },
    computed:{
      getUser(){
        return this.$store.state.user
      },
      loggedIn(){
        return this.$store.getters.getUserState
      },
      particlesColor(){
        //return this.$store.getters.toolbarColor
         switch(this.$store.state.toolbarColor){
           case 'blue lighten-3': return '#90CAF9'
           case 'light-green lighten-2': return '#AED581'
           case 'purple lighten-3': return '#CE93D8'
           case 'orange lighten-2': return '#FFB74D'
        }
      },
      toolbarColor(){
        return this.$store.state.toolbarColor
      },
      colorChanged(){
        return this.$store.state.colorChanged
      },
      pathChanged(){
        return this.$route.path
      }
    },
    methods:{
      hideText(){
        this.SearchBox = false
      },
      checkPath(){
        if(this.$route.path == '/podcasts' || this.$route.path == '/podcasts/favourite'){
          this.searchButton = true
        }
        else this.searchButton = false
      }
    },
    watch:{
      particlesColor(){
        if(this.canvasState == true){
        this.canvasState = false
           setTimeout(()=>{
        this.canvasState = true
        },150)
        }
      },
      switch2(){
        this.$store.state.animation = this.switch2
      },
      switch1(){
        this.canvasState = !this.canvasState 
      },
      searchTerm(){
        this.$store.state.searchTerm = this.searchTerm
      },
     $route(to,from){
       this.checkPath()
     }
    },
    created(){
      console.log(this.$refs.toolbar)
    }
  }
</script>
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
#particles-js { 
  position: absolute; 
  background-size: cover; 
  top: 0; 
  bottom: 
  0; 
  left: 
  0; 
  right: 
  0; 
  overflow-y: hidden; 
  z-index: 0; 
  }

 
  .icons {
/* Clip Background Image */

	  background: url(http://f.cl.ly/items/010q3E1u3p2Q0j1L1S1o/animated_text_fill.png) repeat-y;
	  -webkit-background-clip: text;
	  background-clip: text;

/* Animate Background Image */

	  -webkit-text-fill-color: transparent;
	  -webkit-animation: aitf 80s linear infinite;

/* Activate hardware acceleration for smoother animations */

	  -webkit-transform: translate3d(0,0,0);
	  -webkit-backface-visibility: hidden;

  }

/* Animate Background Image */

@-webkit-keyframes aitf {
	0% { background-position: 0% 50%; }
	100% { background-position: 100% 50%; }
}

.content{
  margin-top: 30px;
}
</style>
