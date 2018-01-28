<template>
 <v-card :class="{cardAnime:animationState}">
    <v-card-media
      :src="cardInfo.thumbnailUrl"
      :height="cardThumbnail"
    >
    </v-card-media>
              <v-card-title primary-title>
                <v-layout wrap>
                <v-flex xs12>
            <div class="headline">{{reduceTitle}}</div>
            </v-flex>
            <v-layout row wrap justify-center>
              <v-flex d-flex style="padding-left:20px;" xs12>
            <span style="height:60px;" class="grey--text">
              {{cardInfo.title}}
            </span>
            </v-flex>
            </v-layout>
            </v-layout>
        </v-card-title>
      <v-layout wrap row mb-1>
        <v-flex xs12>
          <keep-alive>
         <component :is="componentId" :text="cardInfo.title" v-show="showCustomComponent" transition="fade" transition-mode="out-in"></component>
        </keep-alive>
          </v-flex> 
      </v-layout>
             <v-bottom-nav
      style="z-index:1;"
      shift
      :value="true"
      :active.sync="e2"
      :color="color"
    >
      <v-btn dark @click="closeOptions">
        <span>Close</span>
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn dark @click="showAudioPlayer">
        <span>Music</span>
        <v-icon>music_note</v-icon>
      </v-btn>
      <v-btn dark @click="showText">
        <span>Read</span>
        <v-icon>subject</v-icon>
      </v-btn>
      <v-btn dark @click="showImage">
        <span>Image</span>
        <v-icon>image</v-icon>
      </v-btn>
    </v-bottom-nav>
      </v-card>
</template>

<script>
import audioPlayer from './audioPlayer'
import podcastText from './podcastText'
export default {
  components:{
    'podcast-audio-player':audioPlayer,
    'podcast-text':podcastText
  },
  props: ['cardInfo'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      show:false,
      e2:3,
      componentId:'',
      showCustomComponent:false,
      cardThumbnail:'200px',
      currentColor:'',
      animation:false

      }
    },
    methods:{
      onLoadPodcast(id){
        this.$router.push('/meetups/' + id)
      },
      showText(){
        if(!this.showCustomComponent)
          this.showCustomComponent = !this.showCustomComponent

          this.componentId = 'podcast-text'
          this.cardThumbnail = "200px"
          //this.emmitNewColor()
      },
      showAudioPlayer(){
        if(!this.showCustomComponent)
          this.showCustomComponent = !this.showCustomComponent
        this.componentId = 'podcast-audio-player'
        this.cardThumbnail = "200px"
        //this.emmitNewColor()
      },
      showImage(){
        if(this.showCustomComponent)
          this.showCustomComponent = !this.showCustomComponent
        this.cardThumbnail = "300px"
        //this.emmitNewColor()
      },
      closeOptions(){
        this.showCustomComponent = false
        this.cardThumbnail = "200px"
        //this.emmitNewColor()
      },
      emmitNewColor(){
        this.$store.state.toolbarColor = this.color
        console.log(this.$store.state.toolbarColor)
      }
    },
    computed: {
      animationState(){
        return this.$store.state.animation
      },
      color () {
        switch (this.e2) {
          case 0: return 'blue-grey'
          case 1: return 'teal'
          case 2: return 'brown'
          case 3: return 'indigo'
        }
      },
      reduceTitle(){
        return this.cardInfo.title.substring(0,10)
      }
    },
    watch:{
      color(){
        this.$store.state.toolbarColor = this.color
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fade-transition {
  transition: opacity 0.2s ease;
}

.fade-enter, .fade-leave {
  opacity: 0;
}
.cardAnime:hover{
animation: push 0.5s ease-in-out forwards;
border: solid #02d8e9 1px;
}
@keyframes pop{
  50%  {transform: scale(1.2);}
}

@keyframes push{
  50%  {transform: scale(0.8);}
}
</style>
