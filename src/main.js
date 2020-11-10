import Vue from "vue";
import App from "./App.vue";
import VueGeolocation from "vue-browser-geolocation";
import * as VueGoogleMaps from "vue2-google-maps";
import GmapCluster from "vue2-google-maps/dist/components/cluster"; // replace src with dist if you have Babel issues
import vuetify from "./plugins/vuetify";
import VuetifyGoogleAutocomplete from "vuetify-google-autocomplete";
// import x5GMaps from "x5-gmaps";

Vue.config.productionTip = false;
Vue.use(VueGeolocation);

Vue.use(VueGoogleMaps, {
  load: {
    libraries: "places",
    region: "PT",
    language: "pt",
    key: process.env.VUE_APP_API_KEY,
  },
});

Vue.use(VuetifyGoogleAutocomplete, {
  vueGoogleMapsCompatibility: true,
});

Vue.component("GmapCluster", GmapCluster);
// Vue.use(x5GMaps, { key: "AIzaSyC6RDNLfkAC0OnQqPRjPA1LI8PQrmcSRmk", libraries: ["places"] });

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
