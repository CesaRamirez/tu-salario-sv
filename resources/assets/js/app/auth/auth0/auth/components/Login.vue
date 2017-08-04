<template lang="html">
        <v-layout align-center justify-center style="height: 100vh">
            <v-flex xs12 md4>
                <v-card>
                    <v-card-media
                      class="white--text"
                      height="200px"
                      src="../images/sweet-ice-cream.jpg"
                    >
                      <v-container fill-height fluid>
                        <v-layout fill-height>
                          <v-flex xs12 align-end flexbox>
                            <span class="headline">Iniciar Sesión</span>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-media>
                    <form @submit.prevent="submit">
                        <v-card-text>
                            <v-text-field label="Correo Electronico"
                                          v-model="email"
                                          @keyup.native="cleanFields('email')"
                                          :error-messages="errors.email"
                                          prepend-icon="mail">
                            </v-text-field>
                            <v-text-field label="Contraseña"
                                          v-model="password"
                                          @keyup.native="cleanFields('password')"
                                          :error-messages="errors.password"
                                          type="password"
                                          prepend-icon="vpn_key">
                            </v-text-field>
                       </v-card-text>
                       <v-card-actions>
                           <v-btn type="submit" block primary :loading="loading" ripple>
                               Iniciar
                               <v-icon right dark>send</v-icon>
                           </v-btn>
                       </v-card-actions>
                       <v-snackbar
                       :timeout="10000"
                       error
                       multi-line
                       v-model="errors.root" class="text-lg-center">
                       Credenciales Invalidas
                     </v-snackbar>
                   </form>
               </v-card>
           </v-flex>
       </v-layout>
</template>

<script>
import {
    mapActions
} from 'vuex'
import localforage from 'localforage'
import {
    isEmpty
} from 'lodash'

export default {
    data() {
        return {
            email: null,
            password: null,
            errors: [],
            snackbar: false,
            loading: false
        }
    },
    methods: {
        ...mapActions({
            login: 'auth/login'
        }),
        submit() {
            this.login({
                payload: {
                    email: this.email,
                    password: this.password
                },
                context: this
            }).then(() => {
                this.loading = true
                localforage.getItem('intended').then((name) => {
                    if (isEmpty(name)) {
                        this.$router.replace({
                            name: 'home'
                        })
                        this.loading = false
                        return
                    }
                    this.$router.replace({
                        name: name
                    })
                    this.loading = false
                })
            }).catch((err) => {})
        },
        cleanFields(field) {
            return this.errors[field] = []
        }
    }
}
</script>
