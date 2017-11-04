<template lang="html">

<div>
    <v-layout justify-center>
        <v-flex xs8 md8 lg8>
            <v-card class="card--flex-toolbar">
                <v-toolbar card prominent color="deep-purple" dark>
                  <v-layout wrap>
                    <v-flex xs10 md6 lg6>
                      <v-toolbar-title class="body-2">Días de pago de Aguinaldo</v-toolbar-title>
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-flex xs12 md4 lg4>
                      <v-text-field dark

                                    append-icon="search"
                                    label="Buscar"
                                    single-line
                                    hide-details
                                    color="cyan"
                                    v-model="search">
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                </v-toolbar>
                <v-data-table :headers="headers"
                              :items="items"
                              :search="search"
                              v-model="selected"
                              item-key="id"
                              no-data-text="No se encontraron resultados">
                    <template slot="items" slot-scope="props">
                        <td class="text-xs-center">{{ props.item.days }}</td>
                        <td class="text-xs-center">{{ props.item.start }}</td>
                        <td class="text-xs-center">{{ props.item.end }}</td>
                        <td class="text-xs-center">
                          <v-btn icon
                                 light
                                 @click="edit(props.item.id)">
                                 <v-icon>create</v-icon>
                          </v-btn>
                        </td>
                    </template>
                    <template slot="pageText" slot-scope="{ pageStart, pageStop, itemsLength }">
                        {{ pageStart }} - {{ pageStop }} de {{ itemsLength }}
                    </template>
                </v-data-table>
            </v-card>
        </v-flex>
    </v-layout>
    <v-fab-transition>
        <v-btn
          color="red"
          dark
          fab
          fixed
          bottom
          right
          v-show="selected.length === 1"
          @click="edit">
          <v-icon>create</v-icon>
        </v-btn>
    </v-fab-transition>
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
			headers: [ {
				text: 'Días',
				value: 'days',
				align: 'center'
                }, {
				text: 'Inicio (Años)',
				value: 'start',
				align: 'center'
                }, {
				text: 'Fin (Años)',
				value: 'end',
				align: 'center'
                }, {
				text: 'Herramientas',
				align: 'center'
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
		...mapGetters( {
			items: 'bonus/bonuses',
			bonus: 'bonus/bonus'
		} )
	},
	methods: {
		...mapActions( {
			getBonuses: 'bonus/getBonuses',
			getBonus: 'bonus/getBonus',
			updateBonus: 'bonus/updateBonus'
		} ),
		edit( id ) {
			this.getBonus( {
					id: id
				} )
				.then( ( response ) => {
					this.dialog = true
				} )
		},
		update() {
			this.$validator.validateAll()
				.then( ( result ) => {
					if ( result ) {
						this.updateBonus( {
								payload: {
									days: this.bonus.days,
									start: this.bonus.start,
									end: this.bonus.end
								},
								context: this,
								id: this.bonus.id
							} )
							.then( () => {
								this.getBonuses()
								this.dialog = false
							} )
							.catch( ( err ) => {} )
					}

					return
				} );
		},
		clear() {
			this.$validator.reset()
			this.dialog = false
		}
	}
}
</script>
