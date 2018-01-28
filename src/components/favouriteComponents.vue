<template>
<div class="wrapper">
<div v-show="loaded">
<v-container grid-list-md>
  <v-data-iterator
      v-show="!showAlert"
      content-tag="v-layout"
      wrap
      :items="podcasts"
      :search="searchTerm"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
    >
    <v-flex xs12 sm6 md4 slot="item" slot-scope="props">
      <podcast transition="fade-transition" :card-info="props.item"></podcast>
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
  methods:{
    search(){
      return this.$store.state.LoadedPodcasts.filter(podcast => podcast.title.match)
    }
  },
    computed:{
      searchTerm(){
        return this.$store.state.searchTerm
      },
    podcasts(){
      return this.$store.getters.LoadedPodcasts
    },
    /*FilteredPodcasts(){
      console.log(this.$store.getters.getFilteredPodcasts)
     return this.$store.getters.getFilteredPodcasts
      }*/
    },
  created(){
 //return favourite podcasts - getter filtering in the vuex store
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
