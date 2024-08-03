<template>
  <div>
    <p class="font-weight-black text-center">
      GESTIÓN BOM
    </p>
    <v-row
      align="center"
      justify="space-around"
    >
        <v-btn color="primary" @click="dialoguardar = true">
          GUARDAR BOM
        </v-btn>
        <v-btn color="primary" @click="dialogCargar = true">
          CARGAR BOM
        </v-btn>
    </v-row>
    <v-divider
      inset
      vertical
    ></v-divider>
    <v-dialog v-model="dialoguardar" max-width="700px">
      <v-card>
        <v-card-title>
          <span class="text-h5">GUARDAR BOM</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="bomPath"
                  label="Path"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="projectName"
                  label="Nombre del Proyecto"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialoguardar = false">SALIR</v-btn>
          <v-btn color="blue darken-1" text @click="cargarBOM">GUARDAR</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogCargar" max-width="700px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Cargar BOM</span>
        </v-card-title>
        <v-select
          :items="BOMs"
          label="Standard"
          dense
        ></v-select>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogCargar = false">Salir</v-btn>
          <v-btn color="blue darken-1" text @click="cargarBOM">Cargar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-data-table
      :headers="headers"
      :items="archivos"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>BOM</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialogResumen" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">
                Resumen Datasheet
              </v-card-title>
              <div class="text-overline mb-4">
                hacerrr
              </div>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeResumen">
                  SALIR
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="datasheet(item)">
          mdi-file
        </v-icon>
        <v-icon small @click="Resumen(item)">
          mdi-book-plus
        </v-icon>
      </template>
    </v-data-table>
    <v-divider
      inset
      vertical
    ></v-divider>
    <v-row
      align="center"
      justify="space-around"
    >
      <v-btn color="primary" @click="altenativo">
        ANALISIS ALTERNATIVO
      </v-btn>
      <v-btn color="primary" @click="analizarObsolescencia">
        ANALISIS OBSOLECENCIA
      </v-btn>
      <v-checkbox
        v-model="autoAnalisisObsolescencia"
        color="secondary"
        label="ANALISIS OBSOLECENCIA AUTOMATICO (CADA DIA)"
      ></v-checkbox>
    </v-row>
    <v-divider
      inset
      vertical
    ></v-divider>
    <p class="font-weight-black text-center">
      Alternativo
    </p>
    <v-divider
      inset
      vertical
    ></v-divider>
    <v-data-table
    :headers="headersalternativo"
    :items="alternativo"
    :items-per-page="5"
    item-key="name"
    class="elevation-1"
    :footer-props="{
      showFirstLastPage: true,
      firstIcon: 'mdi-arrow-collapse-left',
      lastIcon: 'mdi-arrow-collapse-right',
      prevIcon: 'mdi-minus',
      nextIcon: 'mdi-plus'
    }"
  ></v-data-table>

  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      dialogCargar: false,
      dialoguardar: false,
      BOMs: ['ST-TT2-RS2', 'ST-TT2-RS3', 'ST-TT3-RS2', 'ST-TT4-RS2'],
      path: '',
      dialogResumen: false,
      headersalternativo: [
        {
          text: 'Componente Original',
          align: 'start',
          sortable: false,
          value: 'Componente'
        },
        { text: 'Alternativo', value: 'Alternativo' }
      ],
      headers: [
        {
          text: 'PartNumber',
          align: 'start',
          sortable: false,
          value: 'PartNumber'
        },
        { text: 'Description', value: 'Description' },
        { text: 'Quantity', value: 'Quantity' },
        { text: 'Manufacturer', value: 'Manufacturer' },
        { text: 'Supplier', value: 'Supplier' },
        { text: 'SupplierPartNumber', value: 'SupplierPartNumber' },
        { text: 'Acciones', value: 'actions', sortable: false }
      ],
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
      alternativo: [],
      archivos: [
        {
          PartNumber: `C0805C104K5RACTU`,
          Description: `Capacitor, 0.1uF, 50V, X7R`,
          Quantity: 10,
          Manufacturer: `Kemet`,
          Supplier: `Digi-Keyv`,
          SupplierPartNumber: `399-1164-1-ND`,
          pathdatasheet: `https://www.kemet.com/Lists/ProductCatalog/Attachments/273/KEM_C104K5RAC.pdf`
        },
        {
          PartNumber: `R0603JR-07330RL`,
          Description: `Resistor, 330 Ohm, 1%, 0603`,
          Quantity: 20,
          Manufacturer: `Yageo`,
          Supplier: `Mouser`,
          SupplierPartNumber: `603-R0603JR07330RL`,
          pathdatasheet: `https://www.yageo.com/documents/recent/R0603%20-%20R07.pdf`
        },
        {
          PartNumber: `LM358N`,
          Description: `Op-Amp, Dual, 32V`,
          Quantity: 5,
          Manufacturer: `Texas Instruments`,
          Supplier: `Arrow`,
          SupplierPartNumber: `LM358N-ND`,
          pathdatasheet: `https://www.ti.com/lit/ds/symlink/lm358.pdf`
        },
        {
          PartNumber: `SS14`,
          Description: `Schottky Diode, 1A, 40V`,
          Quantity: 8,
          Manufacturer: `ON Semiconductor`,
          Supplier: `Newark`,
          SupplierPartNumber: `SS14-E3/61T`,
          pathdatasheet: `https://www.onsemi.com/pdf/datasheet/ss14-d.pdf`
        },
        {
          PartNumber: `LED-RED-5MM`,
          Description: `LED, Red, 5mm, 2V`,
          Quantity: 15,
          Manufacturer: `Kingbright`,
          Supplier: `RS Components`,
          SupplierPartNumber: `L-53SRC-D`,
          pathdatasheet: `https://www.kingbrightusa.com/images/catalog/spec/LED.pdf`
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
    dialogDelete (val) {
      val || this.closeResumen()
    }
  },

  created () {
    this.initialize()
  },
  methods: {
    enviar() {
      try {
        axios
          .get(`http://localhost:8000/enviarpath?path=${encodeURIComponent(this.path)}`)
      } catch (error) {
        console.error('Error al enviar el mensaje:', error)
      }
    },
    initialize () {
      this.alternativo = [
        {
          Componente: `C0805C104K5RACTU`,
          Alternativo: `GRM21BR71H104KA01L`
        },
        {
          Componente: `R0603JR-07330RL`,
          Alternativo: `RC0603FR-07330RL`
        },
        {
          Componente: `LM358N`,
          Alternativo: `MCP6002-I/P`
        },
        {
          Componente: `SS14`,
          Alternativo: `1N5819`
        },
        {
          Componente: `LED-RED-5MM`,
          Alternativo: `LTL-307EE`
        }
      ]
      this.archivos = [
        {
          PartNumber: `C0805C104K5RACTU`,
          Description: `Capacitor, 0.1uF, 50V, X7R`,
          Quantity: 10,
          Manufacturer: `Kemet`,
          Supplier: `Digi-Keyv`,
          SupplierPartNumber: `399-1164-1-ND`,
          pathdatasheet: `https://www.kemet.com/Lists/ProductCatalog/Attachments/273/KEM_C104K5RAC.pdf`
        },
        {
          PartNumber: `R0603JR-07330RL`,
          Description: `Resistor, 330 Ohm, 1%, 0603`,
          Quantity: 20,
          Manufacturer: `Yageo`,
          Supplier: `Mouser`,
          SupplierPartNumber: `603-R0603JR07330RL`,
          pathdatasheet: `https://www.yageo.com/documents/recent/R0603%20-%20R07.pdf`
        },
        {
          PartNumber: `LM358N`,
          Description: `Op-Amp, Dual, 32V`,
          Quantity: 5,
          Manufacturer: `Texas Instruments`,
          Supplier: `Arrow`,
          SupplierPartNumber: `LM358N-ND`,
          pathdatasheet: `https://www.ti.com/lit/ds/symlink/lm358.pdf`
        },
        {
          PartNumber: `SS14`,
          Description: `Schottky Diode, 1A, 40V`,
          Quantity: 8,
          Manufacturer: `ON Semiconductor`,
          Supplier: `Newark`,
          SupplierPartNumber: `SS14-E3/61T`,
          pathdatasheet: `https://www.onsemi.com/pdf/datasheet/ss14-d.pdf`
        },
        {
          PartNumber: `LED-RED-5MM`,
          Description: `LED, Red, 5mm, 2V`,
          Quantity: 15,
          Manufacturer: `Kingbright`,
          Supplier: `RS Components`,
          SupplierPartNumber: `L-53SRC-D`,
          pathdatasheet: `https://www.kingbrightusa.com/images/catalog/spec/LED.pdf`
        }
      ]
    },
    datasheet (item) {

    },

    Resumen (item) {
      this.dialogResumen = true
    },

    closeResumen () {
      this.dialogResumen = false
    }

  },
  mounted () {
  }
}
</script>
<style>
</style>
