<template>
  <div>
    <v-file-input
    v-model="files"
    label="Ruta de archivos a cargar"
    placeholder="Ruta"
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
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="Dessert name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.calories"
                      label="Calories"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.fat"
                      label="Fat (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.carbs"
                      label="Carbs (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.protein"
                      label="Protein (g)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
  <v-spacer></v-spacer>
      <v-row
        align="center"
        justify="space-around"
      >
      <v-btn
            color="primary"
            flat
            @click=enviar()
          >
            RECARGAR LISTA
          </v-btn>
          <v-btn
            color="primary"
            flat
            @click=enviar()
          >
            CHECKEAR DOCUMENTACION DUPLICADA
          </v-btn>
          <v-checkbox
        v-model="terms"
        color="secondary"
        label="RECARGA AUTOMATICA (CADA 10 MINUTOS)"
      ></v-checkbox>
      </v-row>
        <div>
      <v-card-actions>
          <v-spacer></v-spacer>
          <v-container fluid>
          <v-textarea
            autocomplete="email"
            label="Introduce pregunta para buscar en la documentacion"
          ></v-textarea>
        </v-container>
      </v-card-actions>
      <v-spacer></v-spacer>
          <v-col class="text-center" cols="12">
          <v-btn
            color="primary"
            flat
            @click=enviar()
          >
            CONSULTAR
          </v-btn>
        </v-col>
  </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Nombre Documento',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Tipo Documento', value: 'tipo' },
        { text: 'Fecha Modificación', value: 'fecha' },
        { text: 'Ruta', value: 'ruta' },
        { text: 'Acciones', value: 'actions', sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        tipo: '',
        fechamodificacion: '',
        path: ''
      },
      defaultItem: {
        name: '',
        tipo: '',
        fechamodificacion: '',
        path: ''
      },
      archivos: [
        {
          name: 'ProjectManagerIA.docx',
          tipo: '.docx',
          fechamodificacion: '2023-08-15 07:51:19',
          path: 'ProjectManagerIA.docx'
        },
        {
          name: '222.docx',
          tipo: '.docx',
          fechamodificacion: '2023-08-15 07:51:19',
          path: '222.docx'
        }
      ]
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
    enviar() {
      this.message = 'You clicked the button!'
    },
    initialize () {
      this.desserts = [
        {
          name: 'ProjectManagerIA.docx',
          tipo: '.docx',
          fecha: '23-08-15 07:51:19',
          ruta: 'ProjectManagerIA.docx'
        },
        {
          name: 'ProjectManagerIA.docx',
          tipo: '.docx',
          fecha: '23-08-15 07:51:19',
          ruta: 'ProjectManagerIaaaaA.docx'
        }
      ]
    },
    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    }
  },
  mounted () {
  }
}
</script>
<style>
</style>
