<template>
  <v-app>
    

    <v-main>
      <section v-if="errored">
    <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
  </section>

  <section v-else>
    <div v-if="loading" class="text-center">
       <v-progress-circular
      indeterminate
      color="green"
    ></v-progress-circular>
    </div>

    <div
      v-else
    >
      <Map :postos="postos"/>
  
    </div>

  </section>

    </v-main>
  </v-app>
</template>

<script>
import Map from './components/Map';
import axios from "axios";

export default {
  name: 'App',
  

  components: {
    Map,
  },

  data: () => ({
    postos: null,
    loading: true,
    errored: false

  }),

  mounted () {
 

     axios
      .get('http://testescovid.tk/api/labs/')
      .then(response => {
        this.postos = response.data
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
  }
};
</script>
