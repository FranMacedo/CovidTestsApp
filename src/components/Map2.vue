<template>
  <gmaps-map 
    :options="mapOptions" 
    @bounds-changed="changingBounds"
  
  >


     <gmaps-marker
            v-for="p in postos"
            :key="p.id"
            :position="getPosition(p)"
            @click="handleMarkerClicked(p)"

          ></gmaps-marker>

  <gmaps-info-window
  
        ref='info'
        :options="infoWindowOptions"
        :position="infoWindowPosition"
  >
            <div class="info-window">
              <h2 v-text="activePosto.posto_de_colheita"></h2>
              <p v-text="activePosto.horario_observacoes"></p>
              <p v-text="activePosto.morada"></p>


            </div>
    </gmaps-info-window>
  </gmaps-map>
</template>


<script>

import { gmapsMap, gmapsMarker, gmapsInfoWindow  } from 'x5-gmaps'
import json from './json/data.json'


export default {
  components: { gmapsMap, gmapsMarker,  gmapsInfoWindow},

  data(){
    return{
      postos: json,
      mapOptions: {
        center: {lat:39.7, lng:-8.082771},
        zoom: 12,
      },
      options: {
        position: {lat:39.7, lng:-8.082771},
      },
      infoWindowOptions: {
        opened: false,
        position: {lat:39.7, lng:-8.082771},
          pixelOffset: {
            width: 0,
            height: -35
          }
        },
      activePosto: {},
      infoWindowOpen: false,
    }
  },
  methods: {
    changingBounds(b){
      console.log(b)
      let visiblePostos = [];
      this.postos.forEach(posto => {

          let postoPosition = {};

          postoPosition = {position: this.getPosition(posto)} 
          
          let m = new window.google.maps.Marker( postoPosition );
          if( b.contains( m.getPosition() ) ){
              visiblePostos.push(posto);
          } 
      });
      console.log(visiblePostos)
    },
    getPosition(p){
        return {
          lat: parseFloat(p.latitude),
          lng: parseFloat(p.longitude),
        }
      },

    handleMarkerClicked(p) {

            this.activePosto = p;
            this.infoWindowOpen.position = p.this.getPosition(p)
            this.infoWindowOpen = true;
    },
  
  },
  computed: {
    infoWindowPosition(){
        return {
          lat: parseFloat(this.activePosto.latitude),
          lng: parseFloat(this.activePosto.longitude),
        }
      }
  }
}

</script>
