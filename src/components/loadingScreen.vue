<template>
  <v-layout row fill-height justify-center align-center>
      <v-layout row class="text-xs-center">
          <h1>Loading Content...</h1>
      </v-layout>
      <v-layout row mb-20>
           <v-progress-circular indeterminate :size="70" :width="7" color="purple"></v-progress-circular>
      </v-layout>
  </v-layout>
</template>
<script>
export default {
  data(){
      return{

      }
  }
}
</script>
<style scoped>

</style>

