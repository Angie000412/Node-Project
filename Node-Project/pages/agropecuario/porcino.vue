
<template>
  <v-data-table
    
    :headers="headers"
    :items="porcinos"
    :search="search"
    sort-by="calories"
    class="elevation-18 mx-provincias"

    
    
  >
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title><v-icon>mdi-pig</v-icon>Porcinos</v-toolbar-title>
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
                  <v-text-field
                  type="number"
                  :rules="[rules.required,rules.cantidades]"
                  v-model="editedItem.numero_reproductoras"
                  label="Numero Reproductoras"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                  type="number"
                  :rules="[rules.required,rules.cantidades]"
                  v-model="editedItem.numero_sementales"
                  label="Numero Sementales"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                  type="number"
                  :rules="[rules.required,rules.cantidades]"
                  v-model="editedItem.numero_cochinatas"
                  label="Numero Cochinatas"
                  ></v-text-field>
                </v-col>
               </v-row>
              <v-row> 
                
               
                <v-col>
                  <v-text-field
                  type="number"
                  :rules="[rules.required,rules.cantidades]"
                  v-model="editedItem.numero_crias"
                  label="Numero Crias"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                  type="number"
                  :rules="[rules.required,rules.cantidades]"
                  v-model="editedItem.numero_cebas"
                  label="Numero Cebas"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                  type="number"
                  :rules="[rules.required,rules.cantidades]"
                  v-model="editedItem.numero_cochinatos"
                  label="Numero Cochinatos"
                  ></v-text-field>
                </v-col>
               </v-row>
              <v-row> 
                
               
                <v-col>
                  <v-text-field
                  type="number"
                  :rules="[rules.required,rules.cantidades]"
                  v-model="editedItem.numero_lechones"
                  label="Numero lechones"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                  type="number"
                  :rules="[rules.required,rules.cantidades]"
                  v-model="editedItem.numero_precebas"
                  label="Numero Precebas"
                  ></v-text-field>
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
        longitud: v=>  v<0 && v != '' && v > -180 ||'La latitud debe existir y ser negativa, y menor que 180',
       
        nombre_entidad: v=> !! v.trim() || 'Campo requerido',
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
      { text: 'Provincia', value: 'provincia' },
      { text: 'Municipio', value: 'municipio' },
      { text: 'Nombre Entidad', value: 'nombre_entidad' },
     
      { text: 'Numero Reproductoras ', value: 'numero_reproductoras' },
      { text: 'Numero  Cochinatos', value: 'numero_cochinatos' },
      { text: 'Numero Cochinatas ', value: 'numero_cochinatas' },
      { text: 'Numero Sementales', value: 'numero_sementales' },
      { text: 'Numero Crias', value: 'numero_crias' },
      { text: 'Numero Cebas', value: 'numero_cebas' },
      { text: 'Numero Lechones', value: 'numero_lechones' },
      { text: 'Numero Precebas', value: 'numero_precebas' },
   
   
      
     
      { text: 'Latitud', value: 'latitud' },
      { text: 'Longitud', value: 'longitud' },
      { text: 'Acciones_del_usuario', value: 'actions', sortable: false },
    ],
    porcinos: [],
   
   
    potenciales: [
            {
              title: 'Disponible',
              to: '/Agropecuario/potencial/potencial_porcino'
            },
            {
              title: 'Implementable',
              to: '/Agropecuario/uso_final/uso_final_porcino'
            },
            
          ],
          
    editedIndex: -1,
    editedItem: {
      id: 0,
      nombre_entidad: '',
      numero_reproductoras: 0,
numero_cochinatos: 0,
numero_cochinatas: 0,
numero_sementales: 0,
numero_crias: 0,
numero_cebas: 0,
numero_lechones: 0,
numero_precebas: 0,
              provincia: '',
              municipio: '',
              latitud: 0,
              longitud: 0,
          

              
              
    },
   
    defaultItem: {
      id: '',
      nombre_entidad: '',
              numero_reproductoras: '',
              numero_sementales: '',
              cant_cabezas: '',
             
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
      // poner el resto de las cosas que son conchinatas y .......
      // mover para const de ent
      const factorExcretaPesoVivoPorcino = 0.05;
      const factorBetaAprovechablePorcino = 1;
      const potTeoricoMinPorcino = 33;
      const pesoPromRep = (105+200)/2;
      const pesoPromSem = (115+332)/2;
      const pesoPromCrias = 5;  //peso equivalente promedio de crias en word de leyanet
      const pesoPromCochinatos = 120;
      const pesoPromCochinatas = (110+240)/2;
      const pesoPromCebas = (27+97)/2;
      const pesoPromPrecebas = (8+26.4)/2;
      const pesoPromLechones = 30;

//se divide entre mil para convertir de m3 a toneladas
      const potDispMinRep = ( ((factorExcretaPesoVivoPorcino * pesoPromRep *  parseFloat(this.editedItem.numero_reproductoras))* factorBetaAprovechablePorcino / 1000) * potTeoricoMinPorcino)
      const potDispMinSem = ( ((factorExcretaPesoVivoPorcino * pesoPromSem *  parseFloat(this.editedItem.numero_sementales))* factorBetaAprovechablePorcino / 1000) * potTeoricoMinPorcino)
      const potDispMinCrias = ( ((factorExcretaPesoVivoPorcino * pesoPromCrias *  parseFloat(this.editedItem.numero_crias))* factorBetaAprovechablePorcino / 1000) * potTeoricoMinPorcino)
      const potDispMinCochinatos = ( ((factorExcretaPesoVivoPorcino * pesoPromCochinatos *  parseFloat(this.editedItem.numero_cochinatos))* factorBetaAprovechablePorcino / 1000) * potTeoricoMinPorcino)
      const potDispMinCochinatas = ( ((factorExcretaPesoVivoPorcino * pesoPromCochinatas *  parseFloat(this.editedItem.numero_cochinatas))* factorBetaAprovechablePorcino / 1000) * potTeoricoMinPorcino)
      const potDispMinCebas = ( ((factorExcretaPesoVivoPorcino * pesoPromCebas *  parseFloat(this.editedItem.numero_cebas))* factorBetaAprovechablePorcino / 1000) * potTeoricoMinPorcino)
      const potDispMinPrecebas = ( ((factorExcretaPesoVivoPorcino * pesoPromPrecebas *  parseFloat(this.editedItem.numero_precebas))* factorBetaAprovechablePorcino / 1000) * potTeoricoMinPorcino)
      const potDispMinLechones = ( ((factorExcretaPesoVivoPorcino * pesoPromLechones *  parseFloat(this.editedItem.numero_lechones))* factorBetaAprovechablePorcino / 1000) * potTeoricoMinPorcino)
    
    
    
      const pdmin = potDispMinRep + potDispMinSem + potDispMinCrias + potDispMinCochinatos + potDispMinCochinatas + potDispMinCebas + potDispMinLechones + potDispMinPrecebas;

      return this.datos.pdmin = pdmin

    },
    PotencialMax() {//no lo calcula hasta que no estén los tres escritos en el editedItem
      // mover para const de ent
      /* const factorExcretaPesoVivoPorcino = 0.05;
      const factorBetaAprovechablePorcino = 1;
      const potTeoricoMaxPorcino = 40;
      const pesoPromRep = (105+200)/2;
      const pesoPromSem = (115+332)/2;
      const pesoPromCrias = 3.5;
      
      const potDispMaxRep = ((factorExcretaPesoVivoPorcino * pesoPromRep * factorBetaAprovechablePorcino * parseFloat(this.editedItem.numero_reproductoras)/ 1000) * potTeoricoMaxPorcino)
      const potDispMaxSem = ((factorExcretaPesoVivoPorcino * pesoPromSem * factorBetaAprovechablePorcino * parseFloat(this.editedItem.numero_sementales) / 1000) * potTeoricoMaxPorcino)
      const potDispMaxCrias = ((factorExcretaPesoVivoPorcino * pesoPromCrias * factorBetaAprovechablePorcino * parseFloat(this.editedItem.numero_crias)/ 1000) * potTeoricoMaxPorcino)
      const pdmax = potDispMaxRep + potDispMaxSem + potDispMaxCrias;

      return this.datos.pdmax = pdmax */
      const factorExcretaPesoVivoPorcino = 0.05;
      const factorBetaAprovechablePorcino = 1;
      const potTeoricoMaxPorcino = 40;
      const pesoPromRep = (105+200)/2;
      const pesoPromSem = (115+332)/2;
      const pesoPromCrias = 5;  //peso equivalente promedio de crias en word de leyanet
      const pesoPromCochinatos = 120;
      const pesoPromCochinatas = (110+240)/2;
      const pesoPromCebas = (27+97)/2;
      const pesoPromPrecebas = (8+26.4)/2;
      const pesoPromLechones = 30;

//se divide entre mil para convertir de m3 a toneladas
      const potDispMinRep = ( ((factorExcretaPesoVivoPorcino * pesoPromRep *  parseFloat(this.editedItem.numero_reproductoras))* factorBetaAprovechablePorcino / 1000) * potTeoricoMaxPorcino)
      const potDispMinSem = ( ((factorExcretaPesoVivoPorcino * pesoPromSem *  parseFloat(this.editedItem.numero_sementales))* factorBetaAprovechablePorcino / 1000) * potTeoricoMaxPorcino)
      const potDispMinCrias = ( ((factorExcretaPesoVivoPorcino * pesoPromCrias *  parseFloat(this.editedItem.numero_crias))* factorBetaAprovechablePorcino / 1000) * potTeoricoMaxPorcino)
      const potDispMinCochinatos = ( ((factorExcretaPesoVivoPorcino * pesoPromCochinatos *  parseFloat(this.editedItem.numero_cochinatos))* factorBetaAprovechablePorcino / 1000) * potTeoricoMaxPorcino)
      const potDispMinCochinatas = ( ((factorExcretaPesoVivoPorcino * pesoPromCochinatas *  parseFloat(this.editedItem.numero_cochinatas))* factorBetaAprovechablePorcino / 1000) * potTeoricoMaxPorcino)
      const potDispMinCebas = ( ((factorExcretaPesoVivoPorcino * pesoPromCebas *  parseFloat(this.editedItem.numero_cebas))* factorBetaAprovechablePorcino / 1000) * potTeoricoMaxPorcino)
      const potDispMinPrecebas = ( ((factorExcretaPesoVivoPorcino * pesoPromPrecebas *  parseFloat(this.editedItem.numero_precebas))* factorBetaAprovechablePorcino / 1000) * potTeoricoMaxPorcino)
      const potDispMinLechones = ( ((factorExcretaPesoVivoPorcino * pesoPromLechones *  parseFloat(this.editedItem.numero_lechones))* factorBetaAprovechablePorcino / 1000) * potTeoricoMaxPorcino)
    
    
    
      const pdmax = potDispMinRep + potDispMinSem + potDispMinCrias + potDispMinCochinatos + potDispMinCochinatas + potDispMinCebas + potDispMinLechones + potDispMinPrecebas;

      return this.datos.pdmax = pdmax

    },
    PotencialProm() {//no lo calcula hasta que no estén los tres escritos en el editedItem
      const pdprom = (this.PotencialMax + this.PotencialMin) / 2
      return this.datos.pdprom = pdprom

    },

    coccionAlimentos() {
      const alimentos = this.PotencialProm / 0.33
      return this.datos.alimentos = alimentos
    },
    equiposDeCalor() {
      const calor = this.PotencialProm * (41.21 / 0.2)
      return this.datos.calor = calor
    },
    electricidadMin() {
      const elec_min = this.PotencialMin / 330 / 1.8
      return this.datos.elec_min = elec_min
    },
    electricidadMax() {
      const elec_max = this.PotencialMax / 330 / 1.8
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
      await axios.get('http://localhost:1337/api/porcinos/').then((response) => {
          response.data.data.forEach((item) => {
            this.porcinos.push({

              id: item.id,
              nombre_entidad: item.attributes.nombre_entidad,
              numero_reproductoras: item.attributes.numero_reproductoras,
              numero_sementales: item.attributes.numero_sementales,
              numero_crias: item.attributes.numero_crias,
              numero_cochinatos: item.attributes.numero_cochinatos,
              numero_cochinatas: item.attributes.numero_cochinatas,
              numero_cebas: item.attributes.numero_cebas,
              numero_precebas: item.attributes.numero_precebas,
              numero_lechones: item.attributes.numero_lechones,
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
      this.editedIndex = this.porcinos.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.porcinos.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      /* this.porcinos.splice(this.editedIndex, 1)
      this.closeDelete() */
      var id =this.editedItem.id
                axios.delete('http://localhost:1337/api/porcinos/'+id+'/')
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
   
   
    "numero_reproductoras": this.editedItem.numero_reproductoras,
    "numero_sementales": this.editedItem.numero_sementales,
    "numero_crias": this.editedItem.numero_crias,
    "numero_cochinatos": this.editedItem.numero_cochinatos,
    "numero_cochinatas": this.editedItem.numero_cochinatas,
    "numero_lechones": this.editedItem.numero_lechones,
    "numero_cebas": this.editedItem.numero_cebas,
    "numero_precebas": this.editedItem.numero_precebas,
    
    
    "latitud":this.editedItem.latitud,
    "longitud": this.editedItem.longitud,
    "nombre_entidad": this.editedItem.nombre_entidad,
    "provincia": this.Completar.provincia,
    "municipio": this.Completar.municipio,
    "pdmin": this.datos.pdmin,
    "pdmax": this.datos.pdmax,
    "pdprom":this.datos.pdprom,
    "alimentos":this.datos.alimentos,
    "calor":this.datos.calor,
    "elec_min":this.datos.elec_min,
    "elec_max":this.datos.elec_max,
    "tipo_entidad": "Agropecuaria"
  }
});
var id=this.editedItem.id
var config = {
  method: 'put',
  url: 'http://localhost:1337/api/porcinos/'+id+'/',
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
   
   
    
    "numero_reproductoras": this.editedItem.numero_reproductoras,
    "numero_sementales": this.editedItem.numero_sementales,
    "numero_crias": this.editedItem.numero_crias,
    "numero_cochinatos": this.editedItem.numero_cochinatos,
    "numero_cochinatas": this.editedItem.numero_cochinatas,
    "numero_lechones": this.editedItem.numero_lechones,
    "numero_cebas": this.editedItem.numero_cebas,
    "numero_precebas": this.editedItem.numero_precebas,
    
    
    "latitud":this.editedItem.latitud,
    "longitud": this.editedItem.longitud,
    "nombre_entidad": this.editedItem.nombre_entidad,
    "provincia": this.Completar.provincia,
    "municipio": this.Completar.municipio,
    "pdmin": this.datos.pdmin,
    "pdmax": this.datos.pdmax,
    "pdprom":this.datos.pdprom,
    "alimentos":this.datos.alimentos,
    "calor":this.datos.calor,
    "elec_min":this.datos.elec_min,
    "elec_max":this.datos.elec_max,
    "tipo_entidad": "Agropecuaria"
  }
});

var config = {
  method: 'post',
  url: 'http://localhost:1337/api/porcinos',
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
