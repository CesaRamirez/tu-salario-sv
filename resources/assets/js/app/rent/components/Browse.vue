<template lang="html">

<div>
    <v-container>
        <v-card class="elevation-9">
            <v-card-title v-if="selected_mensual.length === 0">
                <p class="subheading ml-4">Tabla de Renta Mensual</p>
                <v-spacer></v-spacer>
                <v-text-field append-icon="search" label="Buscar" single-line hide-details v-model="search_mensual"></v-text-field>
            </v-card-title>
            <v-card-title v-else class="blue">
                <span class="subheading ml-5 my-3">
                  {{ selected_mensual.length }} {{ selected_mensual.length | pluralize('Seleccionado')}}
              </span>
                <v-spacer></v-spacer>
                <v-tooltip top>
                    <v-btn icon slot="activator" v-show="selected_mensual.length === 1" @click="edit(selected_mensual)">
                        <v-icon>create</v-icon>
                    </v-btn>
                    <span>Editar</span>
                </v-tooltip>
            </v-card-title>
            <v-data-table :headers="headers_x" :items="items_mensual" :search="search_mensual" v-model="selected_mensual" selected-key="id" select-all rows-per-page-text="Registros por Página" no-data-text="No se encontraron resultados" class="elevation-2">
                <template slot="items" slot-scope="props">
                    <td>
                        <v-checkbox primary hide-details v-model="props.selected"></v-checkbox>
                    </td>
                    <td>{{ props.item.section_for_humans }}</td>
                    <td class="text-xs-right">{{ props.item.since }}</td>
                    <td class="text-xs-right">{{ props.item.until_for_humans }}</td>
                    <td class="text-xs-right">{{ props.item.percentage_for_humans }}</td>
                    <td class="text-xs-right">{{ props.item.excess }}</td>
                    <td class="text-xs-right">{{ props.item.fee }}</td>
                </template>
            </v-data-table>
        </v-card>

        <v-card class="mt-4 elevation-9">
            <v-card-title v-if="selected_quincenal.length === 0">
                <p class="subheading ml-4">Tabla de Renta Quincenal</p>
                <v-spacer></v-spacer>
                <v-text-field append-icon="search" label="Buscar" single-line hide-details v-model="search_quincenal"></v-text-field>
            </v-card-title>
            <v-card-title v-else class="blue">
                <span class="subheading ml-5 my-3">
                  {{ selected_quincenal.length }} {{ selected_quincenal.length | pluralize('Seleccionado')}}
              </span>
                <v-spacer></v-spacer>
                <v-tooltip top>
                    <v-btn icon slot="activator" v-show="selected_quincenal.length === 1" @click="edit(selected_quincenal)">
                        <v-icon>create</v-icon>
                    </v-btn>
                    <span>Editar</span>
                </v-tooltip>
            </v-card-title>
            <v-data-table :headers="headers_x" :items="items_quincenal" :search="search_quincenal" v-model="selected_quincenal" selected-key="id" select-all rows-per-page-text="Registros por Página" no-data-text="No se encontraron resultados" class="elevation-2">
                <template slot="items" slot-scope="props">
                    <td>
                        <v-checkbox primary hide-details v-model="props.selected"></v-checkbox>
                    </td>
                    <td>{{ props.item.section_for_humans }}</td>
                    <td class="text-xs-right">{{ props.item.since }}</td>
                    <td class="text-xs-right">{{ props.item.until_for_humans }}</td>
                    <td class="text-xs-right">{{ props.item.percentage_for_humans }}</td>
                    <td class="text-xs-right">{{ props.item.excess }}</td>
                    <td class="text-xs-right">{{ props.item.fee }}</td>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">Editar Opciones de Tabla de Renta</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm6 md4>
                                <v-text-field label="Sección" required v-model="rent.section_for_humans" disabled hint="Sección" persistent-hint>
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field label="Desde" required type="number" :max="rent.since" v-model="rent.since" :error-messages="_errors.collect('since')" v-validate="`required|decimal|max_value:${this.rent.until}`" data-vv-name="since" hint="Desde Monto" persistent-hint>
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field label="Hasta" required type="number" :min="rent.until" v-model="rent.until" :error-messages="_errors.collect('until')" v-validate="`required|decimal|min_value:${this.rent.since}|max_value:${this.next_rent.since}`" data-vv-name="until" hint="Hasta Monto" persistent-hint>
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field label="% a Aplicar" required v-model="rent.percentage" :error-messages="_errors.collect('percentage')" v-validate="`required|decimal`" data-vv-name="percentage" hint="Porcentaje a Aplicar" persistent-hint>
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field label="Sobre el Exceso" required type="number" :max="rent.excess" v-model="rent.excess" :error-messages="_errors.collect('excess')" v-validate="`required|decimal`" data-vv-name="excess" hint="Sobre el Exceso" persistent-hint>
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field label="Cuota Fija" required type="number" :min="rent.fee" v-model="rent.fee" :error-messages="_errors.collect('fee')" v-validate="`required|decimal`" data-vv-name="fee" hint="Cuota Fija" persistent-hint>
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <small>*Indica campos obligatorios</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="clear">Cerrar</v-btn>
                    <v-btn color="blue darken-1" flat @click="update">Guardar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</div>

</template>

<script>
import {
  mapActions,
  mapGetters
}
from 'vuex'
import collect from 'collect.js'
export default {
  data() {
    return {
      search_mensual: '',
      search_quincenal: '',
      headers_x: [{
        text: 'Tramo',
        align: 'left',
        sortable: false,
        value: 'section'
      }, {
        text: 'Desde',
        value: 'since'
      }, {
        text: 'Hasta',
        value: 'until'
      }, {
        text: '% a Aplicar',
        value: 'percentage'
      }, {
        text: 'Sobre el Exceso',
        value: 'excess'
      }, {
        text: 'Mas Cuota Fija de',
        value: 'fee'
      }, ],
      selected_mensual: [],
      selected_quincenal: [],
      dialog: false,
      next_rent: {}
    }
  },
  mounted() {
    this.get(1)
    this.get(2)
  },
  computed: {
    ...mapGetters({
      items_quincenal: 'rent/rentQ',
      items_mensual: 'rent/rentM',
      rent: 'rent/rent'
    })
  },
  methods: {
    ...mapActions({
      getRentTable: 'rent/getRentTable',
      getRent: 'rent/getRent',
      updateRent: 'rent/updateRent'
    }),
    get(_type) {
      this.getRentTable({
        type: _type
      }).then((response) => {})
    },
    edit(selected) {
      this.getRent({
        id: selected[0].id
      }).then((response) => {
        this.next()
        this.dialog = true
      })
    },
    update() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.updateRent({
            payload: {
              since: this.rent.since,
              until: this.rent.until,
              percentage: this.rent.percentage,
              excess: this.rent.excess,
              fee: this.rent.fee,
              type: this.rent.type
            },
            context: this,
            id: this.rent.id
          }).then(() => {
            this.get(1)
            this.get(2)
            this.dialog = false
          }).catch((err) => {})
        }

        return
      });
    },
    clear() {
      this.$validator.reset()
      this.dialog = false
    },
    next() {
      if (this.rent.type == 1) {
        var r = collect(this.items_mensual)
      } else if (this.rent.type == 2) {
        var r = collect(this.items_quincenal)
      }
      if (this.rent.section == 4) {
        this.next_rent = {
          since: "9999999999"
        }
      } else {
        this.next_rent = r.where('section', parseInt(this.rent.section) + 1).first()
      }
    }
  }
}
</script>
