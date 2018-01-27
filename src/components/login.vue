<template>
<div style="height:100vh;widht=100vw" id="wrapper">
<v-container fill-height justify-center align-center>
    <v-layout row wrap justify-center align-center>
        <v-flex sm10 md6 lg6 xs12>
        <v-card class="grey lighten-3">
            <v-layout  justify-center align-center row style="height:50px;" class="indigo accent-1">
                <h3>Login</h3>
            </v-layout>
            <v-layout row wrap justify-center align-center>
            <v-flex xs12 md10 sm9 lg8>
            <v-form style="margin:10px;" v-model="valid">
    <v-text-field
    box
    hint="Enter your email address"
      label="E-mail"
      clearable
      v-model="email"
      append-icon="email"
      :rules="emailRules"
      required
    ></v-text-field>
    <v-text-field
    box
    clearable
    hint="Enter your password"
      label="password"
      v-model="password"
      :rules="passwordRules"
      append-icon="email"
      required
    ></v-text-field>
     <v-layout row justify-center align-center>
    <v-btn color="info">
    Submit
    </v-btn>
    <v-btn color="info">
    Clear
    </v-btn>
     </v-layout>
  </v-form>
  </v-flex>
  </v-layout>
        </v-card>
        </v-flex>
    </v-layout>
</v-container>
</div>
</template>
<script>
    export default{
data(){
    return{
        valid: false,
      password: '',
     passwordRules: [
        v => !!v || 'password is required'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ]
    }
}
    }
</script>
<style scoped>
#wrapper{
background-image: url('https://wallpaperbrowse.com/media/images/abstract-background-design.jpg');
background-size: cover;
background-repeat:   no-repeat;
background-position: center center;
overflow: hidden;
}
</style>
