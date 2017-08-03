<template lang="html">
  <div>
      <v-container v-if="user.authenticated">
          <v-layout row wrap>
              <v-flex xs12 sm12 md6 lg6 class="my-2" v-show="user.role == 'administrador'">
                  <v-card>
                        <v-card-row class="blue darken-1">
                        <v-card-title>
                          <span class="white--text">Encuestas</span>
                          <v-spacer></v-spacer>
                        </v-card-title>
                        </v-card-row>
                        <v-card-text>
                        <v-card-row height="75px">
                          <div>
                            Sección para crear y administrador las encuestas que se pondran a disposición en los dispositivos, ademas que podran acceder a los resultados de las mismas.
                          </div>
                        </v-card-row>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-row actions>
                        <v-btn flat class="blue--text darken-1" router :to="{ name: 'polls' }">
                            Acceder a Encuestas
                        </v-btn>
                        </v-card-row>
                    </v-card>
                </v-flex>
              <v-flex xs12 sm12 md6 lg6 class="my-2">
              <v-card>
                <v-card-row class="blue darken-2">
                <v-card-title>
                  <span class="white--text">Notificaciones</span>
                  <v-spacer></v-spacer>
                </v-card-title>
                </v-card-row>
                <v-card-text>
                <v-card-row height="75px">
                  <div>
                    Sección para crear y administrar las notificaciones que se enviaran a todos los dispositivos, grados en especifico o alumnos en especifico.
                  </div>
                </v-card-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-row actions>
                    <v-btn flat class="blue--text darken-1" router :to="{ name: 'notifications' }">
                        Acceder a Notificaciones
                    </v-btn>
                </v-card-row>
                </v-card>
            </v-flex>
              <v-flex xs12 sm12 md6 lg6 class="my-2" v-show="user.role == 'administrador'">
              <v-card>
                <v-card-row class="blue darken-3">
                <v-card-title>
                  <span class="white--text">Usuarios</span>
                  <v-spacer></v-spacer>
                </v-card-title>
                </v-card-row>
                <v-card-text>
                <v-card-row height="75px">
                  <div>
                    Sección para crear y administrador los Usuarios que tendran acceso al panel, restringido por roles.
                  </div>
                </v-card-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-row actions>
                <v-btn flat class="blue--text darken-1" router :to="{ name: 'users' }">
                    Acceder a Usuarios
                </v-btn>
                </v-card-row>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
  </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        computed: mapGetters({
            user: 'auth/user'
        }),
    }
</script>
