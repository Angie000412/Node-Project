<template >
    <v-app id="main" >
     
     
      <v-navigation-drawer
        v-model="drawer"
        v-if="nombre_usuario"
        :clipped="clipped"
        fixed
        app
        width="370"
        color="blue lighten-1">
     <div class="text-center" >
<v-avatar size="80" color="primary" zize="60" class="mt-3" v-if="nombre_usuario">
  <v-icon size="70" color="white">mdi-account</v-icon>
</v-avatar>

 <h1 class="text-h6 ml-5" mt="8" >{{nombre_usuario}}</h1> 
 </div> 
 <v-list>
        <v-list-item 
         to="/"  >
          <v-list-item-icon>
            <v-icon color="primary">mdi-view-dashboard</v-icon>
          </v-list-item-icon>
  
          <v-list-item-title>Inicio</v-list-item-title>
          
        </v-list-item>
  
       <!--  <v-list-group
          :value="true"
          prepend-icon="mdi-gas-burner"
          
        >
          <template v-slot:activator>   
            <v-list-item-title class="text-current">Entidades que generan residuos</v-list-item-title>
          </template> -->
  
          <v-list-group
            :value="true"
            no-action
            sub-group
            v-if="rol_usuario=='Especialista'"
            
           
          >
            <template v-slot:activator>
             
                <v-list-item-title >  <v-icon>mdi-fire</v-icon>Residuos que generan biogás</v-list-item-title>
             
            </template>
  
         
            <v-list-item
            v-for="(item, i) in entidades"
            :key="i"
            :to="item.to"
            router
            exact
            
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
          </v-list-group>
 
         
  
            
  
                
              
      
   
        
         
           <!--  <v-list-item  to="/rsu" v-if="rol_usuario=='Especialista'">
          <v-list-item-icon>
            <v-icon color="primary">mdi-home-variant</v-icon>
          </v-list-item-icon>
  
          <v-list-item-title>Residuos Sólidos Urbanos</v-list-item-title>
        </v-list-item> -->
            <v-list-item  to="/Reporte" v-if="rol_usuario=='Especialista'">
          <v-list-item-icon>
            <v-icon color="primary">mdi-clipboard-outline</v-icon>
          </v-list-item-icon>
  
          <v-list-item-title>Reporte General</v-list-item-title>
        </v-list-item>
            <v-list-item  to="/Mapas" v-if="rol_usuario=='Especialista'">
          <v-list-item-icon>
            <v-icon color="primary">mdi-map-marker-radius</v-icon>
          </v-list-item-icon>
  
          <v-list-item-title>Geolocalización</v-list-item-title>
        </v-list-item>

          
            <v-list-item  to="/para_admin/usuarios2" v-if="rol_usuario=='Administrador'">
          <v-list-item-icon>
            <v-icon color="primary">mdi-account-multiple</v-icon>
          </v-list-item-icon>
  
          <v-list-item-title>Gestionar Usuarios </v-list-item-title>
        </v-list-item>
  
        
      </v-list>
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      <v-spacer></v-spacer>
 
     
      </v-navigation-drawer>
      <v-app-bar
        :clipped-left="clipped"
        fixed
        app
        color="blue lighten-1"
        static
        
      >
        
         <v-btn text color="primary"   
             @click.stop="drawer = !drawer" 
       v-if="nombre_usuario"
    
    > <v-icon color="primary">mdi-menu</v-icon>Menu</v-btn>

        
        
  
  
  
      <v-spacer></v-spacer>
      
      <div width="40">
        <v-img src="logo_uniss" contain></v-img>
      </div>
  
  <v-tab to="/"
  
  >
    <v-btn text color="primary" 
    
    > <v-icon color="primary">mdi-home-variant</v-icon>Home</v-btn>
  </v-tab>
  

  
  <v-btn
  
    color="primary"
    text
    
    
    @click="CloseSesion"
    v-if="nombre_usuario"
  >
  <v-icon append color="primary" circles>mdi-account</v-icon>
  Cerrar Sesión
 
  </v-btn>
  <v-btn
  
    color="primary"
    text
    
    
    to="/login"
    v-if="!nombre_usuario"
  >
  <v-icon append color="primary" circles>mdi-account</v-icon>
  Iniciar Sesión
 
  </v-btn>
 
  
      </v-app-bar>
      
      <v-main class="23" >
        <v-container  >
          <Nuxt />
        </v-container>
      </v-main>
      

 
   <v-footer
    dark
    padless
    color="white"
  >
  
    <v-card
      class="flex"
      flat
      tile
      color="white"
    >
    

      <v-card-text class="py-2 primary--text text-center" >
        {{ new Date().getFullYear() }} — <strong>Universidad de Sancti Spíritus José Martí</strong>
      </v-card-text>
    </v-card>
    
  </v-footer>

    
  
  
  

    </v-app>

  </template>
  
  
