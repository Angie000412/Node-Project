<template>
  <v-data-table
    :headers="headers"
    :items="usuarios"
    :search="search"
    sort-by="password"
    class="elevation-18"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>
          <v-icon>mdi-account-multiple</v-icon>Usuarios
        </v-toolbar-title>
        
        
        <v-divider class="mx-4" inset vertical></v-divider>
        
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          placeholder="Buscar usuarios"
          class="mt-3"
        >
        </v-text-field>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <v-divider vertical></v-divider>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2 elevation-5"
              v-bind="attrs"
              v-on="on"
              text
            >
              Nuevo Usuario
            </v-btn>
          </template>
          <!-- <UserForm :show='form' :title="formTitle"/> -->
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-form ref="form" v-model="form" class="pa-4 pt-6">
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="editedItem.username"
                        :rules="[rules.required, rules.username]"
                        placeholder="nombre de usuario"
                        prepend-inner-icon="mdi-account"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        :rules="[rules.password, rules.length(6)]"
                        counter="9"
                        v-model="editedItem.password"
                        placeholder="contraseña"
                        prepend-inner-icon="mdi-key"
                        :type="passwordShow ? 'text' : 'password'"
                        :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="passwordShow = !passwordShow"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="editedItem.email"
                        suffix="@gmail.com"
                        prepend-inner-icon="mdi-email"
                        :rules="[rules.required,rules.correo, rules.email]"
                        label="correo"
                      
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  
        <h1>{{editedItem.email}}</h1>
                </v-form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" @click="close"> Cancelar </v-btn>
              <v-btn
                color="blue darken-1"
                @click="createUser"
                :disabled="!form"
                :loading="isLoading"
                depressed
              >
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Seguro que desea eliminar?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn color="warning" x-small @click="editItem(item)">
        <v-icon small color="white"> mdi-pencil </v-icon>
      </v-btn>
      <v-btn
        color="error"
        x-small
        @click="deleteItem(item)"
        v-if="item.rol != 'Administrador'"
      >
        <!-- desabilitar el botón en el editedItem.id=1 -->
        <v-icon small color="white"> mdi-delete </v-icon>
      </v-btn>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
const axios = require("axios");
export default {
  beforeRouteEnter: (to, from, next) => {
    console.log("Verificando credenciales..");
    let isAuth = sessionStorage.getItem("username");
    let role = sessionStorage.getItem("rol");
    return isAuth && role === "Administrador" ? next() : next("/login");
  },

data () {
  return {
    search: "",
    dialog: false,
    correos: [],
    dialogDelete: false,
    rolUser: true,
    mostrarBtn: true,
    form: false,
    isLoading: false,
    passwordShow: false,
    headers: [
      {
        text: "Usuario",
        sortable: false,
        value: "username",
      },

      { text: "Correo", value: "email", align: "center" },
      { text: "Rol", value: "rol" },

      {
        text: "Acciones del Admin",
        value: "actions",
        sortable: false,
        align: "end",
      },
    ],
    usuarios: [],
    usernames: [],
   
    editedIndex: -1,
    editedItem: {
      id: 0,
      username: "",
      password: "",
      rol: "",

      provider: "",
      email: "",
      resetPasswordToken: "",
      confirmationToken: "",
      confirmed: true,
      blocked: false,
    },
    defaultItem: {
      username: "",
      password: "",
      roles: "",
      email: "",
    },
    rules: {
      length: (len) => (v) =>
        (v || "").length >= len || `Invalid character length, required ${len}`,
      password: (v) =>
        !!(v || "").match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/
        ) ||
        "Su contraseña debe contener una letra mayúscula, un número y un caracter especial",
      required: (v) => !!v || "Campo requerido",
      email: (v) =>
        !!(v || "").match(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) || "el email debe tener @ y al menos un punto",
      correo: v => (this.correos.includes(v)==false)||'Ese correo ya existe',
      username: v => (this.usernames.includes(v)==false)||'Ese nombre de usuario ya existe, puede añadir cualquier caracter para diferenciar ',
    },



  }
},
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo" : "Editar";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
    if (window.sessionStorage.getItem("rol")) {
      this.rolUser = false;
    }
  },

  methods: {
    async initialize() {

      await axios.get("http://localhost:1337/api/users/",)
      .then((response) => {
        response.data.forEach((item) => { 
          this.usuarios.push({   
            id: item.id,
            username:item.username,
            email:item.email,
            rol:item.rol,})
          this.correos.push(item.email)
          this.usernames.push(item.username)
        
        
        })})
      .catch((response) =>{console.log(response)});


      /*try {
        const res = await axios.get("http://localhost:1337/api/users/");
        console.log("Respuesta", res);
        if (res.status === 200) {
          this.usuarios = res.data;
        } else {
          alert(res);
        }
      } catch (err) {
        console.log(err);
        alert(err.message);
      }*/
    },
    editItem(item) {
      this.editedIndex = this.usuarios.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.usuarios.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      var id = this.editedItem.id;
      axios
        .delete("http://localhost:1337/api/users/" + id + "/")
        .then((response) => {
          console.log(response);
        });
      this.closeDelete();
      location.reload();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    async createUser() {
      //Metodo para crear usuario por metodo POST
      if (this.editedIndex > -1) {
        this.editUser();
      } else {
        var data = JSON.stringify({
          username: this.editedItem.username,
          email: this.editedItem.email,
          password: this.editedItem.password,
          rol: "Especialista",
          resetPasswordToken: "",
          confirmationToken: "",
          confirmed: false,
          blocked: false,
        });
        var config = {
          method: "post",
          url: "http://localhost:1337/api/auth/local/register",
          headers: {
            Authorization: "Bearer" + sessionStorage.getItem("jwt"),
            "Content-Type": "application/json",
          },
          data: data,
        };

        axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.error(error);
          });
          this.close();
        location.reload();
      }
    },
    editUser() {
      //Metodo para actualizar un usuario por metodo PUT
      //ver si ya se editó o no
      var data = JSON.stringify({
        username: this.editedItem.username,
        email: this.editedItem.email,
        password: this.editedItem.password,
        resetPasswordToken: "",
        rol: "Especialista",
        confirmationToken: "",
        confirmed: false,
        blocked: false,
      });
      var id = this.editedItem.id;

      var config = {
        method: "put",
        url: "http://localhost:1337/api/users/" + id + "/",
        headers: {
          Authorization: "Bearer" + sessionStorage.getItem("jwt"),
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.error(error);
        });

        this.close();
        location.reload();
    },
  },
};
</script>
