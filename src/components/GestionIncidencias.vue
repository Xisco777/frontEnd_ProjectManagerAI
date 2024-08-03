<template>
  <div>
    <p class="font-weight-black text-center">
      GESTIÓN INCIDENCIAS CONSULTAS
    </p>
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
        <v-btn color="primary" @click="conftipoincidencia=true">
          COMFIGURAR TIPO INCIDENCIA
        </v-btn>
        <v-btn color="primary" @click="irGestionPersonal">
          PERSONAL
        </v-btn>
        <v-btn color="primary" @click="irGestionEmpresa">
          EMPRESA
        </v-btn>
        <v-btn color="primary" @click="irGestionProductos">
          PRODUCTOS
        </v-btn>
    </v-row>
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
export default {
  data () {
    return {
      search: '',
      email: '',
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
      this.message = 'You clicked the button!'
    },
    initialize () {
      this.archivos = [
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
      this.archivos2 = [
        {
          email: 'ejemplo_3@outlook.es',
          tipo: 'Problemas Técnicos',
          producto: 'Actuador ST344-R12',
          responsable: 'Armando Jaleo Seguro (HW)'
        },
        {
          email: 'ejemplo_4@outlook.es',
          tipo: 'Problemas Técnicos',
          producto: 'Actuador ST333-R25',
          responsable: 'Pepe Jimenez (HW)'
        },
        {
          email: 'ejemplo_5@outlook.es',
          tipo: 'Problemas Técnicos',
          producto: 'Tarjeta ST331',
          responsable: 'Armando Jaleo Seguro (HW)'
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
