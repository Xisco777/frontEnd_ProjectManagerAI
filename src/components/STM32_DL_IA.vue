<template>
  <div>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12">
          <v-card class="pa-4">
            <v-card-text>
              <v-form @submit.prevent="enviarConsulta">
                <v-row align="center" justify="space-around">
                  <v-textarea
                  class="pa-4"
                  background-color="grey lighten-2"
                  v-model="proceso"
                  :label="this.$vuetify.lang.t('$vuetify.stm32_dl_ia.mensaProcedo')"
                  rows="20"
                  required
                  no-resize
                ></v-textarea>
                  <v-textarea
                  class="pa-4"
                  background-color="grey lighten-2"
                  v-model="codigo"
                  :label="this.$vuetify.lang.t('$vuetify.stm32_dl_ia.mensajeCodigo')"
                  rows="20"
                  required
                  no-resize
                ></v-textarea>
                </v-row>
                <v-textarea
                  v-model="consulta"
                  :label="this.$vuetify.lang.t('$vuetify.stm32_dl_ia.mensajePrompt')"
                  rows="5"
                  required
                  no-resize
                ></v-textarea>
                <v-file-input
                  v-model="rutatscript"
                  :label="this.$vuetify.lang.t('$vuetify.stm32_dl_ia.mensajeRuta')"
                  placeholder="Archivo"
                  prepend-icon="mdi-paperclip"
                  multiple
                >
                </v-file-input>
                <v-row align="center" justify="space-around">
                  <v-btn type="submit" color="primary" class="mt-4">
                    {{ this.$vuetify.lang.t('$vuetify.stm32_dl_ia.consulta_modificacion') }}
                  </v-btn>
                  <v-btn type="submit" color="primary" class="mt-4">
                    {{ this.$vuetify.lang.t('$vuetify.stm32_dl_ia.entrenar') }}
                  </v-btn>
                  <v-btn type="submit" color="primary" class="mt-4">
                    {{ this.$vuetify.lang.t('$vuetify.stm32_dl_ia.aceptarModelo') }}
                  </v-btn>
                </v-row>
                <v-row align="center" justify="space-around">
                  <v-btn type="submit" color="primary" class="mt-4">
                    {{ this.$vuetify.lang.t('$vuetify.stm32_dl_ia.compilarC') }}
                  </v-btn>
                  <v-btn type="submit" color="primary" class="mt-4">
                    {{ this.$vuetify.lang.t('$vuetify.stm32_dl_ia.generarPrograma') }}
                  </v-btn>
                  <v-btn type="submit" color="primary" class="mt-4">
                    {{ this.$vuetify.lang.t('$vuetify.stm32_dl_ia.compilarFlasheo') }}
                  </v-btn>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      connectionString: '',
      pythonFilePath: '',
      dbDescriptionPath: '',
      consulta: '',
      nombreBBDD: '',
      api_open_ai_key: '',
      proceso: '',
      codigo: ''
    }
  },
  created () {
    this.cargarConfiguracion()
  },
  methods: {
    cargarConfiguracion() {
      axios
        .get('http://localhost:8000/get_datosConsultaBBDD')
        .then(response => {
          this.connectionString = response.data.connectionString
          this.pythonFilePath = response.data.pythonFilePath
          this.api_open_ai_key = response.data.api_open_ai_key
          console.log('workspaces leidas:', response.data)
          // ... (puedes agregar lógica adicional aquí, como mostrar un mensaje de éxito) ...
        })
        .catch(error => {
          console.error('Error en lectura de worskpace:', error)
          // ... (manejo de errores, como mostrar un mensaje al usuario) ...
        })
    },
    enviarConsulta() {
      const data = {
        connectionString: this.connectionString,
        pythonFilePath: this.pythonFilePath,
        dbDescriptionPath: this.dbDescriptionPath,
        consulta: this.consulta,
        nombreBBDD: this.nombreBBDD,
        api_open_ai_key: this.api_open_ai_key
      }

      axios
        .get('http://localhost:8000/ejecutarConsultaBBDDNoSQL', { params: data })
        .then((response) => {
          // Manejar la respuesta del backend (por ejemplo, mostrar un mensaje de éxito o los datos obtenidos).
          console.log(response.data)
        })
        .catch((error) => {
          // Manejar errores de la solicitud.
          console.error(error)
        })
    }
  }
}
</script>
