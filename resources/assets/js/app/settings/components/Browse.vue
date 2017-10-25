<template lang="html">

<div>
    <v-container>
        <v-card class="elevation-9">
            <v-card-title v-if="selected.length === 0">
                <p class="subheading ml-5 my-3">Configuraciones</p>
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
            <v-data-table :headers="headers" :items="items" :search="search" :loading="loading" v-model="selected" selected-key="id" select-all rows-per-page-text="Registros por Página" no-data-text="No se encontraron resultados" class="elevation-2">
                <template slot="items" slot-scope="props">
                    <td>
                        <v-checkbox class="text-left" primary hide-details v-model="props.selected"></v-checkbox>
                    </td>
                    <td class="text-xs-left">{{ props.item.key }}</td>
                    <td class="text-xs-left">{{ props.item.description }}</td>
                    <td class="text-xs-left">{{ props.item.value }}</td>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</div>

</template>

<script>

import {
    mapActions, mapGetters
}
from 'vuex'

export default {
    data() {
            return {
                search: '',
                headers: [{
                    text: 'Llave',
                    value: 'key',
                    align: 'left',
                    tooltip: 'Llave identificadora'
                }, {
                    text: 'Descripción',
                    value: 'description',
                    align: 'left',
                    tooltip: 'Descripción de Llave'
                }, {
                    text: 'Valor',
                    value: 'value',
                    align: 'left',
                    tooltip: 'Valor de Llave'
                }, ],
                loading: true,
                selected: []
            }
        },
        mounted() {
            this.get()
        },
        computed: {
            ...mapGetters({
                items: 'settings/settings'
            })
        },
        methods: {
            ...mapActions({
                    getSettings: 'settings/getSettings'
                }),
                get() {
                    this.loading = true
                    this.getSettings()
                    this.loading = false
                }
        }
}

</script>
