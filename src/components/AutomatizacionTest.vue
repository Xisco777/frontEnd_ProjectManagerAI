<template>
  <div max-width="1500px">
    <v-card-text>
              <v-form @submit.prevent="enviarConsulta">
                <v-text-field
                  v-model="procedmientotest"
                  label="Procedimiento Test"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="nombreBBDD"
                  label="Descripcion de diseño HW (Opcional)"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="api_open_ai_key"
                  label="Especificaciones del producto (Opcional)"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="pythonFilePath"
                  label="Descripcion SW del Producto (Opcional)"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="dbDescriptionPath"
                  label="Documentacion Adicional (opcional)"
                ></v-text-field>

                <v-textarea
                  v-model="consulta"
                  label="Añadir contenido extra"
                  rows="3"
                  required
                ></v-textarea>
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">
                          Nombre Instrumento
                        </th>
                        <th class="text-left">
                          Tipo
                        </th>
                        <th class="text-left">
                          Clase .py
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="item in desserts"
                        :key="item.name"
                      >
                        <td>{{ item.name }}</td>
                        <td>{{ item.tipo }}</td>
                        <td>{{ item.clase }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
                <v-row align="center" justify="space-around">
                  <v-btn type="submit" color="primary" class="mt-4">
                  AÑADIR INSTRUMENTO
                </v-btn>
                <v-btn type="submit" color="primary" class="mt-4">
                  GENERAR CLASE .PY DEL INSTRUMENTO
                </v-btn>
              </v-row>
              <v-row align="center" justify="space-around">
                <v-btn type="submit" color="primary" class="mt-4">
                  CREAR SECUENCIA TEST
                </v-btn>
              </v-row>
              </v-form>
            </v-card-text>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      desserts: [
        {
          name: 'Multimetro IDM834',
          tipo: 'Multimetro',
          clase: 'IDM834.py'
        },
        {
          name: 'PiscoScope 2204A',
          tipo: 'Osciloscopio',
          clase: 'ps2000.py'
        },
        {
          name: 'PiscoScope 2204A Funciones',
          tipo: 'Funciones Osciloscopio',
          clase: 'functions.py'
        },
        {
          name: 'TTi EL302P',
          tipo: 'Fuente de Tension',
          clase: 'EL302P.py'
        }
      ],
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
          name: 'Multimetro IDM834',
          tipo: 'Multimetro',
          clase: 'IDM834.py'
        },
        {
          name: 'PiscoScope 2204A',
          tipo: 'Osciloscopio',
          clase: 'ps2000.py'
        },
        {
          name: 'PiscoScope 2204A Funciones',
          tipo: 'Funciones Osciloscopio',
          clase: 'functions.py'
        },
        {
          name: 'TTi EL302P',
          tipo: 'Fuente de Tension',
          clase: 'EL302P.py'
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
