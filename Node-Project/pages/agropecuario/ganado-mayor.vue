
<template>
  <v-data-table
    
    :headers="headers"
    :items="ganadomayors"
    :search="search"
    sort-by="calories"
    class="elevation-18 mx-provincias"

    
    
  >
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title><v-icon>mdi-cow</v-icon>Ganado Mayor</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field
          v-model="search"
          class="justify-center"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-dialog v-model="dialog" max-width="500px">
          <template #activator="{ on, attrs }">
            <v-btn
              color="blue lighten-1"
              
              class="mb-2 p-2"
              v-bind="attrs"
              v-on="on"
              
            >
              Añadir entidad
            </v-btn>
            &nbsp;&nbsp;&nbsp;

            <v-menu
          bottom
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
            class="mb-2 p-2"
              v-bind="attrs"
              v-on="on"
              color="blue lighten-1"
              
            >
              Ver Potencial <v-icon append>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, i) in potenciales"
              :key="i"
              :to="item.to"
              @click="() => {}"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
              
            </v-list-item>
          </v-list>
        </v-menu>
          </template>
          <v-card  >
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text >
              <v-form  v-model="form" ref="form">
             
                  <v-row>
                 
                  <v-col >
                    <v-text-field
                    :rules="[rules.required,rules.length(1),rules.nombre_entidad]"
                      v-model="editedItem.nombre_entidad"
                      label="Nombre Entidad"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
      <v-col>
        <v-select :items="provincias" @change="llenarMunicipios()" :rules="[v => !!v || 'Campo requerido']" v-model="Completar.provincia" item-text="provincia"
          label="seleccione una provincia" clearable></v-select>
      </v-col>
      <v-col>
        <v-select :items="municipios" @change="verMuni()" item-text="municipio" :rules="[v => !!v || 'Campo requerido']" v-model="Completar.municipio"
          label="seleccione un municipio" clearable></v-select>
      </v-col>
    </v-row>


      
              <v-row>
              
              
                <v-col>
                  <v-text-field type="number" :rules="[rules.required,rules.cantidades]" v-model="editedItem.numero_terneros"
                    label="Numero Terneros"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field type="number" :rules="[rules.required,rules.cantidades]" v-model="editedItem.numero_novillas"
                    label="Numero Novillas"></v-text-field>
                </v-col>
              
              </v-row>
              <v-row>
              
              
                <v-col>
                  <v-text-field type="number" :rules="[rules.required,rules.cantidades]" v-model="editedItem.numero_vacas"
                    label="Numero Vacas"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field type="number" :rules="[rules.required,rules.cantidades]" v-model="editedItem.numero_toretes"
                    label="Numero Toretes"></v-text-field>
                </v-col>
              
              </v-row>
              <v-row>
              
              
                <v-col>
                  <v-text-field type="number" :rules="[rules.required,rules.cantidades]" v-model="editedItem.numero_toros"
                    label="Numero Toros"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field type="number" :rules="[rules.required,rules.cantidades]" v-model="editedItem.numero_potros"
                    label="Numero Potros"></v-text-field>
                </v-col>
              
              </v-row>
              <v-row>
              
              
                <v-col>
                  <v-text-field type="number" :rules="[rules.required,rules.cantidades]" v-model="editedItem.numero_caballos"
                    label="Numero Caballos"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field type="number" :rules="[rules.required,rules.cantidades]" v-model="editedItem.numero_anojas"
                    label="Numero Añojas"></v-text-field>
                </v-col>
              
              </v-row>
                
                  
                 
                    <v-row>
                      <v-col >
                    <v-text-field
                    type="number"
                    :rules="[rules.required, rules.latitud]"
                      v-model="editedItem.latitud"
                      label="latitud"
                    ></v-text-field>
                  </v-col>
                  <v-col >
                    <v-text-field
                    type="number"
                    :rules="[rules.longitud]"
                      v-model="editedItem.longitud"
                      label="longitud"
                    ></v-text-field>
                  </v-col>
                    </v-row>
                
    
                         <h2>Calculando potencial...</h2>
                         <h3> Potencial min:{{PotencialMin}}</h3>           
                         <h3>Potencial max:{{PotencialMax}}</h3>           
                         <h3>Potencial promedio:{{PotencialProm}}</h3>           
                         <h3>Alimentos:{{coccionAlimentos}}</h3>           
                         <h3>Calor:{{equiposDeCalor}}</h3>           
                         <h3>Elec Min:{{electricidadMin}}</h3>           
                         <h3>Elec Max:{{electricidadMax}}</h3>           
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue lighten-1"  @click="close"> Cancel </v-btn>
              <v-btn color="blue lighten-1"  @click="agregar" :disabled="!form"
                :loading="isLoading"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5" color="blue lighten-1"
              >Seguro que desea eliminar la entidad?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue lighten-1"  @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue lighten-1"  @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <!-- eslint-disable-next-line vue/valid-v-slot -->
    <template #item.actions="{ item }" >
    
