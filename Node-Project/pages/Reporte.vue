<template >
  
  <v-container>
<v-col>
  <v-data-table :headers="headers" :items="entidadesFiltradas" :search="search" sort-by="calories"
    class="elevation-18 mx-auto mt-4"  hide-default-footer >
   <template #top>
      <v-toolbar flat >
        <v-row>
          <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }"> 
        <v-icon v-bind="attrs" v-on="on" color="green" @click="reboot()">mdi-arrow-left</v-icon>
      </template>
      <span>Comenzar de nuevo</span>
      <v-spacer mx="auto" vertical></v-spacer>
    </v-tooltip>
          
<v-col><v-select v-model="tipoEntidadSeleccionada" class="ml-3" placeholder="Filtrar por Tipo de Entidad" :items="tipoEntidad" 
          @change="filtrar()" clearable></v-select></v-col>
<v-col><v-select v-model="tipoResiduoSeleccionado" class="mr-3" placeholder="Filtrar por Tipo de Residuo" :items="tipoResiduo"
             @change="filtrar()" clearable></v-select></v-col>
          
           <!--  &nbsp;&nbsp;&nbsp;
 -->
          
             </v-row>
        </v-toolbar>
       <v-toolbar flat>
        <v-col>
        <v-select :items="provincias" @change="llenarMunicipios()" v-model="Completar.provincia" item-text="provincia"
          placeholder="Filtrar por Provincia" clearable></v-select>
      </v-col>
      <v-col>
        <v-select :items="municipios" @change="verMuni()" item-text="municipio" v-model="Completar.municipio"
          placeholder="Filtrar por Municipio" clearable></v-select>
      </v-col>
          
<v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" color="green" text @click="descargarExcel()" class="elevation-2"> 
        <v-icon color="green">mdi-file-excel</v-icon>
        </v-btn>
      </template>
      <span>Exportar a excel</span>
      <v-spacer mx="auto" vertical></v-spacer>
    </v-tooltip>
  <!--   <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          text
          dark
          v-bind="attrs"
          v-on="on"
          @click="descargarPDF()"
          class="elevation-2"
        > 
        <v-icon
              color="error">mdi-file-pdf-box</v-icon>
        
        </v-btn>
      </template>
      <span>Exportar a pdf</span>
      <v-spacer mx="auto" vertical></v-spacer>
    </v-tooltip> -->
       
      </v-toolbar>
     

    </template>



  </v-data-table>
</v-col>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
    <v-row>
     
    
      <v-divider></v-divider>  
    
    <v-btn  color="blue lighten-3"  x-small @click="paginaAnterior()"><v-icon color="gray">mdi-arrow-left</v-icon></v-btn>
    &nbsp;<v-btn color="blue lighten-3" x-small @click="paginaSiguiente()"><v-icon color="gray">mdi-arrow-right</v-icon></v-btn>
    &nbsp; &nbsp;
    <v-banner>
         <h4> Page: {{page}}</h4>
     </v-banner>



    </v-row>

  </v-container>






</template>
  
  
<script>

const axios = require('axios')
/*  import { jsontoexcel } from "vue-table-to-excel"; */

import exportFromJson from "export-from-json"
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';


