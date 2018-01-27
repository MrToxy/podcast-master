<template>
<div class="wrapper">
  <!--<loading-screen v-show="loading"></loading-screen>-->
    <!--v-alert type="error" v-show="showAlert"
    >There is not data to be displayed</v-alert>-->
<div v-show="loaded">
<v-container grid-list-md>
  <v-data-iterator
      v-show="!showAlert"
      content-tag="v-layout"
      wrap
      :items="podcasts"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
    >
    <v-flex xs12 sm6 md4 slot="item" slot-scope="props">
      <podcast :card-info="props.item"></podcast>
    </v-flex>
    </v-data-iterator>
</v-container>
</div>

</div>
</template>

<script>
  import Podcast from './podcastTemplate'
  import loadingScreen from './loadingScreen'
export default {
  components: {
    'podcast':Podcast,
    'loading-screen':loadingScreen
  },
  name: 'ListPodcasts',
  data () {
    return {
       rowsPerPageItems: [4, 8, 12],
        pagination: {
          rowsPerPage:4
        },
     e2: 3,
      msg: 'Welcome to Your Vue.js App',
      show:false,
      cards:[],
      loading:true,
      card:{},
      showAlert:false,
      loaded:false
    }
  },
    computed:{
    podcasts(){
      return this.$store.state.podcasts
    },
    FilterPodcasts(){
      return this.$store.getters.LoadedPodcasts.sort(podcast => {
        return podcast.contains(searchTerm)
      })
    }
  },
  created(){
    this.loading = true
    this.loaded = false
this.$http.get('https://jsonplaceholder.typicode.com/photos').then(response => {

    // get body data
    this.showAlert = false
    this.loading = false
    this.loaded = true
    this.$store.state.podcasts = response.body
    console.log(this.$store.state.podcasts)
    //this.cards = response.body.slice(0,20)

  }, response => {
    var empty = []
    this.$store.state.podcasts = empty
    this.loaded = true
    this.loading = false
    this.showAlert = true
    // error callback
  })
  },
  updated: function () {
  this.$nextTick(function () {
  this.loaded = true
  this.loading = false
    // Code that will run only after the
    // entire view has been re-rendered
  })
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>