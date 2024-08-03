<template>
  <div>
    <p class="font-weight-black text-center">
      Generacion Documento Descripcion de Diseño HW
    </p>
    <v-select
      :items="BOMs"
      label="BOM"
      dense
      v-model="BOM"
    ></v-select>
    <v-textarea
      v-model="brevedescripcion"
      solo
      name="input-7-4"
      label="Breve descripcion del desarrollo"
    ></v-textarea>
    <v-data-table
    :headers="headers"
    :items="archivos"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Documentacion Adicional</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialogAñadir"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Añadir Documento
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-file-input
                    v-model="texto"
                    label="Ruta documento"
                    placeholder="Ruta documento"
                    prepend-icon="mdi-paperclip"
                  >
                </v-file-input>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="closeAñadir"
              >
                Salir
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="anadir"
              >
                Añadir
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
  <v-divider
      inset
      vertical
    ></v-divider>
    <v-row
      align="center"
      justify="space-around"
    >
  <v-btn color="primary" @click="irGestionProductos">
          Generar Documento Descripcion Diseño HW
        </v-btn>
        </v-row>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      brevedescripcion: '',
      BOM: '',
      dialogCargar: false,
      dialoguardar: false,
      dialogAñadir: false,
      BOMs: ['ST-TT2-RS2', 'ST-TT2-RS3', 'ST-TT3-RS2', 'ST-TT4-RS2'],
      path: '',
      dialogResumen: false,
      headers: [
        {
          text: 'Nombre Documento',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Ruta', value: 'ruta' },
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
          name: 'RequisitosCliente.docx',
          ruta: 'C:\\Users\\Xisco\\Documents\\ProjectManagerIA\\Gestion\\RequisitosCliente.docx'
        },
        {
          name: 'RequisitosProyecto.docx',
          ruta: 'C:\\Users\\Xisco\\Documents\\ProjectManagerIA\\Gestion\\RequisitosProyecto.docx'
        },
        {
          name: 'InterfacesSistema.docx',
          ruta: 'C:\\Users\\Xisco\\Documents\\ProjectManagerIA\\Gestion\\InterfacesSistema.docx'
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
    dialogDelete (val) {
      val || this.closeResumen()
    }
  },

  created () {
    this.initialize()
  },
  methods: {
    enviar() {
      axios
        .post('http://localhost:8000/generarHDD', {
          descripcion: this.brevedescripcion,
          BOM: this.BOM,
          docAdicional: this.archivos
        })
        .then(response => {
          console.log('Respuesta del servidor:', response.data)
          // Puedes manejar la respuesta aquí, por ejemplo, mostrar un mensaje de éxito
        })
        .catch(error => {
          console.error('Error al enviar los datos:', error)
          // Puedes manejar el error aquí, por ejemplo, mostrar un mensaje de error
        })
    },
    loadBOMs() {
      axios
        .get('http://localhost:8000/loadBOMs')
        .then(response => {
          this.BOMs = response.data
        })
        .catch(error => {
          console.error('Error al cargar los BOMs:', error)
        })
    },
    anadir () {
      if (this.editedIndex > -1) {
        Object.assign(this.archivos[this.editedIndex], this.editedItem)
      } else {
        this.archivos.push(this.editedItem)
      }
      this.closeAñadir()
    },
    initialize () {
      this.loadBOMs()
      this.archivos = [
        {
          name: 'RequisitosCliente.docx',
          ruta: 'C:\\Users\\Xisco\\Documents\\ProjectManagerIA\\Gestion\\RequisitosCliente.docx'
        },
        {
          name: 'RequisitosProyecto.docx',
          ruta: 'C:\\Users\\Xisco\\Documents\\ProjectManagerIA\\Gestion\\RequisitosProyecto.docx'
        },
        {
          name: 'InterfacesSistema.docx',
          ruta: 'C:\\Users\\Xisco\\Documents\\ProjectManagerIA\\Gestion\\InterfacesSistema.docx'
        }
      ]
    },
    datasheet (item) {

    },

    Resumen (item) {
      this.dialogResumen = true
    },

    closeResumen () {
      this.dialogResumen = false
    },

    closeAñadir () {
      this.dialogAñadir = false
    }

  },
  mounted () {
  }
}
</script>
<style>
</style>
