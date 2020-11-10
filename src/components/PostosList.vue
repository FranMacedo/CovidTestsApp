 


<template>
  <div>
     



      <v-virtual-scroll
        :items="postos"
        height="500"
        item-height="115"
      >
        <template v-slot:default="{ item }">
          <PostoCard :posto="item" :bus="bus" v-on:zoom-posto="$emit('zoom-posto', item)"/> 

        </template>
      </v-virtual-scroll>
    
  </div>

</template>

<script>
  import PostoCard from './PostoCard'

  export default {
    components:{
      PostoCard
    },
    props: {
      postos: Array,
      bus: Object

    },
    data(){
      return{
                   benched: 0,
                   

      }
    },

  }
</script>

