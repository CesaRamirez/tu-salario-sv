<template lang="html">

<div>
    <v-container>
        <v-card class="elevation-9">
            <v-card-title v-if="selected.length === 0">
                <span class="subheading ml-5 my-3">Días de pago de Aguinaldo</span>
                <v-spacer></v-spacer>
                <v-text-field append-icon="search" label="Buscar" single-line hide-details v-model="search"></v-text-field>
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
            <v-data-table :headers="headers" :items="items" :search="search" v-model="selected" item-key="id" select-all rows-per-page-text="Registros por Página" no-data-text="No se encontraron resultados">
                <template slot="items" slot-scope="props">
                    <td>
                        <v-checkbox hide-details v-model="props.selected"></v-checkbox>
                    </td>
                    <td class="text-xs-left">{{ props.item.days }}</td>
                    <td class="text-xs-left">{{ props.item.start }}</td>
                    <td class="text-xs-left">{{ props.item.end }}</td>
                </template>
            </v-data-table>
        </v-card>
        <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent max-width="500px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Editar Opciones de Aguinaldo</span>
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
    </v-container>
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
      search: '',
      headers: [{
        text: 'Días',
        value: 'days',
        align: 'left'
      }, {
        text: 'Inicio (Años)',
        value: 'start',
        align: 'left'
      }, {
        text: 'Fin (Años)',
        value: 'end',
        align: 'left'
      }, ],
      selected: [],
      dialog: false,
      days: null,
      start: null,
      end: null
    }
  },
  mounted() {
    this.getBonuses()
  },
  computed: {
    ...mapGetters({
      items: 'bonus/bonuses',
      bonus: 'bonus/bonus'
    })
  },
  methods: {
    ...mapActions({
      getBonuses: 'bonus/getBonuses',
      getBonus: 'bonus/getBonus',
      updateBonus: 'bonus/updateBonus'
    }),
    edit() {
      this.getBonus({
        id: this.selected[0].id
      }).then((response) => {
        this.dialog = true
      })
    },
    update() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.updateBonus({
            payload: {
              days: this.bonus.days,
              start: this.bonus.start,
              end: this.bonus.end
            },
            context: this,
            id: this.bonus.id
          }).then(() => {
            this.getBonuses()
            this.dialog = false
          }).catch((err) => {})
        }

        return
      });
    },
    clear() {
      this.$validator.reset()
      this.dialog = false
    }
  }
}
</script>
