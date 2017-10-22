<template lang="html">
    <div>
        <v-card>
            <v-card-title v-if="selected.length === 0">
              <span class="subheading ml-5 my-3">Días de pago de Aguinaldo</span>
              <v-spacer></v-spacer>
              <v-text-field
                append-icon="search"
                label="Buscar"
                single-line
                hide-details
                v-model="search"
              ></v-text-field>
            </v-card-title>
            <v-card-title v-else class="blue">
              <span class="subheading ml-5 my-3">
                  {{ selected.length }} {{ selected.length | pluralize('Seleccionado')}}
              </span>
              <v-spacer></v-spacer>
              <v-btn icon v-tooltip:left="{ html: 'Editar' }" v-show="selected.length === 1" @click="edit">
                  <v-icon>create</v-icon>
              </v-btn>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="items"
              :search="search"
              v-model="selected"
              selected-key="id"
              select-all
              rows-per-page-text="Registros por Página"
              no-data-text="No se encontraron resultados"
              class="elevation-2">
                <template slot="items" slot-scope="props">
                    <td>
                      <v-checkbox
                        primary
                        hide-details
                        v-model="props.selected"
                      ></v-checkbox>
                    </td>
                  <td class="text-xs-left">{{ props.item.days }}</td>
                  <td class="text-xs-left">{{ props.item.start }}</td>
                  <td class="text-xs-left">{{ props.item.end }}</td>
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
                  { text: 'Días', value: 'days', align: 'left' },
                  { text: 'Inicio (Años)', value: 'start', align: 'left' },
                  { text: 'Fin (Años)', value: 'end', align: 'left' },
                ],
                selected: [],
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
                getBonuses : 'bonus/getBonuses',
                getBonus : 'bonus/getBonus',
                updateBonus: 'bonus/updateBonus'
            }),
            edit() {
              this.getBonus({
                  id: this.selected[0].id
              }).then(() => {})
            }
        }
    }
</script>
