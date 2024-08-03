<template>
  <div>
    <v-file-input
    v-model="files"
    label="Resumen de la reunion"
    placeholder="Archivo"
    prepend-icon="mdi-paperclip"
    multiple
  >
  </v-file-input>
      <v-card-actions>
          <v-spacer></v-spacer>
          <v-col class="text-center" cols="12">
          <v-btn
            color="primary"
            flat
            @click=enviar()
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
            autocomplete="email"
            label="Resumen"
          ></v-textarea>
        </v-container>
      </v-card-actions>
  </div>
  </div>
</template>
<script>
import * as d3 from 'd3'
export default {
  methods: {
    enviar() {
      this.message = 'You clicked the button!'
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
