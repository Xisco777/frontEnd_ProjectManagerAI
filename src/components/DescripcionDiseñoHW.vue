<template>
  <div>
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
                  <v-text-field
                    v-model="archivoPath"
                    label="Ruta documento"
                  ></v-text-field>
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
            <v-card-title class="text-h5">Estas seguro que quiere eliminarlo?</v-card-title>
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
      BOMs: ['', ''],
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
        ruta: ''
      },
      defaultItem: {
        name: '',
        tipo: '',
        fechamodificacion: '',
        path: ''
      },
      archivos: [
        {
          name: '',
          ruta: ''
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
      val || this.closeDelete()
    }
  },

  created () {
    this.initialize()
  },
  methods: {
    deleteItem (item) {
      this.editedIndex = this.archivos.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.archivos.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    enviar() {
      const archivosCarga = this.archivos.map(item => ({
        name: item.name,
        ruta: item.ruta
      }))
      axios
        .post('http://localhost:8000/generarDocumentoHDD', {
          nombre_bom: this.BOM,
          descripcion_proyecto: this.brevedescripcion,
          documentos: archivosCarga
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
    anadir () {
      // 1. Dividir la ruta del archivo
      const lastSlashIndex = this.archivoPath.lastIndexOf('\\')
      const nombreArchivo = this.archivoPath.substring(lastSlashIndex + 1)

      // 2. Actualizar editedItem
      this.editedItem.name = nombreArchivo
      this.editedItem.ruta = this.archivoPath

      // 3. Añadir a la matriz archivos
      this.archivos.push(this.editedItem)
      this.closeAñadir()
    },
    initialize () {
      axios
        .get('http://localhost:8000/lecturaNombreBOMs')
        .then(response => {
          this.BOMs = response.data
          console.log('BOM leida:', response.data)
          // ... (puedes agregar lógica adicional aquí, como mostrar un mensaje de éxito) ...
        })
        .catch(error => {
          console.error('Error en lectura la BOM:', error)
          // ... (manejo de errores, como mostrar un mensaje al usuario) ...
        })
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

    closeDelete () {
      this.dialogDelete = false
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
