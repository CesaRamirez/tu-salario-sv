<template lang="html">

<div>
    <v-container>
        <v-card>
            <v-card-title>
                <p class="subheading ml-4">Tabla de Renta Mensual</p>
                <v-spacer></v-spacer>
                <v-text-field append-icon="search" label="Buscar" single-line hide-details v-model="search_mensual"></v-text-field>
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
        <v-card class="mt-4">
            <v-card-title>
                <p class="subheading ml-4">Tabla de Renta Quincenal</p>
                <v-spacer></v-spacer>
                <v-text-field append-icon="search" label="Buscar" single-line hide-details v-model="search_quincenal"></v-text-field>
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
</div>

</template>

<script>

import {
    mapActions
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
                items_mensual: [],
                items_quincenal: [],
                selected: []
            }
        },
        mounted() {
            this.getRentTable(1)
            this.getRentTable(2)
        },
        methods: {
            getRentTable(type) {
                axios.get('/api/v1/admin/rents/' + type + '/type')
                    .then((response) => {
                        if (type == 1) {
                            this.items_mensual = response.data.data
                        } else if (type == 2) {
                            this.items_quincenal = response.data.data
                        }
                    })
            }
        }
}

</script>
