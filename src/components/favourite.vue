<template>
<div class="wrapper">
<div v-show="loaded">
<v-container grid-list-md>
  <v-data-iterator
      v-show="!showAlert"
      content-tag="v-layout"
      wrap
      :items="cards"
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
      loading:true,
      card:{},
      showAlert:false,
      loaded:false,
      cards:[]
    }
  },
  methods:{
    search(){
      return this.$store.state.LoadedPodcasts.filter(podcast => podcast.title.match)
    }
  },
    computed:{
        getFavouritePodcasts(){
            return this.$store.state.podcasts.filter(podcast => this.$store.state.user.favouritePodcasts.includes(podcast.id))
        },
      searchTerm(){
        return this.$store.state.searchTerm
      }
    },
    /*FilteredPodcasts(){
      console.log(this.$store.getters.getFilteredPodcasts)
     return this.$store.getters.getFilteredPodcasts
      }*/
  updated: function () {
  this.$nextTick(function () {
  this.loaded = true
  this.loading = false
    // Code that will run only after the
    // entire view has been re-rendered
  })
},
created(){
  this.cards = this.getFavouritePodcasts
  console.log(this.cards)
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
