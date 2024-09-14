<template>
  <div max-width="1500px">
    <v-card-text>
                <v-select
                  v-model="prototipoSeleccionado"
                  :items="prototipos"
                  label="Seleccionar Prototipo"
                  outlined
                  class="mb-4"
                  @change="modificar_tabla_tests(prototipoSeleccionado)"
                ></v-select>
                <v-data-table
                  :headers="headers"
                  :items="tabla"
                  class="elevation-1"
                >
                  <template #[`item.glutenfree`]="{ item }">
                    <v-simple-checkbox
                      v-model="item.glutenfree"
                      disabled
                    ></v-simple-checkbox>
                  </template>
                  <template #[`item.actions`]="{ item }">
                    <v-icon
                      small
                      class="mr-2"
                      @click="funcionEditarTest(item)"
                    >
                      mdi-pencil
                    </v-icon>
                    <v-icon
                      small
                      @click="abrirDialogEliminarTest(item)"
                    >
                      mdi-delete
                    </v-icon>
                  </template>
                  <template #[`item.ejecutar`]="{ item }">
                    <v-btn
                      v-if="item.ejecutarestado"
                      small
                      color="primary"
                      @click="ejecutarTest(item)"
                    >
                      Ejecutar
                    </v-btn>
                  </template>
                </v-data-table>
                <v-row align="center" justify="space-around">
                  <v-btn type="submit" color="primary" class="mt-4" @click="dialogAnadirTest = true">
                    AÑADIR TEST
                  </v-btn>
                  <v-btn type="submit" color="primary" class="mt-4" @click="dialogCrearTest = true">
                    CREAR TEST
                  </v-btn>
                  <v-btn type="submit" color="primary" class="mt-4" @click="dialogCrearPrototipo = true">
                    CREAR PROTOTIPO
                  </v-btn>
                </v-row>
    </v-card-text>
    <v-dialog v-model="dialogEditarTest" max-width="500px">
                  <v-card>
                    <v-card-title>
                      <span class="headline">Editar Test</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="norma" label="Norma"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="origen" label="Origen"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="metodo" label="Método"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="tipo" label="Tipo"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="responsable" label="Responsable"></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-textarea v-model="descripcion" label="Descripción"></v-textarea>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-switch v-model="ejecucion" label="Ejecución"></v-switch>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field v-model="nombrefuncion" label="Nombre de función"></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="dialogEditarTest = false">Cancelar</v-btn>
                      <v-btn color="blue darken-1" text @click="guardarEdicionTest">Guardar</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
    <v-dialog v-model="dialogAnadirTest" max-width="1000px">
      <v-card>
        <v-card-title>Añadir Test</v-card-title>
        <v-card-text>
          <v-select
            v-model="testSeleccionado"
            :items="tests"
            label="Seleccionar test"
            required
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogAnadirTest = false">Cerrar</v-btn>
          <v-btn color="blue darken-1" text @click="anadirTest">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogEliminarTest" max-width="500px">
      <v-card>
        <v-card-title class="headline">¿Estás seguro de que quieres eliminar este test?</v-card-title>
        <v-card-text>Esta acción no se puede deshacer.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogEliminarTest = false">Cancelar</v-btn>
          <v-btn color="red darken-1" text @click="eliminarTest">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogCrearTest" max-width="1000px">
      <v-card>
        <v-card-title>Crear Test</v-card-title>
          <v-card-text>
          <v-text-field
            v-model="nombreTest"
            label="Nombre del test"
            required
          ></v-text-field>
          <v-text-field
            v-model="norma"
            label="Norma"
            required
          ></v-text-field>
          <v-text-field
            v-model="origen"
            label="Origen"
            required
          ></v-text-field>
          <v-text-field
            v-model="metodo"
            label="Método"
            required
          ></v-text-field>
          <v-text-field
            v-model="tipo"
            label="Tipo"
            required
          ></v-text-field>
          <v-text-field
            v-model="responsable"
            label="Responsable"
            required
          ></v-text-field>
          <v-textarea
            v-model="descripcion"
            label="Descripción"
            required
            rows="10"
            auto-grow
            class="descripcion-textarea"
          ></v-textarea>
          <v-switch
            v-model="ejecucion"
            label="Ejecución"
          ></v-switch>
          <v-text-field
            v-model="nombrefuncion"
            label="Nombre de la función"
            required
          ></v-text-field><!-- Aquí va el contenido del diálogo para crear test -->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogCrearTest = false">Cerrar</v-btn>
          <v-btn color="blue darken-1" text @click="crearTest">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogCrearPrototipo" max-width="1000px">
      <v-card>
        <v-card-title>Crear Prototipo</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="nombreprototipo"
            label="Nombre del prototipo"
            required
          ></v-text-field><!-- Aquí va el contenido del diálogo para crear prototipo -->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogCrearPrototipo = false">Cerrar</v-btn>
          <v-btn color="blue darken-1" text @click="crearPrototipo">Guardar</v-btn>
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
      dialogAnadirTest: false,
      dialogCrearTest: false,
      dialogCrearPrototipo: false,
      nombreTest: '',
      norma: '',
      origen: '',
      metodo: '',
      tipo: '',
      responsable: '',
      descripcion: '',
      tabla: [
        {
          name: 'Protocolo Validacion HW',
          calories: 'No ejecutado',
          fat: '',
          carbs: 'Test I+D',
          protein: 'Prueba',
          iron: 'Electrico',
          responsable: 'HW',
          glutenfree: true,
          ejecutarestado: false
        },
        {
          name: 'Validacion Componentes',
          calories: 'No ejecutado',
          fat: '',
          carbs: 'Test I+D',
          protein: 'Inspeccion',
          iron: 'Mecánico',
          responsable: 'Mecánico',
          glutenfree: true,
          ejecutarestado: true
        },
        {
          name: 'Programación microcontrolador',
          calories: 'No ejecutado',
          fat: '',
          carbs: 'Test I+D',
          protein: 'Prueba',
          iron: 'Electrico',
          responsable: 'HW',
          glutenfree: true,
          ejecutarestado: true
        },
        {
          name: 'Programación microcontrolador ICSP',
          calories: 'No ejecutado',
          fat: '',
          carbs: 'Test I+D',
          protein: 'Prueba',
          iron: 'Electrico',
          responsable: 'HW',
          glutenfree: true,
          ejecutarestado: true
        },
        {
          name: 'Programación microcontrolador JTGA',
          calories: 'No Aplica',
          fat: '',
          carbs: 'Test I+D',
          protein: 'Prueba',
          iron: 'Electrico',
          responsable: 'HW',
          glutenfree: true,
          ejecutarestado: true
        }
      ],
      headers: [
        {
          text: 'Requisito/Tests',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'N.A./N.Ejec./Ejec.', value: 'calories' },
        { text: 'Norma', value: 'fat' },
        { text: 'Origen', value: 'carbs' },
        { text: 'Metodo', value: 'protein' },
        { text: 'Tipo', value: 'iron' },
        { text: 'Responsable', value: 'responsable' },
        { text: 'OK/FAIL', value: 'glutenfree' },
        { text: 'Actions', value: 'actions', sortable: false },
        { text: 'Ejecutar', value: 'ejecutar', sortable: false }
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
      ejecucion: false,
      nombrefuncion: '',
      nombreprototipo: '',
      tests: ['prueba', 'prueba2', 'prueba3'],
      testSeleccionado: '',
      prototipos: ['prueba', 'prueba2', 'prueba3'],
      prototipoSeleccionado: '',
      dialogEditarTest: false,
      dialogEliminarTest: false
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
    funcionEditarTest(item) {
      this.dialogEditarTest = true
      this.norma = item.norma
      this.origen = item.origen
      this.metodo = item.metodo
      this.tipo = item.tipo
      this.responsable = item.responsable
      this.descripcion = item.descripcion
      this.ejecucion = item.ejecucion
      this.nombrefuncion = item.nombrefuncion
    },
    abrirDialogEliminarTest(item) {
      this.dialogEliminarTest = true
      this.nombre = item.nombre
    },
    crearTest() {
      this.dialogCrearTest = false
      axios
        .post('http://localhost:8000/crear_test', {
          nombre: this.nombreTest,
          norma: this.norma,
          origen: this.origen,
          metodo: this.metodo,
          tipo: this.tipo,
          responsable: this.responsable,
          descripcion: this.descripcion,
          ejecutarestado: this.ejecucion,
          nombrefuncion: this.nombrefuncion,
          prototipo: this.prototipoSeleccionado
        })
        .then(response => {
          console.log('Test creado:', response.data)
        })
        .catch(error => {
          console.error('Error al crear el test:', error)
        })
    },
    crearPrototipo() {
      this.dialogCrearPrototipo = false
      axios
        .post('http://localhost:8000/crear_prototipo', {
          nombre: this.nombreprototipo
        })
        .then(response => {
          console.log('Prototipo creado:', response.data)
        })
        .catch(error => {
          console.error('Error al crear el prototipo:', error)
        })
    },
    eliminarTest() {
      this.dialogEliminarTest = false
      axios
        .post('http://localhost:8000/eliminar_test', {
          nombre: this.nombreTest,
          itemprototipo: this.prototipoSeleccionado
        })
        .then(response => {
          console.log('Test eliminado:', response.data)
        })
        .catch(error => {
          console.error('Error al eliminar el test:', error)
        })
    },
    guardarEdicionTest() {
      this.dialogEditarTest = false
      axios
        .post('http://localhost:8000/editar_test', {
          nombre: this.nombreTest,
          norma: this.norma,
          origen: this.origen,
          metodo: this.metodo,
          tipo: this.tipo,
          responsable: this.responsable,
          descripcion: this.descripcion,
          ejecutarestado: this.ejecucion,
          nombrefuncion: this.nombrefuncion
        })
        .then(response => {
          console.log('Test editado:', response.data)
        })
        .catch(error => {
          console.error('Error al editar el test:', error)
        })
    },
    ejecutarTest(item) {
      console.log('Ejecutando test:', item.name)
      axios.get(`http://localhost:8000/ejecutar_test/${item.name}`)
        .then(response => {
          console.log('Resultado de la ejecución:', response.data)
          // Aquí puedes manejar la respuesta, por ejemplo, actualizando el estado del test
        })
        .catch(error => {
          console.error('Error al ejecutar el test:', error)
        })
    },
    anadirTest() {
      this.dialogAnadirTest = false
      axios
        .post('http://localhost:8000/anadir_test', {
          nombre: this.nombreTest,
          itemprototipo: this.prototipoSeleccionado
        })
        .then(response => {
          console.log('Test añadido:', response.data)
        })
        .catch(error => {
          console.error('Error al añadir el test:', error)
        })
    },
    modificar_tabla_tests(itemprototipoSeleccionado) {
      axios.get(`http://localhost:8000/obtener_tabla_tests/${itemprototipoSeleccionado}`)
        .then(response => {
          this.tabla = response.data
          console.log('tabla cargada:', this.tabla)
        })
        .catch(error => {
          console.error('Error al cargar de tabla:', error)
        })
    },
    initialize () {
    }
  },
  mounted () {
  }
}
</script>
<style>
</style>
