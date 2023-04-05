
<template>
  <v-data-table
    
    :headers="headers"
    :items="avicolas"
    :search="search"
    sort-by="calories"
    class="elevation-18 mx-auto"

    
    
  >
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title><v-icon>mdi-bird</v-icon>Avicolas</v-toolbar-title>
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
                
                <v-col >
                  <v-text-field
                  type="number"
                  :rules="[rules.required,rules.cantidades]"
                  v-model="editedItem.numero_gallinas_ponedoras"
                  label="Gallinas Ponedoras"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                  type="number"
                  :rules="[rules.required,rules.cantidades]"
                  v-model="editedItem.numero_gallinas_reemplazo"
                  label="Gallinas de Reemplazo"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                  type="number"
                  :rules="[rules.required,rules.cantidades]"
                  v-model="editedItem.numero_pollos"
                  label="Numero Pollos"
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
              <v-btn color="blue lighten-1" @click="close"> Cancel </v-btn>
              <v-btn color="blue lighten-1" @click="agregar" :disabled="!form"
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
    isLoading: false,
    dialogDelete: false,
    
    autoCompleteInput: {},
    Completar: {
        provincia: '',
        municipio: '',
      },
      provincias: [],
      municipios: [],


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
      { text: 'Nombre Entidad', value: 'nombre_entidad' },
      { text: 'Numero Gallinas Ponedoras', value: 'numero_gallinas_ponedoras' },
      { text: 'Numero Gallinas Reemplazo ', value: 'numero_gallinas_reemplazo' },
      { text: 'Numero Pollos', value: 'numero_pollos' },
   
      { text: 'Provincia', value: 'provincia' },
      { text: 'Municipio', value: 'municipio' },
   
      
     
      { text: 'Latitud', value: 'latitud' },
      { text: 'Longitud', value: 'longitud' },
      { text: 'Acciones_del_usuario', value: 'actions', sortable: false },
    ],
    avicolas: [],
    auto:[],
   
    potenciales: [
            {
              title: 'Disponible',
              to: '/Agropecuario/potencial/potencial_avicolas'
            },
            {
              title: 'Implementable',
              to: '/Agropecuario/uso_final/uso_final_avicolas'
            },
            
          ],
          
    editedIndex: -1,
    editedItem: {
      id: 0,
      nombre_entidad: '',
              numero_gallinas_ponedoras: 0,
              numero_gallinas_reemplazo: 0,
              numero_pollos: 0,
              provincia: '',
              municipio: '',
              latitud: 0,
              longitud: 0,
          

              
              
    },
   
    defaultItem: {
      id: '',
      nombre_entidad: '',
              numero_gallinas_ponedoras: '',
              numero_gallinas_reemplazo: '',
              numero_pollos: '',
             
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
    PotencialMin(){//no lo calcula hasta que no estén los tres escritos en el editedItem
            var pdmin=(7.63* parseFloat(this.editedItem.numero_gallinas_ponedoras) *1 / 1000 * 33) +
             (11.18* parseFloat (this.editedItem.numero_gallinas_reemplazo) *1 / 1000 * 33) ;
             
             return this.datos.pdmin=pdmin
             
         
            },
    PotencialMax(){//no lo calcula hasta que no estén los tres escritos en el editedItem
            var pdmax=(7.63* parseFloat(this.editedItem.numero_gallinas_ponedoras) *1 / 1000 * 40) +
             (11.18* parseFloat (this.editedItem.numero_gallinas_reemplazo) *1 / 1000 * 40) 
             return this.datos.pdmax=pdmax
          
            },
    PotencialProm(){//no lo calcula hasta que no estén los tres escritos en el editedItem
            var pdprom= (this.PotencialMax+this.PotencialMin)/2  
            return this.datos.pdprom=pdprom
          
          },

            coccionAlimentos(){
        var alimentos= this.PotencialProm/0.33
        return this.datos.alimentos=alimentos
      },
            equiposDeCalor(){
            var calor= this.PotencialProm * (41.21/0.2)
            return this.datos.calor=calor
          },
electricidadMin(){
            var elec_min=this.PotencialMin/330/1.8
            return this.datos.elec_min=elec_min
          },
electricidadMax(){
            var elec_max= this.PotencialMax/330/1.8
            return this.datos.elec_max=elec_max
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
    async llenarMunicipios() {
      //vaciar arreglo de municipios cada que se elige una provincia nueva
      console.log(this.Completar.provincia);

      this.municipios = [];

      await axios
        .get('http://localhost:1337/api/provincias?populate=*')//para que salga la provincia con las relaciones a los mun
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
    },
    async initialize() {
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
      // eslint-disable-next-line no-unused-vars
      await axios
        .get('http://localhost:1337/api/avicolas/')
        .then((response) => {
          response.data.data.forEach((item) => {
            this.avicolas.push({

              id: item.id,
              nombre_entidad: item.attributes.nombre_entidad,
              numero_gallinas_ponedoras: item.attributes.numero_gallinas_ponedoras,
              numero_gallinas_reemplazo: item.attributes.numero_gallinas_reemplazo,
              numero_pollos: item.attributes.numero_pollos,
              
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

    editItem(item) {
      this.editedIndex = this.avicolas.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.avicolas.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      /* this.avicolas.splice(this.editedIndex, 1)
      this.closeDelete() */
      var id =this.editedItem.id
                axios.delete('http://localhost:1337/api/avicolas/'+id+'/')
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
   
   
    "numero_gallinas_ponedoras":this.editedItem.numero_gallinas_ponedoras,
    "numero_gallinas_reemplazo": this.editedItem.numero_gallinas_reemplazo,
    "numero_pollos": this.editedItem.numero_pollos,
    
    
    "latitud":this.editedItem.latitud,
    "longitud": this.editedItem.longitud,
    "nombre_entidad": this.editedItem.nombre_entidad,
    "municipio": this.Completar.municipio,
    "provincia": this.Completar.provincia,
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
  url: 'http://localhost:1337/api/avicolas/'+id+'/',
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
   
   
    "numero_gallinas_ponedoras":this.editedItem.numero_gallinas_ponedoras,
    "numero_gallinas_reemplazo": this.editedItem.numero_gallinas_reemplazo,
    "numero_pollos": this.editedItem.numero_pollos,
    
    
    "latitud":this.editedItem.latitud,
    "longitud": this.editedItem.longitud,
    "nombre_entidad": this.editedItem.nombre_entidad,
    "municipio": this.Completar.municipio,
    "provincia": this.Completar.provincia,
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
  url: 'http://localhost:1337/api/avicolas',
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

}
    },
  }


</script>
