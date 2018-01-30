<template>
  <v-container fill-height justify-center align center>
      <v-flex xs12>
      <v-stepper v-model="e6" vertical>
    <v-stepper-step step="1" :complete="e6  > 1" editable>
      Select an avatar
    </v-stepper-step>
    <v-stepper-content step="1">
      <v-layout row wrap>
      <v-card color="grey lighten-1" class="mb-5" height="200px" width="200px">
        <v-container align-center justify-center>
          <v-flex xs12>
       <!-- <picture-input
        ref="pictureInput"
        @change="onChanged"
        @remove="onRemoved"
        :width="200"
        :hideChangeButton="true"
        :removable="true"
        :height="200"
        accept="image/jpeg, image/png, image/gif"
        buttonClass="ui button primary"
        :customStrings="{
        upload: '<h1>Upload it!</h1>',
        drag: 'Drag and drop your image here'}">
        >
        </picture-input>-->
        <picture-input 
      ref="pictureInput" 
      @change="onChange" 
      width="200" 
      height="200"  
      accept="image/jpeg,image/png" 
      size="10" 
      buttonClass="btn"
      :customStrings="{
        upload: '<h1>Bummer!</h1>',
        drag: 'Drag a 😺 GIF or GTFO'
      }">
    </picture-input>
        </v-flex>
        </v-container>
      </v-card>
      </v-layout>
      <v-layout row wrap>
      <v-btn color="primary" @click.native="e6 = 2">Continue</v-btn>
      <v-btn flat to="/">Cancel</v-btn>
      </v-layout>
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
      <v-layout row wrap>
        <v-flex xs4>
      <v-card color="grey lighten-1" class="mb-5" height="200px">
        <v-layout row>
          <v-flex xs3>
          <img :src="image" id="picture" style="height:100px; width:100px; border:1px solid black; margin:10px" alt="">
          </v-flex>
          <v-flex xs6>
             <v-text-field
          label="Username"
          :value="username"
          readonly
        ></v-text-field>
          <v-text-field
          label="email"
          :value="email"
          readonly
        ></v-text-field>
          <v-text-field
          label="Password"
          :value="password"
          :append-icon="e3 ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (e3 = !e3)"
          :type="e3 ? 'password' : 'text'"
          counter
        ></v-text-field>
          </v-flex>
          </v-layout>
      </v-card>
      </v-flex>
      </v-layout>
      <v-btn color="primary" @click.native="e6 = 1">Review Steps</v-btn>
      <v-btn color="success" @click="onRegister">Register</v-btn>
      <v-btn color="error" to='/'>Cancel</v-btn>
    </v-stepper-content>
  </v-stepper>
           <v-alert 
           :type="alertType"
           style="margin:0;"
           dismissible
           icon="error"
           v-model="showAlert"
           transition='fade-transition'>
      {{alertText}}
    </v-alert>
  </v-flex>
  </v-container>
</template>
<script>
import PictureInput from "vue-picture-input";
export default {
  components: { PictureInput },
  data() {
    return {
      e6: 1,
      showBtn: true,
      showImage: false,
      avatar:
        "https://humethnet.files.wordpress.com/2016/02/100px-biohazard_symbol_red-svg.png",
      valid: false,
      loader: null,
      loading: false,
      showAlert:true,
      alertType:"error",
      alertText:"There was an error with your registration",
      iconType:"error",
      e1: true,
      image:'',
      e2: true,
      e3:true,
      password: "",
      picker: null,
      ConfirmPassword: "",
      username: "",
      email: "",
      continueRegistry: true,
      passwordRules: [
        v => !!v || "Password cannot be blank",
        v =>
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/.test(v) ||
          "Password does not meet requirements: 1 lower case, 1 Upper case, 1 digit",
        v => v.length >= 6 || "Password must be at least 6 character long"
      ],
      Confirm: [
        v => !!v || "Password cannot be blank",
        v => v == this.password || "Password do not match"
      ],
      nameRules: [
        v => !!v || "Name is required",
        v => v.length <= 10 || "Name must be less than 10 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ]
    };
  },
  computed:{
    getRegisterStatus(){
      return this.$store.state.registrationStatus
    }
  },
  methods: {
    onRegister() {
      this.$store.dispatch("registerUser", {
        email: this.email,
        password: this.password,
        avatar: this.avatar,
        username:this.username
      });
    },
      onChange (image) {
      console.log('New picture selected!')
      if (image) {
        console.log('Picture loaded.')
        this.image = image
        console.log(this.image)
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!')
      }
    },
    upload() {
      this.showBtn = false;
      this.showImage = true;
    }
  },
  watch: {
    getRegisterStatus(){
      if(this.getRegisterStatus == true){

      }
      else{

      }
    },
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    }
  }
};
</script>
<style scoped>
.register-cover {
  background-image: url("");
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
.ui {
  display: inline-block;
}
#picture{
  transform: rotate(90deg) !important;
}
</style>
