<template>
  <div>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card class="pa-4">
            <v-card-text>
              <v-form @submit.prevent="enviarConsulta">
                <v-text-field
                  v-model="nombreBBDD"
                  label="Documento Descripcion de Diseño HW"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="api_open_ai_key"
                  label="Normativa Aplicable (Optional)"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="api_open_ai_key"
                  label="Especificaciones del sistema (Optional)"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="api_open_ai_key"
                  label="Documentacion Adicional (Optional)"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="api_open_ai_key"
                  label="Template documento Salida (Optional)"
                  required
                ></v-text-field>
                <v-textarea
                  v-model="consulta"
                  label="Añadir consideraciones a tener en cuenta (Optional)"
                  rows="3"
                  required
                ></v-textarea>
                <v-text-field
                  v-model="pythonFilePath"
                  label="Ruta salida documento"
                  required
                ></v-text-field>
                <v-row align="center" justify="space-around">
                  <v-btn type="submit" color="primary" class="mt-4">
                  GENERAR DOCUMENTO DE PROCEDIMINETO DE TEST FUNCIONALES
                </v-btn>
                </v-row>
                <v-row align="center" justify="space-around">
                  <v-btn type="submit" color="primary" class="mt-4">
                  GENERAR DOCUMENTO DE PROCEDIMINETO DE TEST CALIFICACION
                </v-btn>
                </v-row>
                <v-row align="center" justify="space-around">
                  <v-btn type="submit" color="primary" class="mt-4">
                  GENERAR DOCUMENTO DE PROCEDIMINETO DE TEST PRODUCCION
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
