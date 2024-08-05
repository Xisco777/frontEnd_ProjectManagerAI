<template>
  <div>
        <v-textarea
          v-model="file"
          autocomplete="on"
          label="Resumen de la reunion"
        ></v-textarea>
      <v-card-actions>
          <v-spacer></v-spacer>
          <v-col class="text-center" cols="12">
          <v-btn
            color="primary"
            flat
            @click=enviarScriptReunion()
          >
            Enviar
          </v-btn>
        </v-col>
      </v-card-actions>
      <div>
      <v-card-actions>
          <v-spacer></v-spacer>
          <v-container fluid>
          <v-textarea
            v-model="resumenReunion"
            autocomplete="off"
            label="Resumen"
            readonly
          ></v-textarea>
        </v-container>
      </v-card-actions>
  </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      file: null,
      resumenReunion: ''
    }
  },
  methods: {
    enviarScriptReunion() {
      if (this.file) {
        axios
          .get(`http://localhost:8000/resumenReunion`, {
            params: {
              path: this.file
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
    }
  }
}

</script>
<style>
</style>
