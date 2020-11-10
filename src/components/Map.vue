<template>
  <div>
          <div class="text-h5 mb-6 text-center">
            Laboratórios com testes disponiveis
          </div>
  

    <v-container>
      <!-- <h1>Your coordinates</h1> -->

      <!-- <p>{{userCoordinates.lat }} Latitude, {{userCoordinates.lng }} Longitude</p> -->
      <!-- {{postos}} -->

     
      <v-row>
      
      <v-col
      md="6"
      sm="12"

      >       
        <vuetify-google-autocomplete
          id="map"
          placeholder="Procurar Zona"
          v-on:placechanged="setPlace"
          country="pt"
          :options="{}"

        >
          <template #append-outer>
              <v-icon>
                mdi-magnify
              </v-icon>
          </template>
        </vuetify-google-autocomplete>
        
        <PostosList :postos="visiblePostos" :bus="bus" v-on:zoom-posto="centerAndZoom"/>
     
      </v-col>


      
      <v-col
      md="6"
      sm="12"

      >


      <gmap-map
        :center="center"
        :zoom="zoom"
        style="width:100%; height:85vh"
        @click="handleInfoWindowClose"
        @bounds_changed="onBoundsChange"
        ref="map"
      >

        <gmap-cluster
        :zoomOnClick="true"
        
        >
          <gmap-info-window
            :options="infoWindowOptions"
            :position="infoWindowPosition"
            :opened="infoWindowOpen"
            @closeclick="handleInfoWindowClose"
          >
            <div class="info-window">
              <h2 v-text="activePosto.nome"></h2>
              <p v-text="activePosto.horario_observacoes"></p>
              <p v-text="activePosto.morada"></p>


            </div>
          </gmap-info-window>

          <gmap-marker
            v-for="r in postos"
            :key="r.id"
            :position="getPosition(r)"
            :clickable="true"
            :draggable="false"
            @click="handleMarkerClicked(r)"
            @mouseover="handleMarkerMouseOver(r)"
            @mouseout="handleMarkerMouseOut"
          ></gmap-marker>
        </gmap-cluster>
      
      </gmap-map>
      </v-col>
      </v-row>
    </v-container>
  </div>

</template>


<script>
  // import json from './json/data.json'
  import PostosList from './PostosList'
  import Vue from "vue";

  export default {
    components:{
      PostosList
    },
     props: {
      postos: Array,

    },
    data(){
      return{

        center: {lat:39.7, lng:-8.082771},
        zoom: 13,
        infoWindowOptions: {
          pixelOffset: {
            width: 0,
            height: -35
          }
        },
        activePosto: {},
        infoWindowOpen: false,
        currentPlace: null,
        visiblePostos: [],
        hoveredId: null,
        bus: new Vue(),
      }
    },
    created(){
      // get coordinates
      this.$getLocation({})
      .then(userCoordinates => {
        this.center = userCoordinates;
      })
      .catch(error=> {
        console.log(error)
        this.zoom = 7
      })
    },

    mounted(){
      this.$refs.map.$mapPromise.then(() => {
      // this.onZoomChange();
    })
    },

    methods: {
      onBoundsChange(){
          const b = this.$refs.map.$mapObject.getBounds();
          let visiblePostos = [];

          this.postos.forEach(posto => {

            let postoPosition = {};

            postoPosition = {position: this.getPosition(posto)} 


            let m = new window.google.maps.Marker( postoPosition );
            if( b.contains( m.getPosition() ) ){
                visiblePostos.push(posto);
            }
            
        });

        this.visiblePostos = visiblePostos;
      },
      centerAndZoom(location, zoom=18){

          const centerPoint = {
            lat: location.latitude,
            lng: location.longitude
          } 

          this.center = centerPoint;
          if(zoom > this.zoom){
          
          this.zoom = zoom;
          }else{
            this.zoom = this.zoom + 1
          }

      },
       setPlace(place) {
        //  console.log('here!')
        //  console.log(place)

          this.centerAndZoom(place, 15);
          this.currentPlace = place;
      
    },
    searchPlace() {
      if (this.currentPlace) {
        this.centerAndZoom(this.currentPlace, 15)
        this.currentPlace = null;
      }
    },
      getPosition(r){
        return {
          lat: parseFloat(r.latitude),
          lng: parseFloat(r.longitude),
        }
      },
       handleMarkerClicked(r) {
            this.activePosto = r;
            this.infoWindowOpen = true;
        },
        handleInfoWindowClose(){
          this.activePosto = {};
          this.infoWindowOpen = false;
          this.bus.$emit('changeHover', {
              hoveredId: null
          });
        },
        handleMarkerMouseOver(p){

     
          this.bus.$emit('changeHover', {
              hoveredId: p.id
          });


        },
        handleMarkerMouseOut(){
          if(!this.infoWindowOpen){
            this.bus.$emit('changeHover', {
              hoveredId: null
          });
          }
          
        }
        
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

<style>

.container {
display: flex;
justify-content: center;

}
</style>