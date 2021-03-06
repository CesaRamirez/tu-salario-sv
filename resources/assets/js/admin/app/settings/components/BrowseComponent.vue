<template lang="html">

<div>
    <v-layout justify-center>
        <v-flex xs12 md10 lg10>
            <v-card class="card--flex-toolbar">
                <v-toolbar card prominent color="deep-purple" dark>
                  <v-toolbar-title class="body-2">Configuraciones</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-text-field dark append-icon="search" label="Buscar" single-line hide-details color="cyan" v-model="search"></v-text-field>
                </v-toolbar>
                <v-divider></v-divider>
                <v-data-table :headers="headers"
                              :items="items"
                              :search="search"
                              :loading="loading"
                              v-model="selected"
                              rows-per-page-text="Registros por Página"
                              :rows-per-page-items='[5, 15, 25, { text: "Todos", value: -1 }]'
                              no-data-text="No se encontraron resultados"
                              class="elevation-2">
                    <template slot="items" slot-scope="props">
                        <td class="text-xs-center">{{ props.item.key }}</td>
                        <td class="text-xs-center">{{ props.item.description }}</td>
                        <td class="text-xs-center">{{ props.item.value }}</td>
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
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">Editar Opciones de Configuración</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm12 md12>
                                <v-text-field label="Llave" v-model="setting.key" disabled :error-messages="_errors.collect('key')" v-validate="'required'" data-vv-name="key" hint="Llave de Configuración" persistent-hint>
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm12 md12>
                                <v-text-field label="Descripción" required v-model="setting.description" :error-messages="_errors.collect('description')" v-validate="`required`" data-vv-name="description" hint="Descripción de Configuración" persistent-hint>
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm12 md12>
                                <v-text-field label="Valor" required v-model="setting.value" :error-messages="_errors.collect('value')" v-validate="`required`" data-vv-name="value" hint="Valor de Configuración" persistent-hint>
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
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Llave",
          value: "key",
          align: "center"
        },
        {
          text: "Descripción",
          value: "description",
          align: "center"
        },
        {
          text: "Valor",
          value: "value",
          align: "center"
        },
        {
          text: "Herramientas",
          align: "center",
          sortable: false
        }
      ],
      loading: true,
      selected: [],
      dialog: false
    };
  },
  mounted() {
    this.loading = true;
    this.getSettings();
    this.loading = false;
  },
  computed: {
    ...mapGetters({
      items: "settings/settings",
      setting: "settings/setting"
    })
  },
  methods: {
    ...mapActions({
      getSettings: "settings/getSettings",
      getSetting: "settings/getSetting",
      updateSetting: "settings/updateSetting"
    }),
    edit(id) {
      this.getSetting({
        id: id
      }).then(response => {
		response
        this.dialog = true;
      });
    },
    update() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.updateSetting({
            payload: {
              key: this.setting.key,
              description: this.setting.description,
              value: this.setting.value
            },
            context: this,
            id: this.setting.id
          })
            .then(() => {
              this.loading = true;
              this.getSettings();
              this.loading = false;
              this.dialog = false;
            })
            .catch(err => {err});
        }

        return;
      });
    },
    clear() {
      this.$validator.reset();
      this.dialog = false;
    }
  }
};
</script>
