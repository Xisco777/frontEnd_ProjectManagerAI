<template>
  <div>
    <v-file-input
    v-model="texto"
    label="Ruta del src del proyecto"
    placeholder="Ruta del src del proyecto"
    prepend-icon="mdi-paperclip"
    multiple
  >
  </v-file-input>
  <div>
      <v-card-actions>
          <v-spacer></v-spacer>
          <v-container fluid>
          <v-textarea
            autocomplete="email"
            label="Introduce modificaciones en el FW"
          ></v-textarea>
        </v-container>
      </v-card-actions>
  </div>
      <v-card-actions>
          <v-spacer></v-spacer>
          <v-col class="text-center" cols="12">
          <v-btn
            color="primary"
            flat
            @click=sendMessage()
          >
            Enviar
          </v-btn>
        </v-col>
      </v-card-actions>
  </div>
</template>
<script>
import * as d3 from 'd3'
import axios from 'axios'
export default {
  data () {
    return {
      texto: ''
    }
  },
  methods: {
    sendMessage() {
      if (this.archivo) {
      }
      try {
        axios
          .get(`http://localhost:8000/modificarFW?texto=${encodeURIComponent(this.texto)}`)
      } catch (error) {
        console.error('Error al enviar el mensaje:', error)
      }
      this.showPopup = false
    }
  },
  mounted () {
    let p = d3.select('body')
      .selectAll('p')

    p.text('Hello World')
  }
}
</script>
<style>
</style>
