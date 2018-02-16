# podcast-vue-vuetify-vuex

>This is an ongoing college project to be used along sinde a python API to transcribe podcasts to text, therefore until the API is Fully completed the application is communicating with a mockup api just for show purposes.
- The interface is clean and minimalistic and functionality driven.
- There are still a lot of things to be worked on but the basic "skeleton" is there

# Starting up the project
1. Download the file as zip, or clone it
1. cd into the project directory and run the command `npm install`  to install all dependencies
1. run npm run dev

# Problems starting up the project 

> If encountering any problems with npm run dev try to install webpack and webpack server locally and the re-run npm run dev:

* `npm install --save-dev webpack`
* `npm install --save-dev webpack-dev-server`

# Known bugs so far
> While travelling directly to "/podcasts/favourite" without letting the app default to "/podcasts" will result in no data displayed.
>This is due to the way the http request was implemented, it loads on the created hook of the podcasts route component instead of the created hook of app.vue.

# Tests

> To mimic a no login or failed login situation under src/store/store.js change the propery user to user:null
> To mimic a successful login go to src/store/store.js and change the user property to user:{username:'something',favouritePodcasts:[1,2,3,4,,50]} choose so ids



