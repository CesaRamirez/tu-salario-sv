<template lang="html">

<div>
    <v-container>
        <v-card class="elevation-9">
            <v-card-title v-if="selected.length === 0">
                <p class="subheading ml-4">Tabla de Renta Mensual</p>
                <v-spacer></v-spacer>
                <v-text-field append-icon="search" label="Buscar" single-line hide-details v-model="search_mensual"></v-text-field>
            </v-card-title>
            <v-card-title v-else class="blue">
                <span class="subheading ml-5 my-3">
                  {{ selected.length }} {{ selected.length | pluralize('Seleccionado')}}
              </span>
                <v-spacer></v-spacer>
                <v-tooltip top>
                    <v-btn icon slot="activator" v-show="selected.length === 1" @click="edit">
                        <v-icon>create</v-icon>
                    </v-btn>
                    <span>Editar</span>
                </v-tooltip>
            </v-card-title>
            <v-data-table :headers="headers_x" :items="items_mensual" :search="search_mensual" v-model="selected" selected-key="id" select-all rows-per-page-text="Registros por Página" no-data-text="No se encontraron resultados" class="elevation-2">
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
            <v-card-title v-if="selected.length === 0">
                <p class="subheading ml-4">Tabla de Renta Quincenal</p>
                <v-spacer></v-spacer>
                <v-text-field append-icon="search" label="Buscar" single-line hide-details v-model="search_quincenal"></v-text-field>
            </v-card-title>
            <v-card-title v-else class="blue">
                <span class="subheading ml-5 my-3">
                  {{ selected.length }} {{ selected.length | pluralize('Seleccionado')}}
              </span>
                <v-spacer></v-spacer>
                <v-tooltip top>
                    <v-btn icon slot="activator" v-show="selected.length === 1" @click="edit">
                        <v-icon>create</v-icon>
                    </v-btn>
                    <span>Editar</span>
                </v-tooltip>
            </v-card-title>
            <v-data-table :headers="headers_x" :items="items_quincenal" :search="search_quincenal" v-model="selected" selected-key="id" select-all rows-per-page-text="Registros por Página" no-data-text="No se encontraron resultados" class="elevation-2">
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
                                <v-text-field label="Días" required v-model="bonus.days" type="number" :error-messages="_errors.collect('days')" v-validate="'required|numeric'" data-vv-name="days" hint="Días de Aguinaldo" persistent-hint>
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field label="Inicio (Años)" required type="number" :max="bonus.end" v-model="bonus.start" :error-messages="_errors.collect('start')" v-validate="`required|numeric|max_value:${this.bonus.end}`" data-vv-name="start" hint="Año de Inicio" persistent-hint>
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field label="Fin (Años)" required type="number" :min="bonus.start" v-model="bonus.end" :error-messages="_errors.collect('end')" v-validate="`required|numeric|min_value:${this.bonus.start}`" data-vv-name="end" hint="Año de Finalización" persistent-hint>
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
      selected: []
    }
  },
  mounted() {
    this.get(1)
    this.get(2)
  },
  computed: {
    ...mapGetters({
      items_quincenal: 'rent/rentQ',
      items_mensual: 'rent/rentM'
    })
  },
  methods: {
    ...mapActions({
      getRentTable: 'rent/getRentTable'
    }),
    get(_type) {
      this.getRentTable({
        type: _type
      }).then((response) => {})
    },
    edit() {

    }
  }
}
</script>