<v-btn color="warning" x-small  @click="editItem(item)"><v-icon small  color="white"> mdi-pencil </v-icon></v-btn>
<v-btn color="error" x-small @click="deleteItem(item)" ><v-icon small  color="white"> mdi-delete </v-icon></v-btn>

</template>
    <template #no-data>
      <v-btn color="blue lighten-1" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>




const axios = require('axios')


export default {
  beforeRouteEnter:(to,from,next)=>{
   
    let isAuth = sessionStorage.getItem("username");
    let role = sessionStorage.getItem("rol");    
    return isAuth && role==='Especialista' ? next() : next("/login")  
  },
  
  data(){
    return {

      search: '',
    dialog: false,
    form: false,
    Completar: {
        provincia: '',
        municipio: '',
      },
      provincias: [],
      municipios: [],

    isLoading: false,
    dialogDelete: false,
    
    datos:{
      pdmin: '',
    pdmax: '',
    pdprom: '',
    alimentos: '',
    calor: '',
    elec_min: '',
    elec_max: '',


    },
    rules: {
        
        
        cantidades: v=> v>0 || 'El campo debe existir y ser no negativo',
        latitud: v=>  v<90 && v != '' ||'La latitud debe existir, ser menor que 90 y no debe contener letras',
        longitud: v=>  v<0 && v != '' && v > -180 ||'La latitud debe existir y ser negativa, y menor que 180', nombre_entidad: v=> !! v.trim() || 'Campo requerido',
        required:v=> v!= null || 'Por favor, llene este campo',
        length: (len) => (v) =>
        (v || "").length >= 1 || `Cantidad inválida de caracteres, requiere al menos ${len}`,
      },
    headers: [
     /*  {
        text: 'id',
        align: 'start',
        value: 'id',
      }, */
      { text: 'Nombre Entidad', value: 'nombre_entidad' },
     
      { text: 'Numero terneros', value: 'numero_terneros' },
      { text: 'Numero novillas', value: 'numero_novillas' },
      { text: 'Numero vacas', value: 'numero_vacas' },
      { text: 'Numero toretes', value: 'numero_toretes' },
      { text: 'Numero toros', value: 'numero_toros' },
      { text: 'Numero potros', value: 'numero_potros' },
      { text: 'Numero caballos', value: 'numero_caballos' },
      { text: 'Numero añojas', value: 'numero_anojas' },
   
      { text: 'Provincia', value: 'provincia' },
      { text: 'Municipio', value: 'municipio' },
   
      
     
      { text: 'Latitud', value: 'latitud' },
      { text: 'Longitud', value: 'longitud' },
      { text: 'Acciones_del_usuario', value: 'actions', sortable: false },
    ],
    ganadomayors: [],
   
   
    potenciales: [
            {
              title: 'Disponible',
              to: '/Agropecuario/potencial/potencial_ganado_mayor'
            },
            {
              title: 'Implementable',
              to: '/Agropecuario/uso_final/uso_final_ganado_mayor'
            },
            
          ],
          
    editedIndex: -1,
    editedItem: {
      id: 0,
      nombre_entidad: '',
              numero_novillas: 0,
              numero_vacas: 0,
              numero_terneros: 0,
              numero_toretes: 0,
              numero_toros: 0,
              numero_potros: 0,
              numero_caballos: 0,
              numero_anojas: 0,
              provincia: '',
              municipio: '',
              latitud: 0,
              longitud: 0,
          

              
              
    },
   
    defaultItem: {
      id: '',
      nombre_entidad: '',
              numero_novillas: '',
              numero_sementales: '',
              numero_terneros: '',
              numero_toretes: '',
              numero_toros: '',
              numero_potros: '',
              numero_caballos: '',
              numero_anojas: '',
             
              provincia: '',
              municipio: '',
              latitud: '',
              longitud: '',
           
    },
 
    }
  },


  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nueva Entidad' : 'Editar Entidad'
    },
    PotencialMin() {//no lo calcula hasta que no estén los tres escritos en el editedItem
      const factorExcretaPesoVivoGanadoMayor = 0.05;
      const factorBetaAprovechableGanadoMayor = 0.5;
      const potTeoricoMinGanadoMayor = 25;
      const pesoPromTerneros = (30+70)/2;
      const pesoPromAnnojas = 160;
      const pesoPromNovillas = (300+340)/2;
      const pesoPromVacas = 380;
      const pesoPromTorete = 300;
      const pesoPromToros = 380;
      const pesoPromPotros = 250;
      const pesoPromCaballos = 240;

      const potDispMinTerneros = ((factorExcretaPesoVivoGanadoMayor * pesoPromTerneros * parseFloat(this.editedItem.numero_terneros) * factorBetaAprovechableGanadoMayor / 1000) * potTeoricoMinGanadoMayor)
      const potDispMinAnnojas = ((factorExcretaPesoVivoGanadoMayor * pesoPromAnnojas * parseFloat(this.editedItem.numero_anojas) * factorBetaAprovechableGanadoMayor / 1000) * potTeoricoMinGanadoMayor)
      const potDispMinNovillas = ((factorExcretaPesoVivoGanadoMayor * pesoPromNovillas * parseFloat(this.editedItem.numero_novillas) * factorBetaAprovechableGanadoMayor / 1000) * potTeoricoMinGanadoMayor)
      const potDispMinVacas = ((factorExcretaPesoVivoGanadoMayor * pesoPromVacas * parseFloat(this.editedItem.numero_vacas) * factorBetaAprovechableGanadoMayor / 1000) * potTeoricoMinGanadoMayor)
      const potDispMinToretes = ((factorExcretaPesoVivoGanadoMayor * pesoPromTorete * parseFloat(this.editedItem.numero_toretes) * factorBetaAprovechableGanadoMayor / 1000) * potTeoricoMinGanadoMayor)
      const potDispMinToros = ((factorExcretaPesoVivoGanadoMayor * pesoPromToros * parseFloat(this.editedItem.numero_toros) * factorBetaAprovechableGanadoMayor / 1000) * potTeoricoMinGanadoMayor)
      const potDispMinPotros = ((factorExcretaPesoVivoGanadoMayor * pesoPromPotros * parseFloat(this.editedItem.numero_potros) * factorBetaAprovechableGanadoMayor / 1000) * potTeoricoMinGanadoMayor)
      const potDispMinCaballos = ((factorExcretaPesoVivoGanadoMayor * pesoPromCaballos * parseFloat(this.editedItem.numero_caballos) * factorBetaAprovechableGanadoMayor / 1000) * potTeoricoMinGanadoMayor)


      var pdmin = potDispMinTerneros + potDispMinAnnojas + potDispMinNovillas + potDispMinVacas + potDispMinToretes + potDispMinToros + potDispMinPotros + potDispMinCaballos

      return this.datos.pdmin = pdmin


    },
    PotencialMax() {//no lo calcula hasta que no estén los tres escritos en el editedItem
      const factorExcretaPesoVivoGanadoMayor = 0.05;
      const factorBetaAprovechableGanadoMayor = 0.5;
      const potTeoricoMaxGanadoMayor =  35;
      const pesoPromTerneros = (30+70)/2;
      const pesoPromAnnojas = 160;
      const pesoPromNovillas = (300+340)/2;
      const pesoPromVacas = 380;
      const pesoPromTorete = 300;
      const pesoPromToros = 380;
      const pesoPromPotros = 250;
      const pesoPromCaballos = 240;

      const potDispMaxTerneros = ((factorExcretaPesoVivoGanadoMayor * pesoPromTerneros * parseFloat(this.editedItem.numero_terneros) * factorBetaAprovechableGanadoMayor / 1000) * potTeoricoMaxGanadoMayor)
      const potDispMaxAnnojas = ((factorExcretaPesoVivoGanadoMayor * pesoPromAnnojas * parseFloat(this.editedItem.numero_anojas) * factorBetaAprovechableGanadoMayor / 1000) * potTeoricoMaxGanadoMayor)
      const potDispMaxNovillas = ((factorExcretaPesoVivoGanadoMayor * pesoPromNovillas * parseFloat(this.editedItem.numero_novillas) * factorBetaAprovechableGanadoMayor / 1000) * potTeoricoMaxGanadoMayor)
      const potDispMaxVacas = ((factorExcretaPesoVivoGanadoMayor * pesoPromVacas * parseFloat(this.editedItem.numero_vacas) * factorBetaAprovechableGanadoMayor / 1000) * potTeoricoMaxGanadoMayor)
      const potDispMaxToretes = ((factorExcretaPesoVivoGanadoMayor * pesoPromTorete * parseFloat(this.editedItem.numero_toretes) * factorBetaAprovechableGanadoMayor / 1000) * potTeoricoMaxGanadoMayor)
      const potDispMaxToros = ((factorExcretaPesoVivoGanadoMayor * pesoPromToros * parseFloat(this.editedItem.numero_toros) * factorBetaAprovechableGanadoMayor / 1000) * potTeoricoMaxGanadoMayor)
      const potDispMaxPotros = ((factorExcretaPesoVivoGanadoMayor * pesoPromPotros * parseFloat(this.editedItem.numero_potros) * factorBetaAprovechableGanadoMayor / 1000) * potTeoricoMaxGanadoMayor)
      const potDispMaxCaballos = ((factorExcretaPesoVivoGanadoMayor * pesoPromCaballos * parseFloat(this.editedItem.numero_caballos) * factorBetaAprovechableGanadoMayor / 1000) * potTeoricoMaxGanadoMayor)


      var pdmax = potDispMaxTerneros + potDispMaxAnnojas + potDispMaxNovillas + potDispMaxVacas + potDispMaxToretes + potDispMaxToros + potDispMaxPotros + potDispMaxCaballos

      return this.datos.pdmax = pdmax
    },
    PotencialProm() {//no lo calcula hasta que no estén los tres escritos en el editedItem
      var pdprom = (this.PotencialMax + this.PotencialMin) / 2
      return this.datos.pdprom = pdprom

    },

    coccionAlimentos() {
      var alimentos = this.PotencialProm / 0.33
      return this.datos.alimentos = alimentos
    },
    equiposDeCalor() {
      var calor = this.PotencialProm * (41.21 / 0.2)
      return this.datos.calor = calor
    },
    electricidadMin() {
      var elec_min = this.PotencialMin / 330 / 1.8
      return this.datos.elec_min = elec_min
    },
    electricidadMax() {
      var elec_max = this.PotencialMax / 330 / 1.8
      return this.datos.elec_max = elec_max
    },

     
   
},
    
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
    
  created() {
    this.initialize()
  },

  methods: {

    async initialize() {
      // eslint-disable-next-line no-unused-vars
      await axios
        .get('http://localhost:1337/api/provincias')
        .then((response) => {
          response.data.data.forEach((item) => {
            this.provincias.push({
              provincia: item.attributes.provincia,
              id: item.id

            })

          })
 })
        .catch((error) => {
          console.error(error)

        })
      await axios.get('http://localhost:1337/api/ganadomayors/').then((response) => {
          response.data.data.forEach((item) => {
            this.ganadomayors.push({

              id: item.id,
              nombre_entidad: item.attributes.nombre_entidad,
              numero_terneros: item.attributes.numero_terneros,
              numero_novillas: item.attributes.numero_novillas,
              
              numero_toretes: item.attributes.numero_toretes,
              numero_toros: item.attributes.numero_toros,
              numero_potros: item.attributes.numero_potros,
              numero_caballos: item.attributes.numero_caballos,
              numero_anojas: item.attributes.numero_anojas,
              numero_vacas: item.attributes.numero_vacas,
              provincia: item.attributes.provincia,
              municipio: item.attributes.municipio,

              latitud: item.attributes.latitud,
              longitud: item.attributes.longitud,
            })
          })
        })
        .catch((error) => {
          console.error(error)
        })

    },
    
    makeRequest(value) {
        console.log(
          `input:`,
          value
        );
      },
 verMuni(){
console.log(this.Completar.municipio);
 },
    editItem(item) {
      this.editedIndex = this.ganadomayors.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.ganadomayors.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      /* this.ganadomayors.splice(this.editedIndex, 1)
      this.closeDelete() */
      var id =this.editedItem.id
                axios.delete('http://localhost:1337/api/ganadomayors/'+id+'/')
                .then(response=>{
                  console.log(response);
                })
                this.closeDelete()
                location.reload()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    agregar(){ 
     
      if(this.editedIndex>-1){ 
        var data = JSON.stringify({
  "data": {  
   
   
    "nombre_entidad": this.editedItem.nombre_entidad,
            "numero_terneros": this.editedItem.numero_terneros,
            "numero_novillas": this.editedItem.numero_novillas,
            "numero_vacas": this.editedItem.numero_vacas,
            "numero_toretes": this.editedItem.numero_toretes,
            "numero_toros": this.editedItem.numero_toros,
            "numero_potros": this.editedItem.numero_potros,
            "numero_caballos": this.editedItem.numero_caballos,
            "numero_anojas": this.editedItem.numero_anojas,
            "numero_vacas": this.editedItem.numero_vacas,
            "provincia": this.Completar.provincia,
            "municipio": this.Completar.municipio,

            "latitud": this.editedItem.latitud,
            "longitud": this.editedItem.longitud,
            "pdmin": this.datos.pdmin,
            "pdmax": this.datos.pdmax,
            "pdprom": this.datos.pdprom,
            "alimentos": this.datos.alimentos,
            "calor": this.datos.calor,
            "elec_min": this.datos.elec_min,
            "elec_max": this.datos.elec_max,
            "tipo_entidad": "Agropecuaria"
  }
});
var id=this.editedItem.id
var config = {
  method: 'put',
  url: 'http://localhost:1337/api/ganadomayors/'+id+'/',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  
})
.catch(function (error) {
  console.log(error);
});
  }else{ var data = JSON.stringify({
  "data": {  
   
   
    
    "nombre_entidad": this.editedItem.nombre_entidad,
            "numero_terneros": this.editedItem.numero_terneros,
            "numero_novillas": this.editedItem.numero_novillas,
            "numero_vacas": this.editedItem.numero_vacas,
            "numero_toretes": this.editedItem.numero_toretes,
            "numero_toros": this.editedItem.numero_toros,
            "numero_potros": this.editedItem.numero_potros,
            "numero_caballos": this.editedItem.numero_caballos,
            "numero_anojas": this.editedItem.numero_anojas,
            "numero_vacas": this.editedItem.numero_vacas,
            "provincia": this.Completar.provincia,
            "municipio": this.Completar.municipio,

            "latitud": this.editedItem.latitud,
            "longitud": this.editedItem.longitud,
            "pdmin": this.datos.pdmin,
            "pdmax": this.datos.pdmax,
            "pdprom": this.datos.pdprom,
            "alimentos": this.datos.alimentos,
            "calor": this.datos.calor,
            "elec_min": this.datos.elec_min,
            "elec_max": this.datos.elec_max,
            "tipo_entidad": "Agropecuaria"
  }
});

var config = {
  method: 'post',
  url: 'http://localhost:1337/api/ganadomayors',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  
})
.catch(function (error) {
  console.log(error);
});
  }
 

  
  
  this.close();
  
  location.reload()

},

async llenarMunicipios() {
      //vaciar arreglo de municipios cada que se elige una provincia nueva
      console.log(this.Completar.provincia);

      this.municipios = [];

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
        })
      

    }
  }
}


</script>
