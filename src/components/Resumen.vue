<template>
  <div>
    <v-card
          class="mx-auto"
          max-width="1200"
        >
        <v-container fluid>
        <v-card-title>{{ this.$vuetify.lang.t('$vuetify.resumen.titulocardresumen') }}</v-card-title>
        <v-textarea
          v-model="script"
          autocomplete="on"
          :label="this.$vuetify.lang.t('$vuetify.resumen.script')"
        ></v-textarea>
        <v-file-input
              v-model="rutatscript"
              :label="this.$vuetify.lang.t('$vuetify.resumen.rutascript')"
              placeholder="Archivo"
              prepend-icon="mdi-paperclip"
              multiple
            >
            </v-file-input>
          </v-container>
          </v-card>
          <v-divider inset  vertical></v-divider>
        <v-card
          class="mx-auto"
          max-width="1200"
          height="225"
        >
          <v-spacer></v-spacer>
          <v-container fluid>
          <v-textarea
            v-model="resumenReunion"
            autocomplete="off"
            label="Resumen"
            readonly
          ></v-textarea>
          <v-row
            align="center"
            justify="space-around"
          >
          <v-btn color="primary" flat @click=obtenerResumen()>
            {{ this.$vuetify.lang.t('$vuetify.resumen.resumen') }}
          </v-btn>
          <v-btn color="primary" flat @click=guardarResumen()>
            {{ this.$vuetify.lang.t('$vuetify.resumen.guardarResumen') }}
          </v-btn>
        </v-row>
        </v-container>
      </v-card>
      <v-divider inset  vertical></v-divider>
      <div>
        <v-row
            justify="space-around"
          >
          <v-col>
      <v-card
          class="mx-auto"
          max-width="600"
          height="120"
        >
          <v-spacer></v-spacer>
          <v-container fluid>
            <v-select
              v-model="selectwminuta"
              :items="minutas"
              :label="this.$vuetify.lang.t('$vuetify.resumen.templateminutas')"
            ></v-select>
          <v-row
            align="center"
            justify="space-around"
          >
          <v-btn color="primary" flat @click=crearMinutas()>
            {{ this.$vuetify.lang.t('$vuetify.resumen.minutas') }}
          </v-btn>
        </v-row>
        </v-container>
      </v-card>
    </v-col>
    <v-col>
      <v-card
          class="mx-auto"
          max-width="600"
          height="120"
        >
          <v-spacer></v-spacer>
          <v-container fluid>
            <v-text-field
                  v-model="promptanalisis"
                  :label="this.$vuetify.lang.t('$vuetify.resumen.promptanalisis')"
                  required
                ></v-text-field>
          <v-row
            align="center"
            justify="space-around"
          >
          <v-btn color="primary" flat @click=analisis()>
            {{ this.$vuetify.lang.t('$vuetify.resumen.analisis') }}
          </v-btn>
        </v-row>
        </v-container>
      </v-card>
    </v-col>
    </v-row>
    </div>
      <v-divider inset  vertical></v-divider>
      <div>
        <v-row
            justify="space-around"
          >
          <v-col>
      <v-card
          class="mx-auto"
          max-width="600"
          height="120"
        >
          <v-spacer></v-spacer>
          <v-container fluid>
            <v-select
              v-model="selectproyecto"
              :items="proyectos"
              :label="this.$vuetify.lang.t('$vuetify.resumen.proyectotareas')"
            ></v-select>
          <v-row
            align="center"
            justify="space-around"
          >
          <v-btn color="primary" flat @click=generarTareas()>
            {{ this.$vuetify.lang.t('$vuetify.resumen.tareas') }}
          </v-btn>
        </v-row>
        </v-container>
      </v-card>
    </v-col>
    <v-col>
      <v-card
          class="mx-auto"
          max-width="600"
          height="120"
        >
          <v-spacer></v-spacer>
          <v-container fluid>
            <v-text-field
                  v-model="seguimiento"
                  :label="this.$vuetify.lang.t('$vuetify.resumen.rutaseguimiento')"
                  required
                ></v-text-field>
          <v-row
            align="center"
            justify="space-around"
          >
          <v-btn color="primary" flat @click=seguimientoReunion()>
            {{ this.$vuetify.lang.t('$vuetify.resumen.seguimiento') }}
          </v-btn>
        </v-row>
        </v-container>
      </v-card>
      </v-col>
    </v-row>
  </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      script: null,
      resumenReunion: '',
      rutatemplateminutas: '',
      selectminutas: '',
      minutas: [],
      selectproyecto: '',
      proyectos: [],
      seguimiento: '',
      promptanalisis: '',
      rutatscript: ''
    }
  },
  methods: {
    obtenerResumen() {
      if (this.script) {
        axios
          .get(`http://localhost:8000/resumenReunion`, {
            params: {
              script: this.script,
              path: this.rutatscript
            }
          })
          .then(response => {
            this.resumenReunion = response.data.message
          })
          .catch(error => {
            console.error('Error al obtener el resumen:', error)
          })
      } else {
        console.error('Por favor, selecciona un archivo.')
      }
    },
    crearMinutas() {
      if (this.script) {
        axios
          .get(`http://localhost:8000/crearMinutas`, {
            params: {
              script: this.script,
              path: this.rutatscript,
              template: this.selectminutas
            }
          })
          .catch(error => {
            console.error('Error al obtener el resumen:', error)
          })
      } else {
        console.error('Por favor, selecciona un archivo.')
      }
    },
    analisis() {
      if (this.script) {
        axios
          .get(`http://localhost:8000/analisis`, {
            params: {
              script: this.script,
              path: this.rutatscript,
              promptanalisis: this.promptanalisis
            }
          })
          .then(response => {
            this.resumenReunion = response.data.message
          })
          .catch(error => {
            console.error('Error al obtener el resumen:', error)
          })
      } else {
        console.error('Por favor, selecciona un archivo.')
      }
    },
    generarTareas() {
      if (this.script) {
        axios
          .get(`http://localhost:8000/generarTareas`, {
            params: {
              script: this.script,
              path: this.rutatscript,
              selectproyecto: this.selectproyecto
            }
          })
          .catch(error => {
            console.error('Error al obtener el resumen:', error)
          })
      } else {
        console.error('Por favor, selecciona un archivo.')
      }
    },
    seguimientoReunion() {
      if (this.script) {
        axios
          .get(`http://localhost:8000/seguimientoReunion`, {
            params: {
              idseguimiento: this.seguimiento
            }
          })
          .catch(error => {
            console.error('Error al obtener el resumen:', error)
          })
      } else {
        console.error('Por favor, selecciona un archivo.')
      }
    }
  }
}

</script>
<style>
</style>
