<template lang="html">
    <div>
        <v-card>
            <v-card-title>
              <span class="title">Configuraciones</span>
              <v-spacer></v-spacer>
              <v-text-field
                append-icon="search"
                label="Buscar"
                single-line
                hide-details
                v-model="search"
              ></v-text-field>
            </v-card-title>
                <v-data-table
                  :headers="headers"
                  :items="items"
                  :search="search"
                  :loading="loading"
                  v-model="selected"
                  selected-key="id"
                  select-all
                  rows-per-page-text="Registros por Página"
                  no-data-text="No se encontraron resultados"
                  class="elevation-2">
                    <template slot="headerCell" slote-scope="props">
                      <span v-tooltip:bottom="{ 'html': props.header.tooltip }">
                        {{ props.header.text }}
                      </span>
                    </template>
                <template slot="items" slote-scope="props">
                    <td>
                        <v-checkbox
                        class="text-left"
                        primary
                        hide-details
                        v-model="props.selected"
                        ></v-checkbox>
                    </td>
                    <td class="text-xs-left">{{ props.item.key }}</td>
                    <td class="text-xs-left">{{ props.item.description }}</td>
                    <td class="text-xs-left">{{ props.item.value }}</td>
                </template>
              </v-data-table>
        </v-card>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

    export default {
        data () {
            return {
                search: '',
                headers: [
                  { text: 'Llave', value: 'key', align: 'left', tooltip: 'Llave identificadora' },
                  { text: 'Descripción', value: 'description', align: 'left', tooltip: 'Descripción de Llave' },
                  { text: 'Valor', value: 'value', align: 'left', tooltip: 'Valor de Llave' },
              ],
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
                getSettings : 'settings/getSettings'
            }),
            get() {
                this.loading = true
                this.getSettings()
                this.loading = false
            }
        }
     }
</script>
