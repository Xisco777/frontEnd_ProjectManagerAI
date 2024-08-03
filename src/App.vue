<template>
  <div id="app">
    <v-app  v-scroll:#scroll-target="onScroll">
      <router-view />
    <!-- Popup -->
    <v-dialog
      v-model="showPopup"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
        Introduce Modificaciones
        </v-card-title>

        <v-text-field label="Introducir texto" v-model="texto" />
        <v-file-input
    v-model="files"
    label="File input"
    placeholder="Upload your documents"
    prepend-icon="mdi-paperclip"
    multiple
  >
  </v-file-input>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click=sendMessage()
          >
            Modificar
          </v-btn>
          <v-btn
            color="secundary"
            flat
            @click=closePopup()
          >
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-app>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      hidden: false,
      offsetTop: 0,
      title: 'Hello Vue 3!',
      showPopup: false,
      popupMessage: '',
      texto: '',
      archivo: null,
      files: []
    }
  },
  mounted () {
    console.log('Introduction')
    window.addEventListener('keyup', this.handleKeyup)
  },
  beforeUnmount() {
    window.removeEventListener('keyup', this.handleKeyup)
  },
  methods: {
    scrollTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    onScroll (e) {
      this.offsetTop = e.target.scrollTop
      console.log(this.offsetTop)
    },
    sendMessage() {
      if (this.archivo) {
      }
      try {
        axios
          .get(`http://localhost:8000/modificar?texto=${encodeURIComponent(this.texto)}`)
      } catch (error) {
        console.error('Error al enviar el mensaje:', error)
      }
      this.showPopup = false
    },
    closePopup() {
      this.showPopup = false
    },
    handleKeyup(event) {
      if (event.ctrlKey && event.key === 'q') {
        this.showPopup = true
      }
    },
    onFileChange(event) {
      this.archivo = event.target.files[0]
    }
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html,
body,
#app {
  padding: 0 0;
  margin: 0 0;
}

.main {
  height: 100vh;
}

.cursor-pointer {
  cursor: pointer;
}

.text-align-center {
  text-align: center;
}

.text-align-left {
  text-align: left;
}

.container-border {
  border: 1px solid #eee;
}
</style>
