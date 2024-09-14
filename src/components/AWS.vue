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
                  v-model="consulta"
                  label="Descripción del proceso"
                  rows="20"
                  required
                  no-resize
                ></v-textarea>
                  <v-textarea
                  class="pa-4"
                  background-color="grey lighten-2"
                  v-model="consulta"
                  label="Codigo a Ejecutar"
                  rows="20"
                  required
                  no-resize
                ></v-textarea>
                </v-row>
                <v-textarea
                  v-model="consulta"
                  label="Descripcion en Lenguaje Natural del Servicio AWS que se desea"
                  rows="5"
                  required
                  no-resize
                ></v-textarea>

                <v-row align="center" justify="space-around">
                  <v-btn type="submit" color="primary" class="mt-4">
                  CONSULTAR/MODIFICACION
                  </v-btn>
                  <v-btn type="submit" color="primary" class="mt-4">
                  EJECUTAR
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
      api_open_ai_key: ''
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
