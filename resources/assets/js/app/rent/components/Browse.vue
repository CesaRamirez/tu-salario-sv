<template lang="html">
    <div>
    <v-card>
        <v-card-title>
          Tabla de Renta Mensual
          <v-spacer></v-spacer>
          <v-text-field
            append-icon="search"
            label="Search"
            single-line
            hide-details
            v-model="search_mensual"
          ></v-text-field>
        </v-card-title>
            <v-data-table
              :headers="headers_x"
              :items="items_mensual"
              :search="search_mensual"
              class="elevation-2">
            <template slot="items" scope="props">
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
          Tabla de Renta Quincenal
          <v-spacer></v-spacer>
          <v-text-field
            append-icon="search"
            label="Search"
            single-line
            hide-details
            v-model="search_quincenal"
          ></v-text-field>
        </v-card-title>
            <v-data-table
              :headers="headers_x"
              :items="items_quincenal"
              :search="search_quincenal"
              class="elevation-2">
              <template slot="items" scope="props">
                <td>{{ props.item.section_for_humans }}</td>
                <td class="text-xs-right">{{ props.item.since }}</td>
                <td class="text-xs-right">{{ props.item.until_for_humans }}</td>
                <td class="text-xs-right">{{ props.item.percentage_for_humans }}</td>
                <td class="text-xs-right">{{ props.item.excess }}</td>
                <td class="text-xs-right">{{ props.item.fee }}</td>
              </template>
          </v-data-table>
      </v-card>
      </div>
</template>

<script>
    import { mapActions } from 'vuex'
      export default {
        data () {
            return {
                search_mensual: '',
                search_quincenal: '',
                headers_x: [
                  {
                    text: 'Tramo',
                    align: 'left',
                    sortable: false,
                    value: 'section'
                  },
                  { text: 'Desde', value: 'since' },
                  { text: 'Hasta', value: 'until' },
                  { text: '% a Aplicar', value: 'percentage' },
                  { text: 'Sobre el Exceso', value: 'excess' },
                  { text: 'Mas Cuota Fija de', value: 'fee' },
                ],
                items_mensual: [],
                items_quincenal: [],
            }
      },
        mounted() {
            this.getRentTable(1)
            this.getRentTable(2)
        },
        methods: {
            getRentTable(type)  {
                axios.get('/api/v1/admin/rents/' + type + '/type')
                    .then((response) => {
                        if (type == 1) {
                            this.items_mensual = response.data.data
                        }
                        else if(type == 2) {
                            this.items_quincenal = response.data.data
                        }
                    })
            }
        }
     }
</script>

<style lang="css">
</style>
