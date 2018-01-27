<template>
  <v-container fill-height justify-center align center>
      <v-flex xs12>
      <v-stepper v-model="e6" vertical>
    <v-stepper-step step="1" :complete="e6  > 1" editable>
      Select an avatar
    </v-stepper-step>
    <v-stepper-content step="1">
      <v-card color="grey lighten-1" class="mb-5" height="100px" width="100px">
                          <v-card-media
      transition="fade-transition"
      :src="avatar"
      height="100px"
      v-show="showImage"
    >
    </v-card-media>
    <v-layout row justify-center align-center>
    <v-card-actions>
       <v-btn
          :loading="loading"
          @click.native="loader = 'loading'"
          :disabled="loading"
          color="blue-grey"
          class="white--text"
          flat
          style="margin:0;"
          >
          <v-icon>cloud_upload</v-icon>
          </v-btn>
    </v-card-actions>
    </v-layout>
      </v-card>
      <v-btn color="primary" @click.native="e6 = 2">Continue</v-btn>
      <v-btn flat to="/">Cancel</v-btn>
    </v-stepper-content>
    <v-stepper-step step="2" :complete="e6 > 2" editable="">Credentials</v-stepper-step>
    <v-stepper-content step="2">
              <v-card class="grey lighten-3 mb-5">
            <v-layout row wrap justify-center align-center>
            <v-flex xs12 md10 sm9 lg8>
            <v-form style="margin:10px;" v-model="valid">
     <v-text-field
    box
    hint="Enter your username"
      label="Username"
      v-model="username"
      append-icon="accessibility"
      :rules="nameRules"
      :counter="10"
      required
    ></v-text-field>
    <v-text-field
    box
    hint="Enter your email address"
      label="E-mail"
      v-model="email"
      append-icon="email"
      :rules="emailRules"
      required
    ></v-text-field>
    <v-text-field
          name="input-10-1"
          required
          box
          label="Password"
          hint="At least 6 characters"
          v-model="password"
          min="6"
          :rules="passwordRules"
          :append-icon="e1 ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (e1 = !e1)"
          :type="e1 ? 'password' : 'text'"
          counter
        ></v-text-field>
        <v-text-field
          name="input-10-1"
          required
          box
          label="Confirm Password"
          v-model="ConfirmPassword"
          :rules="Confirm"
          :append-icon="e2 ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (e2 = !e2)"
          :type="e2 ? 'password' : 'text'"
        ></v-text-field>
  </v-form>
  </v-flex>
  </v-layout>
        </v-card>
      <v-btn color="primary" @click.native="e6 = 3">Continue</v-btn>
      <v-btn flat @click.native="e6 = 1">Back</v-btn>
    </v-stepper-content>
    <v-stepper-step step="3" :complete="e6 >= 2" editable="">View setup instructions</v-stepper-step>
    <v-stepper-content step="3">
      <v-card color="grey lighten-1" class="mb-5" height="200px">
      </v-card>
      <v-btn color="primary" @click.native="e6 = 1">Review Steps</v-btn>
      <v-btn color="success">Register</v-btn>
      <v-btn color="error" to='/'>Cancel</v-btn>
    </v-stepper-content>
  </v-stepper>
  </v-flex>
  </v-container>
</template>
<script>
    export default{
        data(){
            return{
                e6:1,
                showBtn:true,
                showImage:false,
                avatar:'https://humethnet.files.wordpress.com/2016/02/100px-biohazard_symbol_red-svg.png',
                valid: false,
                loader:null,
                loading:false,
                e1: true,
                e2:true,
                password: '',
                picker:null,
                ConfirmPassword:'',
                username: '',
                email: '',
                continueRegistry:true,
                passwordRules:[
                  v => !!v || 'Password cannot be blank',
                  v => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/.test(v) || 'Password does not meet requirements: 1 lower case, 1 Upper case, 1 digit',
                  v => v.length >= 6 || 'Password must be at least 6 character long'
                ],
                Confirm:[
                  v => !!v || 'Password cannot be blank',
                  v => v == this.password || 'Password do not match',
                ],
                nameRules: [
                  v => !!v || 'Name is required',
                  v => v.length <= 10 || 'Name must be less than 10 characters'
                ],
                emailRules: [
                  v => !!v || 'E-mail is required',
                  v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
                ]
            }
        },
        methods:{
          upload(){
            this.showBtn = false;
            this.showImage = true;

          }
        },
         watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      }
    }
    }
</script>
<style scoped>
.register-cover{
  background-image: url('');
  background-position: center;
  background-size: cover;
}

 .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
