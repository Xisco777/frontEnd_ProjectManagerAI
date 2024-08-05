<template>
  <div max-width="1500px">
    <p class="font-weight-black text-center">
      GESTIÓN DOCUMENTAL
    </p>
    <v-row
      align="center"
      justify="space-around"
    >
        <v-btn color="primary" @click="dialoguardar = true">
          CREAR WORKSPACE
        </v-btn>
        <v-btn color="primary" @click="dialogCargarWorkspace = true">
          CARGAR WORKSPACE
        </v-btn>
    </v-row>
    <v-divider
      inset
      vertical
    ></v-divider>
    <v-dialog v-model="dialocrearworkspace" max-width="1100px">
      <v-card>
        <v-card-title>
          <span class="text-h5">CREAR WORKSPACE</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="archivosPath"
                  label="Path"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="workspacename"
                  label="Nombre del Workspace"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialocrearworkspace= false">SALIR</v-btn>
          <v-btn color="blue darken-1" text @click="guardarworkspace">GUARDAR</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogCargarWorkspace" max-width="1200px">
      <v-card>
        <v-card-title>
          <span class="text-h5">CARGAR WORKSPACE</span>
        </v-card-title>
        <v-select
          v-model="selectworkspace"
          :items="workspaces"
          label="Standard"
          dense
        ></v-select>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogCargarWorkspace = false">Salir</v-btn>
          <v-btn color="blue darken-1" text @click="cargarworkspace">Cargar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card v-model="mostrarworkspace">
      <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>{{this.workspacename}}</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="800px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Añadir documento
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5"> Nuevo Documento </span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="Ruta Documento"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Desea Eliminar?</v-card-title>
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
  </v-data-table>
  <v-spacer></v-spacer>
      <v-row
        align="center"
        justify="space-around"
      >
      <v-btn
            color="primary"
            flat
            @click=recargarLista()
          >
            RECARGAR LISTA
          </v-btn>
          <v-btn
            color="primary"
            flat
            @click=checkearDocumentacionDuplicada()
          >
            CHECKEAR DOCUMENTACION DUPLICADA
          </v-btn>
          <v-checkbox
        v-model="WorkspaceAutomatica"
        color="secondary"
        label="RECARGA AUTOMATICA (CADA 10 MINUTOS)"
        @click="cambioWorkspaceAutomatica"
      ></v-checkbox>
      </v-row>
        <div>
      <v-card-actions>
          <v-spacer></v-spacer>
          <v-container fluid>
          <v-textarea
            v-model="consultamensaje"
            autocomplete="email"
            label="Introduce pregunta para buscar en la documentacion"
          ></v-textarea>
        </v-container>
      </v-card-actions>
      <v-spacer></v-spacer>
          <v-col class="text-center" cols="12">
          <v-btn
            color="primary"
            flat
            @click=consulta()
          >
            CONSULTAR
          </v-btn>
        </v-col>
      </div>
    </v-card>
    <v-dialog v-model="dialogresupuestaduplicidad" max-width="1200px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Respuesta Archivo Dupicados</span>
        </v-card-title>
          <v-textarea
            v-model="respuestaduplicidad"
          ></v-textarea>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogresupuestaduplicidad = false">Salir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogconsulta" max-width="1200px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Respuesta Consulta</span>
        </v-card-title>
          <v-textarea
            v-model="respuestaconsulta"
          ></v-textarea>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogconsulta = false">Salir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      WorkspaceAutomatica: false,
      dialogCargarWorkspace: false,
      dialocrearworkspace: false,
      dialog: false,
      dialogDelete: false,
      mostrarworkspace: false,
      dialogresupuestaduplicidad: false,
      dialogconsulta: false,
      selectworkspace: '',
      workspaces: [],
      respuestaduplicidad: '',
      respuestaconsulta: '',
      consultamensaje: '',
      headers: [
        {
          text: 'Nombre Documento',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Tipo Documento', value: 'tipo' },
        { text: 'Fecha Modificación', value: 'fecha' },
        { text: 'Ruta', value: 'ruta' },
        { text: 'Acciones', value: 'actions', sortable: false }
      ],
      desserts: [],
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
          name: 'ProjectManagerIA.docx',
          tipo: '.docx',
          fechamodificacion: '2023-08-15 07:51:19',
          path: 'ProjectManagerIA.docx'
        },
        {
          name: '222.docx',
          tipo: '.docx',
          fechamodificacion: '2023-08-15 07:51:19',
          path: '222.docx'
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
    cambioWorkspaceAutomatica() {
      axios
        .post('http://localhost:8000/set_recargaWorkspaceAutomatica', {
          activar: this.WorkspaceAutomatica
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
    guardarworkspace() {
      this.dialocrearworkspace = false
      this.mostrarworkspace = true
      if (this.archivosPath && this.workspacename) {
        axios
          .get('http://localhost:8000/generarWorkspace', {
            params: {
              path: this.archivosPath,
              nombreProyecto: this.workspacename
            }
          })
          .then(response => {
            console.log('Workspace guardada:', response.data)
            this.dialocrearworkspace = false // Cierra el diálogo después de guardar
            this.archivos = response.data
          })
          .catch(error => {
            console.error('Error al guardar la workspace:', error)
          })
      } else {
        console.error('Por favor, completa ambos campos (ruta y nombre del proyecto).')
      }
    },
    cargarWorkspace() {
      this.mostrarworkspace = true
      if (this.selectBOM) {
        axios
          .get('http://localhost:8000/recargarListaWorkspace', {
            params: {
              nombre_workspace: this.selectworkspace
            }
          })
          .then(response => {
            console.log('Workspace leida:', response.data)
            // ... (puedes agregar lógica adicional aquí, como mostrar un mensaje de éxito) ...
            this.dialogCargarWorkspace = false // Cierra el diálogo después de guardar
            this.archivos = response.data
          })
          .catch(error => {
            console.error('Error en lectura la BOM:', error)
            // ... (manejo de errores, como mostrar un mensaje al usuario) ...
          })
      } else {
        console.error('Por favor, completa campo en el selector.')
        // ... (puedes mostrar un mensaje al usuario en la interfaz) ...
      }
    },
    recargarLista() {
      axios
        .get('http://localhost:8000/recargarListaWorkspace', {
          params: {
            nombre_workspace: this.selectworkspace
          }
        })
        .then(response => {
          console.log('Workspace leida:', response.data)
          // ... (puedes agregar lógica adicional aquí, como mostrar un mensaje de éxito) ...
          this.dialogCargarWorkspace = false // Cierra el diálogo después de guardar
          this.archivos = response.data
        })
        .catch(error => {
          console.error('Error en lectura la BOM:', error)
          // ... (manejo de errores, como mostrar un mensaje al usuario) ...
        })
    },
    consulta() {
      axios
        .get('http://localhost:8000/consultaWorkspace', {
          params: {
            nombre_workspace: this.selectworkspace,
            consulta: this.consultamensaje
          }
        })
        .then(response => {
          this.respuestaconsulta = response.data
          console.log('Workspace leida:', response.data)
          // ... (puedes agregar lógica adicional aquí, como mostrar un mensaje de éxito) ...
          this.dialogconsulta = true // Cierra el diálogo después de guardar
        })
        .catch(error => {
          console.error('Error en lectura la BOM:', error)
          // ... (manejo de errores, como mostrar un mensaje al usuario) ...
        })
    },
    checkearDocumentacionDuplicada() {
      axios
        .get('http://localhost:8000/checkearduplicidadWorkspace', {
          params: {
            nombre_workspace: this.selectworkspace
          }
        })
        .then(response => {
          this.respuestaduplicidad = response.data
          this.dialogresupuestaduplicidad = true
          console.log('BOM leida:', response.data)
          // ... (puedes agregar lógica adicional aquí, como mostrar un mensaje de éxito) ...
        })
        .catch(error => {
          console.error('Error en lectura la BOM:', error)
          // ... (manejo de errores, como mostrar un mensaje al usuario) ...
        })
    },
    initialize () {
      axios
        .get('http://localhost:8000/get_recargaWorkspaceAutomatica')
        .then(response => {
          this.WorkspaceAutomatica = response.data
          console.log('BOM leida:', response.data)
          // ... (puedes agregar lógica adicional aquí, como mostrar un mensaje de éxito) ...
        })
        .catch(error => {
          console.error('Error en lectura la BOM:', error)
          // ... (manejo de errores, como mostrar un mensaje al usuario) ...
        })
      axios
        .get('http://localhost:8000/lecturaNombreWorkspace')
        .then(response => {
          this.workspaces = response.data
          console.log('workspaces leidas:', response.data)
          // ... (puedes agregar lógica adicional aquí, como mostrar un mensaje de éxito) ...
        })
        .catch(error => {
          console.error('Error en lectura de worskpace:', error)
          // ... (manejo de errores, como mostrar un mensaje al usuario) ...
        })
      this.desserts = [
        {
          name: 'ProjectManagerIA.docx',
          tipo: '.docx',
          fecha: '23-08-15 07:51:19',
          ruta: 'C:/Users/Xisco/Documents/ProjectManagerIA/GestionDocumentacionIA/ProjectManagerIA.docx'
        },
        {
          name: 'ListaRequisitosProjectManagerIA.docx',
          tipo: '.docx',
          fecha: '23-08-15 09:33:39',
          ruta: 'C:/Users/Xisco/Documents/ProjectManagerIA/GestionDocumentacionIA/ListaRequisitosProjectManagerIA.docx'
        },
        {
          name: 'DescripcionDiseñoSW.docx',
          tipo: '.docx',
          fecha: '23-08-15 09:53:29',
          ruta: 'C:/Users/Xisco/Documents/ProjectManagerIA/GestionDocumentacionIA/DescripcionDiseñoSW.docx'
        }
      ]
    },

    deleteItem (item) {
      this.editedIndex = this.archivos.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.editedItem = this.archivos.indexOf(this.editedIndex)
      axios
        .get('http://localhost:8000/eliminararchivoWorkspace', {
          params: {
            nombreWorkspace: this.selectworkspace,
            archivo: this.editedItem['ruta']
          }
        })
        .then(response => {
          this.workspaces = response.data
          console.log('workspaces leidas:', response.data)
          // ... (puedes agregar lógica adicional aquí, como mostrar un mensaje de éxito) ...
        })
        .catch(error => {
          console.error('Error en lectura de worskpace:', error)
          // ... (manejo de errores, como mostrar un mensaje al usuario) ...
        })
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
      axios
        .post('http://localhost:8000/añadirDocumentoWorkspace', {
          path: this.WorkspaceAutomatica,
          nameworkspace: this.selectworkspace
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          console.log('Workspace leida:', response.data)
          // ... (puedes agregar lógica adicional aquí, como mostrar un mensaje de éxito) ...
          this.archivos = response.data
        })
        .catch(error => {
          console.error('Error:', error)
          // ... Manejo de errores, como mostrar un mensaje al usuario ...
        })
      this.close()
    }
  },
  mounted () {
  }
}
</script>
<style>
</style>
