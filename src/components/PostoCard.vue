<template >
        
      <v-card
      @mouseover="setHover"    
      @mouseout="setHover"  
      :elevation="hover ? 5 : 2"

      style="margin: 0 1rem 0 1rem;"

  >
    <v-card-text>
      
      <div
      :title="posto.nome"
       class="text-truncate">
        {{posto.nome}}
    </div>
      
      
    </v-card-text>
     <v-card-actions>

       
<v-dialog
      v-model="dialog"
      width="500"
      :fullscreen="isSmall? true: false"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          title="mais detalhes"
        >
        <v-icon>mdi-details</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          Detalhes
        </v-card-title>

        <v-card-text>
          
          <p><b>Zona</b> <span>{{posto.ars_de_abrangencia}}</span></p>
          <p><b>morada</b> <span>{{posto.morada}}</span></p>
          <p><b>horario</b> <span>{{posto.horario_observacoes}}</span></p>
          <p><b>email</b> <span>{{posto.email}}</span></p>
          <b>telefones</b>
          <ul id="example-1">
              <li v-for="tel in posto.telefone" :key="tel.id">
              {{ tel.numero }}
              </li>
          </ul>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
     color="red lighten-2"
          dark
            @click="dialog = false"
          >
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  
    
      <v-spacer></v-spacer>

    <v-btn
        @click="$emit('zoom-posto')"
        title="mostrar no mapa"
        >
        <v-icon>mdi-google-maps</v-icon>
        </v-btn>
 
    </v-card-actions>
    
  </v-card>

</template>

<script>
export default {
  props: {
    posto: Object,
    bus: Object

  },
  data() {
      return{
        hover: false,
        dialog: false,

      }

    },
    methods: {
      zoomToMap(){
        console.log('here!')
      },
      setHover(){
        this.hover = this.hover ?  false: true;
      }
    },
    created() {
        this.bus.$on('changeHover', (args) => {
          this.hover = this.posto.id === args['hoveredId']
          // this.hoveredId = args['hoveredId']
        });
      },
   
    computed: {

      isSmall () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return true
          case 'sm': return true
          case 'md': return false
          case 'lg': return false
          case 'xl': return false
          default: return false
        }
      },
    },
}
</script>

<style scoped>
.above{
  z-index: 2;
}

</style>