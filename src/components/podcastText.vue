<template>
<v-container>
<v-layout row wrap>
<v-card-text transition="fade-transition">
{{text}}
</v-card-text>
</v-layout>
<v-layout row justify-center>
    <v-dialog v-model="dialog" scrollable width="600px">
      <v-btn color="primary" dark slot="activator">Read More</v-btn>
      <v-card>
        <v-layout row>
          <v-flex xs12>
           <v-alert :type="alertType"
           style="margin:0;"
           dismissible
           v-model="toggleAlert"
           transition='scale-transition'>
      {{alertText}}
    </v-alert>
    </v-flex>
    </v-layout>
        <v-card-title>
          <span class="headline">Podcast Title</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          {{textFake}}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat"
            v-clipboard:copy="textFake"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError"
          >Copy to clipboard</v-btn>
          <v-btn color="green darken-1" flat="flat" @click="dialog = !dialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</v-container>
</template>

<script>
export default {
props:['text'],
data(){
    return{
        dialog:false,
        toggleAlert:false,
        alertText:'',
        alertType:'',
        textFake:" Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc"
    }
},
methods:{
  message(){
 alert('you copied that')
  },
  onCopy(){
    this.alertType = 'success'
    if(!this.toggleAlert)
    this.toggleAlert = !this.toggleAlert
this.alertText = 'Successfully copied to clipboard'
setTimeout(() => {
            this.toggleAlert = false;
        }, 3000);
  },
  onError(){
    this.alertType = 'error'
    if(!this.toggleAlert)
    this.toggleAlert = !this.toggleAlert
this.alertText = 'Successfully copied to clipboard'
  }
}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