<script>


   export default {

    name: 'DefaultLayout',
   /*  computed:{
      theme(){
        return (this.$vuetify.theme.light) ? 'dark' : 'light'
      }
    }, */
    data () {
      return {
        clipped: false,
        nombre_usuario:'',
        isActive: true,
        drawer: false,
        fixed: false,
        isAuth: false,
       
        rol_usuario: '',
        hidden: false,  
        icons: [
        'mdi-home',
        'mdi-email',
        'mdi-calendar',
        'mdi-delete',
      ],
      
      entidades: [
        { title: 'Residuos Porcinos', icon: 'mdi-pig', to: '/agropecuario/porcino' },
        { title: 'Residuos Cuniculas', icon: 'mdi-rabbit', to: '/agropecuario/cuniculas' },
        { title: 'Residuos Equinos', icon: 'mdi-horse', to: '/agropecuario/equino' },
        { title: 'Residuos Avicolas', icon: 'mdi-bird', to: '/agropecuario/avicolas' },
        { title: 'Residuos de Ganado Menor', icon: 'mdi-sheep', to: '/agropecuario/ganado-menor' },
        { title: 'Residuos Arroz', icon: 'mdi-rice', to: '/industrial/arroceras' },
        { title: 'Residuos de Ganado Mayor', icon: 'mdi-cow', to: '/agropecuario/ganado-mayor' },
        { title: ' Residuos Azúcar', icon: 'mdi-spoon-sugar', to: '/industrial/azucarera' },
        { title: 'Residuos Bebidas y Licores', icon: 'mdi-glass-wine', to: '/industrial/bebidaslicores' },
        { title: 'Residuos Pesca', icon: 'mdi-fish', to: '/industrial/pesquera' },
        { title: 'Residuos Lácteos', icon: 'mdi-cup', to: '/industrial/lactea' },
        { title: 'Residuos de Conserva', icon: 'mdi-fridge', to: '/industrial/conserva' },
  
          {title:' Residuos Cultivos Varios',
          icon: 'mdi-sprout-outline',
          to: '/industrial/cultivos-varios'},
  
          {title:'Residuos Cárnicos', 
          icon: 'mdi-food-drumstick-outline',
          to: '/industrial/carnica'},
          
          {title:'Residuos Granos',
          icon: 'mdi-peanut',
          to: '/industrial/granos'},
          {title:'Residuos Solidos Urbanos',
          icon: 'mdi-home',
          to: '/rsu'},
          
        ],
     
        
        right: true,
        rightDrawer: false,
        title: 'Vuetify.js'
      }
      
    },
    /* computed: {
      CerrarVentana() {
      if(window.closed()){
      window.localStorage.clear
      }
    },}, */
    
   
    methods:{
      CloseSesion(){
      window.sessionStorage.removeItem('username')
          window.sessionStorage.removeItem('rol')
          window.sessionStorage.removeItem('email')
          window.sessionStorage.removeItem('jwt') 
          alert(`Sesión cerrada con éxito`)
          location.reload()//prevenir que cuando haga el reload no me permita acceder 
          
      }
      
    },
    mounted(){
     
      this.nombre_usuario = window.sessionStorage.getItem('username')
      this.rol_usuario = window.sessionStorage.getItem('rol')
     
    },
    
  }
 
</script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css"></link>
  
  
  
  