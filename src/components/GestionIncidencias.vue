<template>
  <div>
    <v-row
      align="center"
      justify="space-around"
    >
          <v-text-field
            v-model="email"
            label="EMAIL"
            clearable
          ></v-text-field>
        <v-btn color="primary" @click="guadaremail">
          GUARDAR EMAIL
        </v-btn>
    </v-row>
    <v-divider
      inset
      vertical
    ></v-divider>
    <v-row
      align="center"
      justify="space-around"
    >
        <v-btn color="primary" @click="dialogtipoIncidencia=true">
          CONFIGURAR TIPO INCIDENCIA
        </v-btn>
        <v-btn color="primary" @click="dialogpersonal=true">
          PERSONAL
        </v-btn>
        <v-btn color="primary" @click="dialogdescripcionEmpresa=true">
          EMPRESA
        </v-btn>
        <v-btn color="primary" @click="dialogproductos=true">
          PRODUCTOS
        </v-btn>
    </v-row>
    <v-dialog v-model="dialogtipoIncidencia" max-width="1200px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Describe los tipos de Incidencias</span>
        </v-card-title>
          <v-textarea
            v-model="tipoIncidencia"
          ></v-textarea>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="guadartipoincidencia">Guardar</v-btn>
          <v-btn color="blue darken-1" text @click="dialogtipoIncidencia = false">Salir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogpersonal" max-width="1200px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Describe al personal</span>
        </v-card-title>
          <v-textarea
            v-model="personal"
          ></v-textarea>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="guadarpersonal">Guardar</v-btn>
          <v-btn color="blue darken-1" text @click="dialogpersonal = false">Salir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogdescripcionEmpresa" max-width="1200px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Describe la empresa</span>
        </v-card-title>
          <v-textarea
            v-model="descripcionEmpresa"
          ></v-textarea>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="guadarempresa">Guardar</v-btn>
          <v-btn color="blue darken-1" text @click="dialogdescripcionEmpresa = false">Salir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogproductos" max-width="1200px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Describe los productos</span>
        </v-card-title>
          <v-textarea
            v-model="productos"
          ></v-textarea>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="guadarproductos">Guardar</v-btn>
          <v-btn color="blue darken-1" text @click="dialogproductos = false">Salir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-divider
      inset
      vertical
    ></v-divider>
    <p class="font-weight-black text-center">
      INCIDENCIAS/CONSULTAS ABIERTAS
    </p>
    <v-data-table
      :headers="headers"
      :items="archivos2"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
    <v-divider
      inset
      vertical
    ></v-divider>
    <v-card>
    <v-card-title>
      HISTORICO INCIDENCIAS/CONSULTAS
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="archivos"
      :items-per-page="5"
      class="elevation-1"
      :search="search"
    ></v-data-table>
  </v-card>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      search: '',
      email: '',
      descripcionEmpresa: '',
      productos: '',
      personal: '',
      tipoIncidencia: '',
      dialogdescripcionEmpresa: false,
      dialogproductos: false,
      dialogpersonal: false,
      dialogtipoIncidencia: false,
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Email Entrada',
          align: 'start',
          sortable: false,
          value: 'email'
        },
        { text: 'Tipo Incidencia/Consulta', value: 'tipo' },
        { text: 'Producto', value: 'producto' },
        { text: 'Responsable', value: 'responsable' },
        { text: 'Acciones', value: 'actions', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        tipo: '',
        fechamodificacion: '',
        path: ''
      },
      defaultItem: {
        name: '',
        tipo: '',
        fechamodificacion: '',
        path: ''
      },
      archivos: [
        {
          email: 'ejemplo_1@outlook.es',
          tipo: 'Consulta de Uso',
          producto: 'Actuador ST344-R12',
          responsable: 'Luis Toledo (SW)'
        },
        {
          email: 'ejemplo_2@outlook.es',
          tipo: 'Problemas Técnicos',
          producto: 'Actuador ST452-R25',
          responsable: 'Pepe Jimenez (HW)'
        },
        {
          email: 'ejemplo_3@outlook.es',
          tipo: 'Problemas Técnicos',
          producto: 'Tarjeta MT332',
          responsable: 'Armando Jaleo Seguro (HW)'
        }
      ],
      archivos2: [
        {
          email: 'ejemplo_1@outlook.es',
          tipo: 'Consulta de Uso',
          producto: 'Actuador ST344-R12',
          responsable: 'Luis Toledo (SW)'
        },
        {
          email: 'ejemplo_2@outlook.es',
          tipo: 'Problemas Técnicos',
          producto: 'Actuador ST452-R25',
          responsable: 'Pepe Jimenez (HW)'
        },
        {
          email: 'ejemplo_3@outlook.es',
          tipo: 'Problemas Técnicos',
          producto: 'Tarjeta MT332',
          responsable: 'Armando Jaleo Seguro (HW)'
        }
      ]
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },

  created () {
    this.initialize()
  },
  methods: {
    guadaremail() {
      axios
        .post('http://localhost:8000/set_EmailConsultas', {
          email: this.email
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .catch(error => {
          console.error('Error:', error)
          // ... Manejo de errores, como mostrar un mensaje al usuario ...
        })
    },
    guadarproductos() {
      this.dialogproductos = false
      axios
        .post('http://localhost:8000/set_configurarProductos', {
          productos: this.productos
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .catch(error => {
          console.error('Error:', error)
          // ... Manejo de errores, como mostrar un mensaje al usuario ...
        })
    },
    guadarpersonal() {
      this.dialogpersonal = false
      axios
        .post('http://localhost:8000/set_configuraPersonal', {
          personal: this.personal
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .catch(error => {
          console.error('Error:', error)
          // ... Manejo de errores, como mostrar un mensaje al usuario ...
        })
    },
    guadartipoincidencia() {
      this.dialogtipoIncidencia = false
      axios
        .post('http://localhost:8000/set_configurarTipoIncidencia', {
          tipoIncidencia: this.tipoIncidencia
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .catch(error => {
          console.error('Error:', error)
          // ... Manejo de errores, como mostrar un mensaje al usuario ...
        })
    },
    guadarempresa() {
      this.dialogdescripcionEmpresa = false
      axios
        .post('http://localhost:8000/set_descripcionEmpresa', {
          descripcionEmpresa: this.descripcionEmpresa
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .catch(error => {
          console.error('Error:', error)
          // ... Manejo de errores, como mostrar un mensaje al usuario ...
        })
    },
    initialize () {
      axios
        .get('http://localhost:8000/lecturaIncidenciasAbiertas')
        .then(response => {
          this.archivos2 = response.data
          console.log('workspaces leidas:', response.data)
          // ... (puedes agregar lógica adicional aquí, como mostrar un mensaje de éxito) ...
        })
        .catch(error => {
          console.error('Error en lectura de worskpace:', error)
          // ... (manejo de errores, como mostrar un mensaje al usuario) ...
        })
      axios
        .get('http://localhost:8000/lecturaIncidenciasHistorico')
        .then(response => {
          this.archivos = response.data
          console.log('workspaces leidas:', response.data)
          // ... (puedes agregar lógica adicional aquí, como mostrar un mensaje de éxito) ...
        })
        .catch(error => {
          console.error('Error en lectura de worskpace:', error)
          // ... (manejo de errores, como mostrar un mensaje al usuario) ...
        })
      axios
        .get('http://localhost:8000/get_EmailConsultas')
        .then(response => {
          this.email = response.data
          console.log('BOM leida:', response.data)
          // ... (puedes agregar lógica adicional aquí, como mostrar un mensaje de éxito) ...
        })
        .catch(error => {
          console.error('Error en lectura la BOM:', error)
          // ... (manejo de errores, como mostrar un mensaje al usuario) ...
        })
      axios
        .get('http://localhost:8000/get_configurarTipoIncidencia')
        .then(response => {
          this.tipoIncidencia = response.data
          console.log('BOM leida:', response.data)
          // ... (puedes agregar lógica adicional aquí, como mostrar un mensaje de éxito) ...
        })
        .catch(error => {
          console.error('Error en lectura la BOM:', error)
          // ... (manejo de errores, como mostrar un mensaje al usuario) ...
        })
      axios
        .get('http://localhost:8000/get_configuraPersonal')
        .then(response => {
          this.personal = response.data
          console.log('BOM leida:', response.data)
          // ... (puedes agregar lógica adicional aquí, como mostrar un mensaje de éxito) ...
        })
        .catch(error => {
          console.error('Error en lectura la BOM:', error)
          // ... (manejo de errores, como mostrar un mensaje al usuario) ...
        })
      axios
        .get('http://localhost:8000/get_descripcionEmpresa')
        .then(response => {
          this.descripcionEmpresa = response.data
          console.log('BOM leida:', response.data)
          // ... (puedes agregar lógica adicional aquí, como mostrar un mensaje de éxito) ...
        })
        .catch(error => {
          console.error('Error en lectura la BOM:', error)
          // ... (manejo de errores, como mostrar un mensaje al usuario) ...
        })
      axios
        .get('http://localhost:8000/get_configurarProductos')
        .then(response => {
          this.productos = response.data
          console.log('BOM leida:', response.data)
          // ... (puedes agregar lógica adicional aquí, como mostrar un mensaje de éxito) ...
        })
        .catch(error => {
          console.error('Error en lectura la BOM:', error)
          // ... (manejo de errores, como mostrar un mensaje al usuario) ...
        })
      this.archivos = [
        {
          email: 'ejemplo_1@outlook.es',
          tipo: 'Consulta de Uso',
          producto: 'Actuador ST344-R12',
          responsable: 'Luis Toledo (SW)',
          id: 6
        },
        {
          email: 'ejemplo_2@outlook.es',
          tipo: 'Problemas Técnicos',
          producto: 'Actuador ST452-R25',
          responsable: 'Pepe Jimenez (HW)',
          id: 5
        },
        {
          email: 'ejemplo_3@outlook.es',
          tipo: 'Problemas Técnicos',
          producto: 'Tarjeta MT332',
          responsable: 'Armando Jaleo Seguro (HW)',
          id: 4
        }
      ]
      this.archivos2 = [
        {
          email: 'ejemplo_3@outlook.es',
          tipo: 'Problemas Técnicos',
          producto: 'Actuador ST344-R12',
          responsable: 'Armando Jaleo Seguro (HW)',
          id: 1
        },
        {
          email: 'ejemplo_4@outlook.es',
          tipo: 'Problemas Técnicos',
          producto: 'Actuador ST333-R25',
          responsable: 'Pepe Jimenez (HW)',
          id: 2
        },
        {
          email: 'ejemplo_5@outlook.es',
          tipo: 'Problemas Técnicos',
          producto: 'Tarjeta ST331',
          responsable: 'Armando Jaleo Seguro (HW)',
          id: 3
        }
      ]
    },
    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    }
  },
  mounted () {
  }
}
</script>
<style>
</style>
