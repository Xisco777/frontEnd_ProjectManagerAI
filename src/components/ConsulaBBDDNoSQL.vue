<template>
  <div>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card class="pa-4">
            <v-card-text>
              <v-form @submit.prevent="enviarConsulta">
                <v-text-field
                  v-model="connectionString"
                  label="String de Conexión"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="nombreBBDD"
                  label="Nombre de la BBDD"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="api_open_ai_key"
                  label="API key OpenAI"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="pythonFilePath"
                  label="Ruta del Archivo Python"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="dbDescriptionPath"
                  label="Ruta del Archivo de Descripción (opcional)"
                ></v-text-field>

                <v-textarea
                  v-model="consulta"
                  label="Consulta en Lenguaje Natural"
                  rows="3"
                  required
                ></v-textarea>

                <v-btn type="submit" color="primary" class="mt-4">
                  CONSULTAR
                </v-btn>
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
      // Este método se utiliza para cargar la configuración inicial del componente
      // Hace una petición GET a un servidor local en el puerto 8000
      axios
        .get('http://localhost:8000/get_datosConsultaBBDD')
        .then(response => {
          // Si la petición es exitosa, actualiza las propiedades del componente
          // con los datos recibidos del servidor
          this.connectionString = response.data.connectionString
          this.pythonFilePath = response.data.pythonFilePath
          this.api_open_ai_key = response.data.api_open_ai_key
          // Imprime en la consola los datos recibidos
          console.log('workspaces leídos:', response.data)
          // Aquí se podría agregar más lógica, como mostrar un mensaje de éxito
        })
        .catch(error => {
          // Si ocurre un error durante la petición, lo imprime en la consola
          console.error('Error en lectura de workspace:', error)
          // Aquí se podría agregar lógica para manejar el error, como mostrar un mensaje al usuario
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
