<template>

  <v-card class="mx-auto mt-15 elevation-18" style="max-width: 500px;" v-if="!autenticado" color="#E0F7FA">

    <v-img contained src="2.jpg"></v-img>



    <v-form ref="form" v-model="form" class="pa-4 pt-6">

      <v-alert color="red" v-show="error" icon="mdi-account-alert">
        {{ errorMsg }}
      </v-alert>

      <v-alert color="light-green lighten-1" v-show="success" icon="mdi-account-check">
        Sesión iniciada <v-btn to="/" text class="elevation-4">ok</v-btn>
      </v-alert>
      <v-text-field :rules="[rules.required, rules.length(1)]" v-model="identifier" filled color="primary"
        label="nombre usuario" placeholder="nombre de usuario" prepend-inner-icon="mdi-account" />
      <v-text-field v-model="password" :rules="[rules.required]" filled color="primary" counter="9"
        placeholder="Contraseña" prepend-inner-icon="mdi-key" label="Contraseña" style="min-height: 96px"
        :type="passwordShow ? 'text' : 'password'" :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="passwordShow = !passwordShow" />



    </v-form>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn text @click="reload" color="error">
        Comenzar de nuevo
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn :disabled="!form" :loading="isLoading" class="white--text" color="primary" depressed text
        @click="PostUser">
        Entrar
      </v-btn>

    </v-card-actions>

  </v-card>
  <v-container v-else-if="autenticado" class="mt-10 mx-auto ui">

    <v-alert shaped outlined type="success" color="green">
      La sesión está iniciada


    </v-alert>


  </v-container>

</template>
<script>
/* import axios from 'axios'; */
const axios = require('axios');



export default {
  name: 'Login',
  data() {
    return {

      passwordShow: false,
      autenticado: '',
      existirUsuario: [],
      agreement: false,
      snackbar: false,
      hidden: false,

      usuarioAUth: false,
      dialog: false,

      form: false,
      isLoading: false,
      password: '',
      identifier: '',
      error: false,
      success: false,
      errorMsg: `Credenciales incorrectos`,

      rules: {
        length: (len) => (v) =>
          (v || "").length >= 1 || `Cantidad inválida de caracteres, requiere al menos ${len}`,
        /* password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
          'Su contraseña debe contener una letra mayúscula, un número y un caracter especial', */
        required: v => !!v.trim() || 'Requerido'

      },

    }
  },
  mounted() {
    this.autenticado = window.sessionStorage.getItem('email')


  },
  /*  created (){
     this.initialize()
   }, */
  methods: {


    async PostUser() {

      try {
        const { data } = await axios.post('http://localhost:1337/api/auth/local', {
          identifier: this.identifier,
          password: this.password,
        })


        console.log(data);
        sessionStorage.setItem('jwt', data.jwt)
        sessionStorage.setItem('username', data.user.username)
        sessionStorage.setItem('email', data.user.email)
        sessionStorage.setItem('rol', data.user.rol)



        location.reload()



      } catch (error) {
        this.error = true

      }
    },
    reload() {
      location.reload()
    },
    /*     async initialize (){
          await axios.get("https://localhost:1337/api/users").then(this.data.data.forEach((item) => {
            this.existirUsuario.push(item.username)
            console.log(this.existirUsuario);
          })
          .catch((response) =>{console.log(response)}
          
          
          ))
  
        } */







  }
}
</script>
