<template>
  <v-container class="cont   elevation-18">
    <l-map elevation="18" :center="center" :zoom="zoom" class="map" ref="map" @update:center="centerUpdated"
      @update:zoom="zoomUpdated">

      <l-tile-layer :url="url">
      </l-tile-layer>
      <l-marker v-for="marker in markers" :key="marker.id" :lat-lng="marker.coord" :icon="icon">
        <l-icon :icon-size="dynamicSize" :icon-anchor="dynamicAnchor" icon-url="marker.png">
        </l-icon>
        <l-tooltip :content="marker.info">
        </l-tooltip>
      </l-marker>
    </l-map>

  </v-container>
</template>
<script>
import L from 'leaflet';
import { LMap, LTileLayer, LMarker, LIcon, LTooltip } from 'vue2-leaflet';
import axios from 'axios';

export default {
  beforeRouteEnter: (to, from, next) => {
    console.log("[IN-component] beforeEnter guard");
    let isAuth = sessionStorage.getItem("username");
    let role = sessionStorage.getItem("rol");
    return isAuth && role === 'Especialista' ? next() : next("/login")
  },


  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    LTooltip
  },  //poner componente
  data() {
    return {
      url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      center: [21.932827466063554, -79.43667879483456],
      /*  markerLatLng: [21.932827466063554, -79.43667879483456], */
      zoom: 9,
      //arreglo provisional hasta que conecte los elementos de la base de datos
      markers: [],
      id: 0,
      icon: L.icon({
        iconUrl: 'marker.png',
        iconSize: [27, 27],
        iconAnchor: [27, 27]
      }),
      staticAnchor: [16, 37],
      customText: 'Foobar',
      iconSize: 27,
      /* 21.948465971109822, -79.44234820272527*/
    }
  },
  created() {
    this.getLocations();
  },
  computed: {
    dynamicSize() {
      return [this.iconSize, this.iconSize * 1.15];
    },
    dynamicAnchor() {
      return [this.iconSize / 2, this.iconSize * 1.15];
    },

  },
  /*   created(){
      this.initialize()
    },
     */
  methods: {
    centerUpdated(center) {
      this.center = center;
    },
    /* 21.937442081047045, -79.44103443609232 */
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    /*  initialize(){
     this.markerLatLng.push({
         
     }) */
    async getLocations() {
      var locations = [];
      var pagina =1;
 await axios.all([
        await axios.get('http://localhost:1337/api/arroceras?pagination[page]='+pagina+'&pagination[pageSize]=1').then((response) => {
          const arroceras = response.data.data
          arroceras.forEach(item => {
            locations.push({
              id: 1,
              coord: [item.attributes.latitud, item.attributes.longitud],
              info: `
            <p>
                  Entidades Arroceras
                  <br/>
                  Nombre:  ${item.attributes.nombre_entidad}
                  <br/>
                  Potencial Biogás Promedio: ${item.attributes.pdprom}
                  <br/>
                  Potencial Biogás Cocción de Alimentos: ${item.attributes.alimentos}
                  <br/>
                  Potencial Biogás Equipos de Calor: ${item.attributes.calor}
                  <br/>
                  Potencial Biogás Electricidad Mínima: ${item.attributes.elec_min}
                  <br/>
                  Potencial Biogás Electricidad Mínima: ${item.attributes.elec_max}
               <p/>`
            })
          });

        }),
        await axios.get('http://localhost:1337/api/porcinos?pagination[page]='+pagina+'&pagination[pageSize]=1')
          .then((response) => {
            const porcinos = response.data.data
            porcinos.forEach(item => {
              locations.push({
                id:   2,
                coord: [item.attributes.latitud, item.attributes.longitud],
                info: `
            <p>
                  Residuos Porcinos
                  <br/>
                  
                  Nombre:  ${item.attributes.nombre_entidad}
                  <br/>
                  Potencial Biogás Promedio: ${item.attributes.pdprom}
                  <br/>
                  Potencial Biogás Cocción de Alimentos: ${item.attributes.alimentos}
                  <br/>
                  Potencial Biogás Equipos de Calor: ${item.attributes.calor}
                  <br/>
                  Potencial Biogás Electricidad Mínima: ${item.attributes.elec_min}
                  <br/>
                  Potencial Biogás Electricidad Mínima: ${item.attributes.elec_max}
               <p/>`
              })
            });

          }),
        await axios.get('http://localhost:1337/api/ganadomayors?pagination[page]='+pagina+'&pagination[pageSize]=1')
          .then((response) => {
            const ganadomayors = response.data.data
            ganadomayors.forEach(item => {
              locations.push({
                id:   3,
                coord: [item.attributes.latitud, item.attributes.longitud],
                info: `
            <p>
                  Residuos de Ganado Mayor
                  <br/>
                  
                  Nombre:  ${item.attributes.nombre_entidad}
                  <br/>
                  Potencial Biogás Promedio: ${item.attributes.pdprom}
                  <br/>
                  Potencial Biogás Cocción de Alimentos: ${item.attributes.alimentos}
                  <br/>
                  Potencial Biogás Equipos de Calor: ${item.attributes.calor}
                  <br/>
                  Potencial Biogás Electricidad Mínima: ${item.attributes.elec_min}
                  <br/>
                  Potencial Biogás Electricidad Mínima: ${item.attributes.elec_max}
               <p/>`
              })
            });

          }),
        await axios.get('http://localhost:1337/api/equinos?pagination[page]='+pagina+'&pagination[pageSize]=1')
          .then((response) => {
            const equinos = response.data.data
            equinos.forEach(item => {
              locations.push({
                id:   4,
                coord: [item.attributes.latitud, item.attributes.longitud],
                info: `
            <p>
                  Residuos Equinos
                  <br/>
                  
                  Nombre:  ${item.attributes.nombre_entidad}
                  <br/>
                  Potencial Biogás Promedio: ${item.attributes.pdprom}
                  <br/>
                  Potencial Biogás Cocción de Alimentos: ${item.attributes.alimentos}
                  <br/>
                  Potencial Biogás Equipos de Calor: ${item.attributes.calor}
                  <br/>
                  Potencial Biogás Electricidad Mínima: ${item.attributes.elec_min}
                  <br/>
                  Potencial Biogás Electricidad Mínima: ${item.attributes.elec_max}
               <p/>`
              })
            });

          }),
        await axios.get('http://localhost:1337/api/ganadomenors?pagination[page]='+pagina+'&pagination[pageSize]=1')
          .then((response) => {
            const ganadomenors = response.data.data
            ganadomenors.forEach(item => {
              locations.push({
                id:   5,
                coord: [item.attributes.latitud, item.attributes.longitud],
                info: `
            <p>
                  Ganado Menor
                  <br/>
                  
                  Nombre:  ${item.attributes.nombre_entidad}
                  <br/>
                  Potencial Biogás Promedio: ${item.attributes.pdprom}
                  <br/>
                  Potencial Biogás Cocción de Alimentos: ${item.attributes.alimentos}
                  <br/>
                  Potencial Biogás Equipos de Calor: ${item.attributes.calor}
                  <br/>
                  Potencial Biogás Electricidad Mínima: ${item.attributes.elec_min}
                  <br/>
                  Potencial Biogás Electricidad Mínima: ${item.attributes.elec_max}
               <p/>`
              })
            });

          }),
        await axios.get('http://localhost:1337/api/avicolas?pagination[page]='+pagina+'&pagination[pageSize]=1')
          .then((response) => {
            const avicolas = response.data.data
            avicolas.forEach(item => {
              locations.push({
                id:   6,
                coord: [item.attributes.latitud, item.attributes.longitud],
                info: `
            <p>
                  Residuos Avicolas
                  <br/>
                  
                  Nombre:  ${item.attributes.nombre_entidad}
                  <br/>
                  Potencial Biogás Promedio: ${item.attributes.pdprom}
                  <br/>
                  Potencial Biogás Cocción de Alimentos: ${item.attributes.alimentos}
                  <br/>
                  Potencial Biogás Equipos de Calor: ${item.attributes.calor}
                  <br/>
                  Potencial Biogás Electricidad Mínima: ${item.attributes.elec_min}
                  <br/>
                  Potencial Biogás Electricidad Mínima: ${item.attributes.elec_max}
               <p/>`
              })
            });

          }),
        await axios.get('http://localhost:1337/api/cuniculas?pagination[page]='+pagina+'&pagination[pageSize]=1')
          .then((response) => {
            const cuniculas = response.data.data
            cuniculas.forEach(item => {
              locations.push({
                id:   7,
                coord: [item.attributes.latitud, item.attributes.longitud],
                info: `
            <p>
                  Residuos Cuniculas
                  <br/>
                  
                  Nombre:  ${item.attributes.nombre_entidad}
                  <br/>
                  Potencial Biogás Promedio: ${item.attributes.pdprom}
                  <br/>
                  Potencial Biogás Cocción de Alimentos: ${item.attributes.alimentos}
                  <br/>
                  Potencial Biogás Equipos de Calor: ${item.attributes.calor}
                  <br/>
                  Potencial Biogás Electricidad Mínima: ${item.attributes.elec_min}
                  <br/>
                  Potencial Biogás Electricidad Mínima: ${item.attributes.elec_max}
               <p/>`
              })
            });

          }),
        await axios.get('http://localhost:1337/api/arroceras?pagination[page]='+pagina+'&pagination[pageSize]=1')
          .then((response) => {
            const azucareras = response.data.data
            azucareras.forEach(item => {
              locations.push({
                id:   8,
                coord: [item.attributes.latitud, item.attributes.longitud],
                info: `
            <p>
                  Residuos Arroz
                  <br/>
                  
                  Nombre:  ${item.attributes.nombre_entidad}
                  <br/>
                  Potencial Biogás Promedio: ${item.attributes.pdprom}
                  <br/>
                  Potencial Biogás Cocción de Alimentos: ${item.attributes.alimentos}
                  <br/>
                  Potencial Biogás Equipos de Calor: ${item.attributes.calor}
                  <br/>
                  Potencial Biogás Electricidad Mínima: ${item.attributes.elec_min}
                  <br/>
                  Potencial Biogás Electricidad Mínima: ${item.attributes.elec_max}
               <p/>`
              })
            });

          }),
        await axios.get('http://localhost:1337/api/granos?pagination[page]='+pagina+'&pagination[pageSize]=1')
          .then((response) => {
            const granos = response.data.data
            granos.forEach(item => {
              locations.push({
                id:   9,
                coord: [item.attributes.latitud, item.attributes.longitud],
                info: `
            <p>
                  Residuos Granos
                  <br/>
                  
                  Nombre:  ${item.attributes.nombre_entidad}
                  <br/>
                  Potencial Biogás Promedio: ${item.attributes.pdprom}
                  <br/>
                  Potencial Biogás Cocción de Alimentos: ${item.attributes.alimentos}
                  <br/>
                  Potencial Biogás Equipos de Calor: ${item.attributes.calor}
                  <br/>
                  Potencial Biogás Electricidad Mínima: ${item.attributes.elec_min}
                  <br/>
                  Potencial Biogás Electricidad Mínima: ${item.attributes.elec_max}
               <p/>`
              })
            });

          }),
        await axios.get('http://localhost:1337/api/pescas?pagination[page]='+pagina+'&pagination[pageSize]=1')
          .then((response) => {
            const pescas = response.data.data
            pescas.forEach(item => {
              locations.push({
                id:   10,
                coord: [item.attributes.latitud, item.attributes.longitud],
                info: `
            <p>
                  Residuos Pesca
                  <br/>
                  
                  Nombre:  ${item.attributes.nombre_entidad}
                  <br/>
                  Potencial Biogás Promedio: ${item.attributes.pdprom}
                  <br/>
                  Potencial Biogás Cocción de Alimentos: ${item.attributes.alimentos}
                  <br/>
                  Potencial Biogás Equipos de Calor: ${item.attributes.calor}
                  <br/>
                  Potencial Biogás Electricidad Mínima: ${item.attributes.elec_min}
                  <br/>
                  Potencial Biogás Electricidad Mínima: ${item.attributes.elec_max}
               <p/>`
              })
            });

          }),
        await axios.get('http://localhost:1337/api/conservas?pagination[page]='+pagina+'&pagination[pageSize]=1')
          .then((response) => {
            const conservas = response.data.data
            conservas.forEach(item => {
              locations.push({
                id:   11,
                coord: [item.attributes.latitud, item.attributes.longitud],
                info: `
            <p>
                  Residuos Conserva
                  <br/>
                  
                  Nombre:  ${item.attributes.nombre_entidad}
                  <br/>
                  Potencial Biogás Promedio: ${item.attributes.pdprom}
                  <br/>
                  Potencial Biogás Cocción de Alimentos: ${item.attributes.alimentos}
                  <br/>
                  Potencial Biogás Equipos de Calor: ${item.attributes.calor}
                  <br/>
                  Potencial Biogás Electricidad Mínima: ${item.attributes.elec_min}
                  <br/>
                  Potencial Biogás Electricidad Mínima: ${item.attributes.elec_max}
               <p/>`
              })
            });

          }),
        await axios.get('http://localhost:1337/api/lacteas?pagination[page]='+pagina+'&pagination[pageSize]=1')
          .then((response) => {
            const lacteas = response.data.data
            lacteas.forEach(item => {
              locations.push({
                id:   12,
                coord: [item.attributes.latitud, item.attributes.longitud],
                info: `
            <p>
                  Residuos Lácteos
                  <br/>
                  
                  Nombre:  ${item.attributes.nombre_entidad}
                  <br/>
                  Potencial Biogás Promedio: ${item.attributes.pdprom}
                  <br/>
                  Potencial Biogás Cocción de Alimentos: ${item.attributes.alimentos}
                  <br/>
                  Potencial Biogás Equipos de Calor: ${item.attributes.calor}
                  <br/>
                  Potencial Biogás Electricidad Mínima: ${item.attributes.elec_min}
                  <br/>
                  Potencial Biogás Electricidad Mínima: ${item.attributes.elec_max}
               <p/>`
              })
            });

          }),
        await axios.get('http://localhost:1337/api/bebidaslicores?pagination[page]='+pagina+'&pagination[pageSize]=1')
          .then((response) => {
            const bebidaslicores = response.data.data
            bebidaslicores.forEach(item => {
              locations.push({
                id:   13,
                coord: [item.attributes.latitud, item.attributes.longitud],
                info: `
            <p>
                  Residuos Bebidas Licores
                  <br/>
                  
                  Nombre:  ${item.attributes.nombre_entidad}
                  <br/>
                  Potencial Biogás Promedio: ${item.attributes.pdprom}
                  <br/>
                  Potencial Biogás Cocción de Alimentos: ${item.attributes.alimentos}
                  <br/>
                  Potencial Biogás Equipos de Calor: ${item.attributes.calor}
                  <br/>
                  Potencial Biogás Electricidad Mínima: ${item.attributes.elec_min}
                  <br/>
                  Potencial Biogás Electricidad Mínima: ${item.attributes.elec_max}
               <p/>`
              })
            });

          }),
        await axios.get('http://localhost:1337/api/cultivosvarios?pagination[page]='+pagina+'&pagination[pageSize]=1')
          .then((response) => {
            const cultivosvarios = response.data.data
            cultivosvarios.forEach(item => {
              locations.push({
                id:   14,
                coord: [item.attributes.latitud, item.attributes.longitud],
                info: `
            <p>
                  Residuos Cultivos Varios
                  <br/>
                  
                  Nombre:  ${item.attributes.nombre_entidad}
                  <br/>
                  Potencial Biogás Promedio: ${item.attributes.pdprom}
                  <br/>
                  Potencial Biogás Cocción de Alimentos: ${item.attributes.alimentos}
                  <br/>
                  Potencial Biogás Equipos de Calor: ${item.attributes.calor}
                  <br/>
                  Potencial Biogás Electricidad Mínima: ${item.attributes.elec_min}
                  <br/>
                  Potencial Biogás Electricidad Mínima: ${item.attributes.elec_max}
               <p/>`
              })
            });

          }),
        await axios.get('http://localhost:1337/api/carnicas?pagination[page]='+pagina+'&pagination[pageSize]=1')
          .then((response) => {
            const carnicas = response.data.data
            carnicas.forEach(item => {
              locations.push({
                id:   15,
                coord: [item.attributes.latitud, item.attributes.longitud],
                info: `
            <p>
                  Residuos Cárnicos
                  <br/>
                  
                  Nombre:  ${item.attributes.nombre_entidad}
                  <br/>
                  Potencial Biogás Promedio: ${item.attributes.pdprom}
                  <br/>
                  Potencial Biogás Cocción de Alimentos: ${item.attributes.alimentos}
                  <br/>
                  Potencial Biogás Equipos de Calor: ${item.attributes.calor}
                  <br/>
                  Potencial Biogás Electricidad Mínima: ${item.attributes.elec_min}
                  <br/>
                  Potencial Biogás Electricidad Mínima: ${item.attributes.elec_max}
               <p/>`
              })
            });

          }),
        await axios.get('http://localhost:1337/api/rsus?pagination[page]='+pagina+'&pagination[pageSize]=1')
          .then((response) => {
            const rsus = response.data.data
            rsus.forEach(item => {
              locations.push({
                id:   16,
                coord: [item.attributes.latitud, item.attributes.longitud],
                info: `
            <p>
                  Residuos Sólidos Urbanos
                  <br/>
                  
                  Nombre:  ${item.attributes.nombre_entidad}
                  <br/>
                  Potencial Biogás Promedio: ${item.attributes.pdprom}
                  <br/>
                  Potencial Biogás Cocción de Alimentos: ${item.attributes.alimentos}
                  <br/>
                  Potencial Biogás Equipos de Calor: ${item.attributes.calor}
                  <br/>
                  Potencial Biogás Electricidad Mínima: ${item.attributes.elec_min}
                  <br/>
                  Potencial Biogás Electricidad Mínima: ${item.attributes.elec_max}
               <p/>`
              })
            });

          })



      ])

      this.markers = locations
      console.log('Markers', this.markers)
    }

  }
}
</script>

<style scoped>
.map {
  position: absolute;
  width: 100%;
  height: 600px;
  overflow: hidden;
  margin-left: -20px;
  padding-left: -20px;
  margin-left: -12px;
  border-radius: 25px;
  margin-top: -11px;


}

.cont {
  margin-top: 7px;
  box-shadow: 18;
  position: absolute;
  width: 100%;
  height: 510px;
  overflow: hidden;
  margin-left: -12px;
  padding-left: -12px;
  margin-left: -12px;
  border-radius: 25px;

}

.toolTip {
  position: absolute;
  width: 10px;
  height: 120px;
  overflow: hidden;
  margin-left: -20px;
  padding-left: -20px;
  margin-left: -12px;
  border-radius: 25px;
  margin-top: -11px;
}
</style>