export default {
  beforeRouteEnter: (to, from, next) => {
    console.log("[IN-component] beforeEnter guard");
    let isAuth = sessionStorage.getItem("username");
    let role = sessionStorage.getItem("rol");
    return isAuth && role === 'Especialista' ? next() : next("/login")
  },
  data: () => ({
    search: '',
    page: '',
      pageCount: '',
      pageSize:'',
      total:'',
    tipoResiduoSeleccionado: '',
    tipoEntidadSeleccionada: '',
    Completar: {
        provincia: '',
        municipio: '',
      },
      provincias: [],
      municipios: [],

    dialog: false,
    dialogDelete: false,
    autoCompleteInput: {},
   
    tipoResiduo: [
      'Cunícula',
      'Equinos',
      'Porcinas',
      'Ganado Mayor',
      'Avícolas',
      'Ganado Menor',
      'Bebidas Licores',
      'Cultivos Varios',
      'Arroceras',
      'Azucareras',
      'Granos',
      'Pesca',
      'Carnicas',
      'Residuos Sólidos Urbanos',
      'Conserva',
      'Lácteas',

    ],
    tipoEntidad: [],
    json: {
      dataSource: [

      ],
      head: [
        "nombre_entidad",
        "provincia",
        "municipio",
        "pdprom",
        "alimentos",
        "calor",
        "elec_min",
        "elec_max",
        "tipo_residuo",
        "tipo_entidad",



      ],
      fileName: "download.xls"
    },
    headers: [

      { text: 'Tipo Residuo', value: 'tipo_residuo', align: 'start' },
      { text: 'Tipo Entidad', value: 'tipo_entidad' },

      { text: 'Provincia', value: 'provincia', align: 'start' },
      { text: 'Municipio', value: 'municipio' },
      { text: 'Nombre entidad', value: 'nombre_entidad' },
      { text: 'Potencial Promedio', value: 'pdprom' },
      { text: 'Cocción Alimentos', value: 'alimentos' },
      { text: 'Equipos de Calor', value: 'calor' },
      { text: 'Electricidad Mínima', value: 'elec_min' },
      { text: 'Electricidad Máxima', value: 'elec_max' },




    ],
    entidades: [],
    entidadesFiltradas: []

  }),




  created() {
    this.initialize();

  },

  methods: {
    
descargarPDF(){
  var doc = new jsPDF('p', 'pt');
  doc.text('Entidades Generadoras de Residuos', 40, 40);
  autoTable(doc, {
  head: [['tipo residuo', 
'tipo entidad', 
'provincia', 
'municipio', 
'nombre entidad', 
'pdprom', 
'alimentos', 
'calor', 
'elec min', 
'elec max' ]],

  columnStyles: { 0: { halign: 'center' } }, 
  margin: { top: 50},
body: [ //convertir a string esto
  [this.entidadesFiltradas.tipo_residuo],
  [this.entidadesFiltradas.tipo_entidad],
  [this.entidadesFiltradas.provincia],
  [this.entidadesFiltradas.municipio],
  [this.entidadesFiltradas.nombre_entidad],
  [this.entidadesFiltradas.pdprom],
  [this.entidadesFiltradas.alimentos],
  [this.entidadesFiltradas.calor],
  [this.entidadesFiltradas.elec_min],
  [this.entidadesFiltradas.elec_max],



]
      });
    
      doc.save('headers.pdf');
      console.log(this.entidadesFiltradas);
},

descargarExcel() {
      const data = this.entidadesFiltradas;
      /* const data=this.json.dataSource.push(this.search); */
      const fileName = 'download.xls';
      const head = this.json.head;
      const exportType = exportFromJson.types.xls
      exportFromJson({ head, data, fileName, exportType })
    },
    paginaSiguiente(){//si toco el boton de flecha derecha
      if(this.page <= 17){
        this.page ++;
        this.entidades = [];
        this.initialize()
      }
           },
        paginaAnterior(){//si toco el boton de flecha izquierda
      this.page --;
      this.entidades = [];
      this.initialize()
           },
    async initialize() {
      

      
      await axios.get('http://localhost:1337/api/tiposentidads/').then((response) => {
          response.data.data.forEach((item) => {
            this.tipoEntidad.push(item.attributes.tipo_entidad)//cambiar esto por tipo_entidad
          })
        })
        .catch((error) => {
          console.error(error)
        });
var pagina = this.page;
await axios.all([
await axios.get('http://localhost:1337/api/cuniculas?pagination[page]='+pagina+'&pagination[pageSize]=1').then((response) => {
  this.page =  response.data.meta.pagination.page ,
  
          response.data.data.forEach((item) => {
            this.entidades.push({

              nombre_entidad: item.attributes.nombre_entidad,
              provincia: item.attributes.provincia,
              municipio: item.attributes.municipio,
              pdprom: item.attributes.pdprom,
              alimentos: item.attributes.alimentos,
              calor: item.attributes.calor,
              elec_min: item.attributes.elec_min,
              elec_max: item.attributes.elec_max,
              tipo_residuo: 'Cunícula',
              tipo_entidad: item.attributes.tipo_entidad,

            })
            
          })
        }),   
await axios.get('http://localhost:1337/api/avicolas?pagination[page]='+pagina+'&pagination[pageSize]=1').then((response) => {
  this.page =  response.data.meta.pagination.page ,
  
          response.data.data.forEach((item) => {
            this.entidades.push({

              nombre_entidad: item.attributes.nombre_entidad,
              provincia: item.attributes.provincia,
              municipio: item.attributes.municipio,
              pdprom: item.attributes.pdprom,
              alimentos: item.attributes.alimentos,
              calor: item.attributes.calor,
              elec_min: item.attributes.elec_min,
              elec_max: item.attributes.elec_max,
              tipo_residuo: 'Avícolas',
              tipo_entidad: item.attributes.tipo_entidad,

            })

          })
        }),   
        await axios.get('http://localhost:1337/api/equinos?pagination[page]='+pagina+'&pagination[pageSize]=1').then((response) => {
          this.page =  response.data.meta.pagination.page ,
  
          response.data.data.forEach((item) => {
            this.entidades.push({

              nombre_entidad: item.attributes.nombre_entidad,
              provincia: item.attributes.provincia,
              municipio: item.attributes.municipio,
              pdprom: item.attributes.pdprom,
              alimentos: item.attributes.alimentos,
              calor: item.attributes.calor,
              elec_min: item.attributes.elec_min,
              elec_max: item.attributes.elec_max,
              tipo_residuo: 'Equinos',
              tipo_entidad: item.attributes.tipo_entidad,

            })
          })
        }),
        await axios.get('http://localhost:1337/api/porcinos?pagination[page]='+pagina+'&pagination[pageSize]=1').then((response) => {
          this.page =  response.data.meta.pagination.page ,
  
          response.data.data.forEach((item) => {
            this.entidades.push({

              nombre_entidad: item.attributes.nombre_entidad,
              provincia: item.attributes.provincia,
              municipio: item.attributes.municipio,
              pdprom: item.attributes.pdprom,
              alimentos: item.attributes.alimentos,
              calor: item.attributes.calor,
              elec_min: item.attributes.elec_min,
              elec_max: item.attributes.elec_max,
              tipo_residuo: 'Porcinas',
              tipo_entidad: item.attributes.tipo_entidad,

            })
          })
        }),
        await axios.get('http://localhost:1337/api/ganadomayors?pagination[page]='+pagina+'&pagination[pageSize]=1').then((response) => {
          this.page =  response.data.meta.pagination.page ,
  
          response.data.data.forEach((item) => {
            this.entidades.push({

              nombre_entidad: item.attributes.nombre_entidad,
              provincia: item.attributes.provincia,
              municipio: item.attributes.municipio,
              pdprom: item.attributes.pdprom,
              alimentos: item.attributes.alimentos,
              calor: item.attributes.calor,
              elec_min: item.attributes.elec_min,
              elec_max: item.attributes.elec_max,
              tipo_residuo: 'Ganado Mayor',
              tipo_entidad: item.attributes.tipo_entidad,

            })
          })
        }),
        await axios.get('http://localhost:1337/api/ganadomenors?pagination[page]='+pagina+'&pagination[pageSize]=1').then((response) => {
          this.page =  response.data.meta.pagination.page ,
  
          response.data.data.forEach((item) => {
            this.entidades.push({

              nombre_entidad: item.attributes.nombre_entidad,
              provincia: item.attributes.provincia,
              municipio: item.attributes.municipio,
              pdprom: item.attributes.pdprom,
              alimentos: item.attributes.alimentos,
              calor: item.attributes.calor,
              elec_min: item.attributes.elec_min,
              elec_max: item.attributes.elec_max,
              tipo_residuo: 'Ganado Menor',
              tipo_entidad: item.attributes.tipo_entidad,

            })
          })
        }),  
        await axios.get('http://localhost:1337/api/arroceras?pagination[page]='+pagina+'&pagination[pageSize]=1').then((response) => {
          this.page =  response.data.meta.pagination.page ,
  
          response.data.data.forEach((item) => {
            this.entidades.push({

              nombre_entidad: item.attributes.nombre_entidad,
              provincia: item.attributes.provincia,
              municipio: item.attributes.municipio,
              pdprom: item.attributes.pdprom,
              alimentos: item.attributes.alimentos,
              calor: item.attributes.calor,
              elec_min: item.attributes.elec_min,
              elec_max: item.attributes.elec_max,
              tipo_residuo: 'Arroceras',
              tipo_entidad: item.attributes.tipo_entidad,

            })
          })
        }),
        await axios.get('http://localhost:1337/api/azucareras?pagination[page]='+pagina+'&pagination[pageSize]=1').then((response) => {
          this.page =  response.data.meta.pagination.page ,
          response.data.data.forEach((item) => {
            this.entidades.push({

              nombre_entidad: item.attributes.nombre_entidad,
              provincia: item.attributes.provincia,
              municipio: item.attributes.municipio,
              pdprom: item.attributes.pdprom,
              alimentos: item.attributes.alimentos,
              calor: item.attributes.calor,
              elec_min: item.attributes.elec_min,
              elec_max: item.attributes.elec_max,
              tipo_residuo: 'Azucareras',
              tipo_entidad: item.attributes.tipo_entidad,

            })
          })
        }),     
        await axios.get('http://localhost:1337/api/conservas?pagination[page]='+pagina+'&pagination[pageSize]=1').then((response) => {
          this.page =  response.data.meta.pagination.page ,
          response.data.data.forEach((item) => {
            this.entidades.push({

              nombre_entidad: item.attributes.nombre_entidad,
              provincia: item.attributes.provincia,
              municipio: item.attributes.municipio,
              pdprom: item.attributes.pdprom,
              alimentos: item.attributes.alimentos,
              calor: item.attributes.calor,
              elec_min: item.attributes.elec_min,
              elec_max: item.attributes.elec_max,
              tipo_residuo: 'Conserva',
              tipo_entidad: item.attributes.tipo_entidad,

            })
          })
        }),       
        await axios.get('http://localhost:1337/api/carnicas?pagination[page]='+pagina+'&pagination[pageSize]=1').then((response) => {
          this.page =  response.data.meta.pagination.page ,
          response.data.data.forEach((item) => {
            this.entidades.push({

              nombre_entidad: item.attributes.nombre_entidad,
              provincia: item.attributes.provincia,
              municipio: item.attributes.municipio,
              pdprom: item.attributes.pdprom,
              alimentos: item.attributes.alimentos,
              calor: item.attributes.calor,
              elec_min: item.attributes.elec_min,
              elec_max: item.attributes.elec_max,
              tipo_residuo: 'Carnicas',
              tipo_entidad: item.attributes.tipo_entidad,

            })
          })
        }),       
        await axios.get('http://localhost:1337/api/pescas?pagination[page]='+pagina+'&pagination[pageSize]=1').then((response) => {
          this.page =  response.data.meta.pagination.page ,
          response.data.data.forEach((item) => {
            this.entidades.push({

              nombre_entidad: item.attributes.nombre_entidad,
              provincia: item.attributes.provincia,
              municipio: item.attributes.municipio,
              pdprom: item.attributes.pdprom,
              alimentos: item.attributes.alimentos,
              calor: item.attributes.calor,
              elec_min: item.attributes.elec_min,
              elec_max: item.attributes.elec_max,
              tipo_residuo: 'Pesca',
              tipo_entidad: item.attributes.tipo_entidad,

            })
          })
        }), 
        await axios.get('http://localhost:1337/api/lacteas?pagination[page]='+pagina+'&pagination[pageSize]=1').then((response) => {
          this.page =  response.data.meta.pagination.page ,
          response.data.data.forEach((item) => {
            this.entidades.push({

              nombre_entidad: item.attributes.nombre_entidad,
              provincia: item.attributes.provincia,
              municipio: item.attributes.municipio,
              pdprom: item.attributes.pdprom,
              alimentos: item.attributes.alimentos,
              calor: item.attributes.calor,
              elec_min: item.attributes.elec_min,
              elec_max: item.attributes.elec_max,
              tipo_residuo: 'Lácteas',
              tipo_entidad: item.attributes.tipo_entidad,

            })
          })
        }),       
        await axios.get('http://localhost:1337/api/rsus?pagination[page]='+pagina+'&pagination[pageSize]=1').then((response) => {
          this.page =  response.data.meta.pagination.page ,
          response.data.data.forEach((item) => {
            this.entidades.push({

              nombre_entidad: item.attributes.nombre_entidad,
              provincia: item.attributes.provincia,
              municipio: item.attributes.municipio,
              pdprom: item.attributes.pdprom,
              alimentos: item.attributes.alimentos,
              calor: item.attributes.calor,
              elec_min: item.attributes.elec_min,
              elec_max: item.attributes.elec_max,
              tipo_residuo: 'Residuos Sólidos Urbanos',
              tipo_entidad: item.attributes.tipo_entidad,

            })
          })
        }),       
        await axios.get('http://localhost:1337/api/granos?pagination[page]='+pagina+'&pagination[pageSize]=1').then((response) => {
          this.page =  response.data.meta.pagination.page ,
          response.data.data.forEach((item) => {
            this.entidades.push({

              nombre_entidad: item.attributes.nombre_entidad,
              provincia: item.attributes.provincia,
              municipio: item.attributes.municipio,
              pdprom: item.attributes.pdprom,
              alimentos: item.attributes.alimentos,
              calor: item.attributes.calor,
              elec_min: item.attributes.elec_min,
              elec_max: item.attributes.elec_max,
              tipo_residuo: 'Granos',
              tipo_entidad: item.attributes.tipo_entidad,

            })
          })
        }),       
        await axios.get('http://localhost:1337/api/bebidaslicores?pagination[page]='+pagina+'&pagination[pageSize]=1').then((response) => {
          this.page =  response.data.meta.pagination.page ,
          response.data.data.forEach((item) => {
            this.entidades.push({

              nombre_entidad: item.attributes.nombre_entidad,
              provincia: item.attributes.provincia,
              municipio: item.attributes.municipio,
              pdprom: item.attributes.pdprom,
              alimentos: item.attributes.alimentos,
              calor: item.attributes.calor,
              elec_min: item.attributes.elec_min,
              elec_max: item.attributes.elec_max,
              tipo_residuo: 'Bebidas Licores',
              tipo_entidad: item.attributes.tipo_entidad,

            })
          })
        }),       
        await axios.get('http://localhost:1337/api/cultivosvarios?pagination[page]='+pagina+'&pagination[pageSize]=1').then((response) => {
          this.page =  response.data.meta.pagination.page ,
          response.data.data.forEach((item) => {
            this.entidades.push({

              nombre_entidad: item.attributes.nombre_entidad,
              provincia: item.attributes.provincia,
              municipio: item.attributes.municipio,
              pdprom: item.attributes.pdprom,
              alimentos: item.attributes.alimentos,
              calor: item.attributes.calor,
              elec_min: item.attributes.elec_min,
              elec_max: item.attributes.elec_max,
              tipo_residuo: 'Cultivos Varios',
              tipo_entidad: item.attributes.tipo_entidad,

            })
          })
        }), 
        

        await axios.get('http://localhost:1337/api/provincias').then((response) => {
          
          response.data.data.forEach((item) => {
            this.provincias.push({
              provincia: item.attributes.provincia,
              id: item.id

            })

          })



        })
        .catch((error) => {
          console.error(error)

        })    ,
        this.filtrar()
])

     




    },
    reboot(){
      location.reload()
    },
    async llenarMunicipios() {
      //vaciar arreglo de municipios cada que se elige una provincia nueva
      console.log(this.Completar.provincia);
      this.municipios = [];
      this.filtrar()

      await axios
        .get('http://localhost:1337/api/provincias?populate=*')
        .then((response) => {
          response.data.data.forEach((item) => {
            if (this.Completar.provincia === item.attributes.provincia) {
              item.attributes.municipios.data.forEach((item) => {
                this.municipios.push({
                  municipio: item.attributes.nombre_munic,
                })
              })
            }
          })

        })
        .catch((error) => {
          console.error(error)
        });
       
    },
    verMuni(){
      console.log(this.Completar.municipio);
      this.filtrar()
    },
    filtrar() {
      this.entidadesFiltradas = this.entidades.filter((entidad) => {
        let mantenerEntidad = true;
        mantenerEntidad = (entidad.tipo_residuo === this.tipoResiduoSeleccionado || this.tipoResiduoSeleccionado === '') && mantenerEntidad ? true : false;
        mantenerEntidad = (entidad.tipo_entidad === this.tipoEntidadSeleccionada || this.tipoEntidadSeleccionada === '') && mantenerEntidad ? true : false;
        mantenerEntidad = (entidad.provincia === this.Completar.provincia || this.Completar.provincia === '') && mantenerEntidad ? true : false;
        mantenerEntidad = (entidad.municipio === this.Completar.municipio || this.Completar.municipio === '') && mantenerEntidad ? true : false;
      
        // poner la de tipo de entidad

        return mantenerEntidad;
      })
    }
  },
}


</script>
