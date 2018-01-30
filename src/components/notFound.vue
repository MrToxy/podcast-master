<template>
<v-container text-xs-center fill-height>
    <v-layout row wrap align-center justify-center>
        <v-flex xs12>
            <h1>Page not found</h1>
            <v-progress-linear :indeterminate="false"
            v-model="value"
            :active="show"
            background-color="error"
            color="blue"
            >
            </v-progress-linear>
            <h2>Redirecting to</h2> <span>Home page in {{seconds}} seconds</span>
        </v-flex>
    </v-layout>
</v-container>
</template>
<script>
    export default{
          data(){
            return{
                seconds:4,
                show:true,
                value:0
            }
        },
        computed:{
            getTimeout(){
                return this.seconds
            }
        },
        created(){        
    let interval = setInterval(() => {
    this.seconds = this.seconds - 1
    if (this.seconds == 0) {
        this.value += 25
        //Do something
        // Stop the counter
        this.$router.push('/podcasts')
    }
    this.value += 25
}, 1000);
            
        }
        
    }

</script>

